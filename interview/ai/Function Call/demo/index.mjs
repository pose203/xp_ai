import OpenAI from 'openai'; // es6 module

const client = new OpenAI({
    apiKey: 'sk-h91KBBHUC30pbiviNhD9I5YnyC7gcdd4CzPCKJcMhnkm7IT9',
    baseURL: 'https://api.302.ai/v1'
})

async function main() {
    const resp = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "user",
                content: "今天抚州天气怎么样?"
            }
        ],
        // LLM 使用的工具
        tools: [
            {
                type: 'function',
                function: {
                    name: "getWeather",
                    description: "获取某个城市的天气",
                    parameters: {
                        type: "object",
                        properties: {
                            city: {
                                type: "string"
                            }
                        },
                        required: ["city"]
                    }
                }
            }
        ]
    })
}

main();