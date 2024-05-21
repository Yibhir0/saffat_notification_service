
const Token = require("../model/token.model");

//Deletes a requested token
const deleteToken = async (req, res) => {
    try {
        const { id } = req.params;
        const token = await Token.findByIdAndDelete(id);
        if (!token) {
            return res.status(404).json({ message: "Cannot find any token with id " + id + " to delete." })
        }
        res.status(200).json(token);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}


//Adds a token
const addToken = async (req, res) => {
    const token = req.body;
    let tok = await Token.findOne({ token: token.token });
    if (tok) return res.status(400).json({ message: 'Token already exists.' });

    const saving_token = new Token(token);
    try {
        const newToken = await saving_token.save();
        res.status(201).json(newToken);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};



// Get all tokens
const getTokens = async (req, res) => {
    try {
        const tokens = await Token.find()

        res.status(200).json(tokens);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};



// Get all tokens
const getAllTokens = async () => {
    try {
        const tokens = await Token.find();
        // Convert Mongoose documents to plain JavaScript objects
        const tokensJSON = tokens.map(token => token.toJSON());
        return tokensJSON;
    }
    catch (err) {
        console.log(err);
        return { error: err.message };
    }
};

module.exports = { deleteToken, addToken, getTokens, getAllTokens };
