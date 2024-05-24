const { Server } = require('socket.io');
const port = 4000;
const io = new Server(port, {
  cors: {
    origin: '*',
    preflightContinue: true,
    optionsSuccessStatus: 204,
  }
});

const { OpenAI } = require("openai");
const { OPENAI_API_KEY, KEY_QUESTION, KEY_ANSWER } = require('../config/config');
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
// const KEY_ANSWER = require('../config/config');

io.on('connection', (socket) => {
  console.log('socket is connected');
  socket.on('message', async (msg) => {
    try {
      // chat completions 
        // const chatCompletion = openai.chat.completions;
        // let data = msg || '';
        // let prompt =  data + KEY_QUESTION;
        // let result = await chatCompletion.create({
        //   messages: [{ role: 'user', content: prompt }],
        //   model: 'gpt-4',
        //   stream: true
        // });

        // for await (const chunk of result) {
        //   let text = chunk.choices[0].delta.content
        //   if (text) {
        //     io.emit('message', text);
        //   }

        // }

      // promt - completions
        const completion = openai.completions;
        let data = msg || '';
        let prompt = data + KEY_QUESTION;
        console.log(prompt);
        let result = await completion.create({
          prompt: prompt,
          model: 'ft:davinci-002:airmason:dev-hd:8BZy7cbE',
          stream: true,
          stop: [` ${KEY_ANSWER}`],
          max_tokens:100,
          temperature: 0.1,
          frequency_penalty: 0,
          presence_penalty:0
        });
      
        // ft:davinci-002:airmason:dev-hd:8BZy7cbE
        // ft:babbage-002:airmason:dev-hd:8BauK1Xe

        for await (const chunk of result) {
          let text = chunk.choices[0].text
          if (text) {
            io.emit('message', text);
          }

      }
    } catch (error) {
      io.emit('message', `message: ${error.message}, type: ${error.type}, code: ${error.code}, param: ${error.param}`);
    }

  });
  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});