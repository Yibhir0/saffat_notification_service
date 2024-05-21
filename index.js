const express = require("express");

const bodyParser = require("body-parser");

const cors = require('cors');

const { connectDB } = require("./dbConnection");

const { CronJob } = require("cron");

const TokenRouter = require("./route/token.route");

const { Expo } = require("expo-server-sdk");

const { getAllTokens } = require("./api/api");

const { schedule_notifications } = require("./notification_schedule")

const app = express();

//app.use(express.json());

// Parsing the body to json
app.use(bodyParser.json());

app.use(cors());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   }),
// );

// Loading the environment variables from the .env file.
require("dotenv").config();

const PORT = process.env.PORT || 5001;

const expo = new Expo();

new CronJob(
    "* * * * *",

    async function () {
        schedule_notifications();
    },
    null,
    true,
    "America/Montreal"
)

// new CronJob(
//     "*/20 * * * * *",
//     async function () {
//         try {
//             const tokens = await getAllTokens();

//             const t = tokens[0].token;
//             console.log(t);

//             expo.sendPushNotificationsAsync([
//                 {
//                     to: t,
//                     title: "prayer time",
//                     body: "go pray now",
//                 },
//             ]);

//         } catch (err) {
//             console.error(err);
//         }
//     },
//     null,
//     true,
//     "America/Montreal"
// )





app.get("/", (req, res) => {
    res.send("Saffat");
});

app.use("/api/push_tokens", TokenRouter)


connectDB()
    .then(() => {
        app.listen(PORT, '0.0.0.0', console.log(`Server started on port ${PORT}`));

    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });

module.exports = { app };
