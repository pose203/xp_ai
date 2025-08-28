class PromptTemplate {
    constructor(template) {
        this.template = template

    }
    format(variables) {
        let result = this.template;
        for (const [key, value] of Object.entries(variables)) {
            result = result.replace(new RegExp(`{${key}}`, 'g'), value);
        }
        return result;
    }

    
}

const tourismTemplate = new PromptTemplate(`
    你是一位专业的旅游顾问,
    请帮用户规划在{city}的{days}天行程,
    要求:突出{prefecture},并给出每天的详细安排
    `)

    const userInput = {
        city: '北京',
        days: 3,
        prefecture: '历史文化'
    }

    const finalPrompt = tourismTemplate.format(userInput);
    console.log(finalPrompt);



    