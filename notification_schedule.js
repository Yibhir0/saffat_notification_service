const { CronJob } = require("cron");


const { createMessages,
    sendMessages,
    getPushTokens,
    // storePushToken,
    getReceiptIds,
    obtainReceipts } = require("./notification_service");

const { fetch } = require("cross-fetch");


/**
 * Schedule notifications
 */
async function schedule_notifications() {

    const push_tokens_db = await getPushTokens();

    // tokens
    const tokens = push_tokens_db.map(t => t.token);

    // data
    const prayers = await fetch_prayer();

    // data
    prayers.pop();

    //body
    const body_messages = construct_notification_bodies(prayers);

    const wudus = prayers.map(p => p.wudu);

    // crons
    const cron_wudu = convert_time_to_cron(wudus);

    await start_notification_scheduling(tokens, prayers, body_messages, cron_wudu);

    // 5 messages / n tokens / 5 crons

}

/**
 * start cron jobs for the 5 prayers
 * @param {*} tokens 
 * @param {*} prayers 
 * @param {*} body_messages 
 * @param {*} cron_wudu 
 */
async function start_notification_scheduling(tokens, prayers, body_messages, cron_wudu) {
    for (let i = 0; i < cron_wudu.length; i++) {
        new CronJob(
            cron_wudu[i],
            async function () {
                notify_muslims(body_messages[i], prayers[i], tokens);
            },
            null,
            true,
            "America/Montreal"
        )
    }

}

/**
 * notify
 */
async function notify_muslims(body, data, pushTokens) {
    const messages = createMessages(body, data, pushTokens)
    let tickets = await sendMessages(messages);
    let receiptIds = getReceiptIds(tickets);
    await obtainReceipts(receiptIds);
}

/**
 * convert time to cron format 
 */

function convert_time_to_cron(time_strs) {

    const cron_array = time_strs.map(str => {
        const splited_time = str.split(":");
        let cron_t = splited_time[1] + " " + splited_time[0] + " * * *"
        return cron_t;
    })

    return cron_array;

}

/**
 * construct bodies of notifications
 */

function construct_notification_bodies(prayers) {


    const bodies = prayers.map(p => {
        let message = "Wudu time.  " + p.name + " prayer is in 10 minutes";
        return message;
    })

    return bodies;
}

/**
 * Fetch all daily prayers
 * @returns prayers
 */
async function fetch_prayer() {

    const url = process.env.PRAYER_PUBLIC_API_URL;

    let data;

    try {
        const res = await fetch(url);
        data = res.json();
        if (!res.ok) {
            throw Error(data.error);
        }
    } catch (error) {
        console.log('error in fetching prayers');
        console.log(error.message);
    }
    return data;
}





module.exports = { schedule_notifications }; 