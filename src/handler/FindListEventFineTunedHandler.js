const { OpenAI } = require("openai");
const { OPENAI_API_KEY, KEY_QUESTION, KEY_ANSWER } = require('../config/config');
const openai = new OpenAI({apiKey: OPENAI_API_KEY});


class FindLisEventFineTuneHandler {
    async handler(req, res, next){
        let tuningJobId = req.query.tuningJobId
        const fineTuningJob = openai.fineTuning.jobs;
        const listEvent = await fineTuningJob.listEvents(tuningJobId);

        const result = {
            tuningJobId: tuningJobId,
            data: []
        }

        for await (const event of listEvent) {
          result.data.push(event)
        }

        res.json({result: result})
    } 
}

module.exports = new FindLisEventFineTuneHandler();
