export default {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5, // 根据设计稿宽度除以10进行设置，这里假设设计稿为375px
      propList: ['*'], // 所有属性都转换
      selectorBlackList: ['.norem'], // 过滤掉.norem开头的class，不进行rem转换
      exclude: /node_modules/i
    }
  }
}; 