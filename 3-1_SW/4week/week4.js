// function calc(x,y){return x+y;}
// console.log(calc(5,3))
// function calc(x,y){return x*y}
// console.log(calc(5,3))
//결과 15 15

// let calc=function(x,y){return x+y}
// console.log(calc(5,3))
// calc=function(x,y){return x*y}
// console.log(calc(5,3))
//결과 8 15

// function A(){B(); console.log("world")}
// function B(){console.log("hello")}
// A();
//결과 hello world

// console.log("function(){this}");
// (function(){console.log(this)})();
// console.log("()=>{this}");
// (()=>{console.log(this)})();

setTimeout(()=>{console.log("1초 지남");},1000);
setInterval(()=>{console.log("1초 마다 실행")},1000);