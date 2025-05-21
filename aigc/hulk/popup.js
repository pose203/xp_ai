/**
 * Hulk Chrome扩展 - 背景色修改功能
 * 该脚本实现了点击按钮改变网页背景色的功能
 */

// 为"改变背景颜色"按钮添加点击事件监听器
document.getElementById('changeColor').addEventListener('click', async () => {
  try {
    // 使用Chrome API查询当前活动标签页
    // chrome.tabs.query返回一个Promise，使用await等待结果
    // active: true 确保只获取当前活动的标签页
    // currentWindow: true 确保只获取当前窗口的标签页
    const [tab] = await chrome.tabs.query({ 
      active: true,      // 只查询当前活动的标签页
      currentWindow: true // 只查询当前窗口
    });
    
    // 检查是否成功获取到标签页
    // 如果没有找到活动标签页，输出错误信息并退出
    if (!tab) {
      console.error('No active tab found');
      return;
    }

    // 使用Chrome的scripting API在当前标签页执行脚本
    // 这个API允许我们在目标标签页中执行JavaScript代码
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },  // 指定目标标签页的ID
      func: () => {
        // 修改页面背景色为浅蓝色 (#ADD8E6)
        // 使用CSS样式直接修改body元素的背景色
        document.body.style.backgroundColor = '#ADD8E6';
      }
    });
  } catch (error) {
    // 错误处理：如果执行过程中出现任何错误，在控制台输出错误信息
    // 这包括权限错误、API调用失败等情况
    console.error('Error executing script:', error);
  }
}); 