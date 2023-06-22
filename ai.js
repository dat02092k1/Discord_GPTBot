require('dotenv').config();

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
async function ask(prompt) {
        const response = await openai.createCompletion({
            model: "text-davinci-002",
            prompt,
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        console.log(response);   
        const answer = response.data.choices[0].text;
        console.log('just: ' + answer)
        return answer;
}
//Export the "ask" function
module.exports = {
    ask,
};