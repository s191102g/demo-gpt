
const { OpenAI } = require("openai");
const { OPENAI_API_KEY, KEY_QUESTION, KEY_ANSWER } = require('../config/config');
const openai = new OpenAI({apiKey: OPENAI_API_KEY});


class GetFileContentHandler {
    async handler(req, res, next){
        let fileId = req.params.fileId
        const openaiFile = openai.files;
        const file = await openaiFile.retrieveContent(fileId);

        const result = {
            fileId: fileId,
            data: file
        }

        res.json({result: result})
    } 
}

module.exports = new GetFileContentHandler();


