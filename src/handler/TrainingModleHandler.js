const readCsvFile = require('../service/service')
const { OpenAI } = require("openai");
const fs = require('fs');
const { OPENAI_API_KEY, KEY_QUESTION, KEY_ANSWER } = require('../config/config');

const openai = new OpenAI({apiKey: OPENAI_API_KEY});
class TrainingModleHandler {
    async handler(req, res, next){
        const file = req.file
        if (!file) {
            next('No file uploaded.');
        }
// convert data to jsonl
        const listData = await readCsvFile(file.path);
        const jsonlData = listData.map((item) => {
            let data = {
                messages: [
                    {
                        role: 'system',
                        content: 'Dev Sang is training'
                    },
                    {
                        role: 'user',
                        content: item.prompt + KEY_QUESTION
                    },
                    {
                        role: 'assistant',
                        content: item.completion + ' ' + KEY_ANSWER
                    }
                ]
            }


            // let data = {
            //     prompt: item.prompt + KEY_QUESTION, 
            //     completion: item.completion + ' ' + KEY_ANSWER
            // }



            return JSON.stringify(data)
        });
        const jsonlContent = jsonlData.join('\n');
        const filePath = `./${file.filename}.jsonl`
        fs.writeFileSync(filePath, jsonlContent);

// handle upload file into open ai
        const openaiFile = openai.files;
        // let fileCreated = await openaiFile.create({
        //     file: fs.createReadStream('./fine_tuning_dataset.jsonl'),
        //     purpose: "fine-tune",
        // })
        fs.unlink(filePath, error => {
            if (error)
                throw error;
        });

// create fine-tune job with file uploaded
        const fineTuningJob = openai.fineTuning.jobs;

        // const fineTune = await fineTuningJob.create({
        //      training_file: fileCreated.id, 
        //      model: 'gpt-4',
        //      suffix: 'dev-hd'
        // });


        const fineTune = await fineTuningJob.create({ 
            training_file: 'file-PpAjMrbgc9ZkryW7mQlcG9VJ',
            model: 'babbage-002',
            suffix: 'dev-hd'
         });

        res.json({result: fineTune})
    }
}

module.exports = new TrainingModleHandler()
