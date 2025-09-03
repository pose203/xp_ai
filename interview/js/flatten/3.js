// 栈模拟
function flatten(arr) {
    // stack，递归LIFO
    const stack = [...arr];
    const result = [];
    while (stack.length) {
        const item = stack.pop();
        if (Array.isArray(item)) {
            stack.push(...item);
        } else {
            result.push(item);
        }
    }
    return result.reverse();
}
   