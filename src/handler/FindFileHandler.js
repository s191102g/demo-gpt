const { OpenAI } = require("openai");
const { OPENAI_API_KEY, KEY_QUESTION, KEY_ANSWER } = require('../config/config');
const openai = new OpenAI({apiKey: OPENAI_API_KEY});


class FindFileHandler {
    async handler(req, res, next){
        let limit = req.query.limit
        const openaiFile = openai.files;
        const listFile = await openaiFile.list();

        const result = {
            limit: limit,
            data: []
        }
        for await (const file of listFile) {
            result.data.push(file)
        }

        res.json({result: result})
    } 
}

module.exports = new FindFileHandler();
