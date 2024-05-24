require('dotenv').config()
const env  = require('env-var');

const  OPENAI_API_KEY = env.get('OPENAI_API_KEY').required().asString();
const KEY_QUESTION = env.get('KEY_QUESTION').required().asString();
const KEY_ANSWER = env.get('KEY_ANSWER').required().asString();

module.exports = {
    OPENAI_API_KEY,
    KEY_QUESTION,
    KEY_ANSWER
}