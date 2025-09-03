// reduce [] =》 1项
//多维数组 =》 1项1位数组
// reduce 方法把数组合并成一个值

const flatten = arr =>
    arr.reduce((acc,cur) => {
        return acc.concat(Array.isArray(cur) ? flatten(cur) : cur)
    }, [])

console.log(flatten([1,2,3,[4,5,[6,7]]]));
