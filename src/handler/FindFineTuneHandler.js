const { OpenAI } = require("openai");
const { OPENAI_API_KEY, KEY_QUESTION, KEY_ANSWER } = require('../config/config');
const openai = new OpenAI({apiKey: OPENAI_API_KEY});


class FindFineTuneHandler {
    async handler(req, res, next){
        let limit = req.query.limit
        const fineTuningJob = openai.fineTuning.jobs;
        const listTuningJob = await fineTuningJob.list();

        const result = {
            limit: limit,
            data: []
        }

        for await (const fineTune of listTuningJob) {
          result.data.push(fineTune)
        }

        res.json({result: result})
    } 
}

module.exports = new FindFineTuneHandler();
