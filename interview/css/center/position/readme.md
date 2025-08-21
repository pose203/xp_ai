# position
教科书式的表达



- 五种属性值 准确，简洁
  - static 默认值 不定位，回到文档流、
    让之前定位的元素，回到文档流，取消定位
  - relative 相对自身原位置偏移，不脱离文档流
  - absoult 相对最近的非static 祖先定位
  - fixed 相当于视窗定位
  - sticky 粘性定位，是一种css定位方式，它让元素在滚动到特定阀值前表现的像相对定位，到达阀值后固定在视口
    中，实现类似吸顶或吸附效果

- 业务场景
  - 结合relativee + absolute 消息提醒，在右上角。
  - absolute + transfrom 水平垂直居中 模态框
  - fixed 滚到顶部 聊天客服图标
  - sticky 粘连导航 不管页面多长，导航在超出阀值后，一直都在
    table 表头粘连，距离其最近的具有滚动机制的祖先容器
    和IntersectionObserver 有点像
- 底层
  - 定位参照系
  absolute 最近position !== static 的祖先 || body
  fixed 视窗? bug
  sticky 依赖滚动容器
  - 独立图层渲染
  absolute
