import OpenAI from "openai";
import {
    config
} from 'dotenv';
config();
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL
});
// LLM 聊天也和HTTP 一样是无状态的
// LLM 聊天历史需要我们自己管理
const messages = [
    {
        role: "system",
        content: "你是一个友好的助教。"
    }
];
async function withMemoryChat(userInput) {
    messages.push({
        role: "user",
        content: userInput
    })
    const res = await client.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: "我的名字是Andrew"
            }
        ]
    });
    const reply = res.choices[0].message.content;
    messages.push({
        role: "assistant",
        content: reply
    });
    console.log("回复：", reply);
    return reply;
    //console.log("第一次回复：", res1.choices[0].message.content);
    // const res2 = await client.chat.completions.create({
    //     model: 'gpt-3.5-turbo',
    //     messages: [
    //         {
    //             role: "user",
    //             content: "我叫什么名字"
    //         }
    //     ]
    // })
    // console.log("第二次回复：", res2.choices[0].message.content);
}

async function demo() {
    await withMemoryChat('你好，我的名字是Andrew');
    await withMemoryChat('我叫什么名字');
}

demo();