const s = Symbol('s')
const source = {
    [s]:1,
    a:2
}

const target = [];
Object.assign(target,source)

console.log(target);