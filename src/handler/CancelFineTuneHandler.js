const { OpenAI } = require("openai");
const { OPENAI_API_KEY, KEY_QUESTION, KEY_ANSWER } = require('../config/config');
const openai = new OpenAI({apiKey: OPENAI_API_KEY});


class CancelFineTuneHandler {
    async handler(req, res, next){
        let fineTuneId = req.params.fineTuneId
        const fineTuningJob = openai.fineTuning.jobs;
        const fineTune = await fineTuningJob.cancel(fineTuneId);

        const result = {
            limit: limit,
            data: fineTune
        }

        res.json({result: result})
    } 
}

module.exports = new CancelFineTuneHandler();
