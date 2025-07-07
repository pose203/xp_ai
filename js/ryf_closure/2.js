// 让局部变量可以在全局访问

function f1() {
    // 局部变量
    var n = 999;//自由变量
    function f2() {
        // 自由变量
        console.log(n);
    }
    return f2;
}
var fn = f1();
fn();
