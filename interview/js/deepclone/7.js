// # 怎么用的 参数的默认值

// 默认值，用户会传的， Object.assign() 收入囊中
// 目标对象合并用户传参和默认参数
// Option 是会传入的对象


function createUer(options) {
    const defaults ={
        name: '匿名',
        age: 18,
        isAdmin:false
    }
    const config = Object.assign({},defaults, options)
    console.log(config)

}

const baseConfig = {api:'/api',timeout:500}
const envConfig = {timeout:1000,debug:true}








