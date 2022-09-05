/*
let h
let m
let s
let count=0;
let interval
let test=new Date();
// h=test.getHours()
// m=test.getMinutes()
// s=test.getSeconds()

//document.write("<p>"+h+":"+m+":"+s+"</p>");
// for(let i=1;i<10;i++){


//     interval = test.getTime()+count*1000;
//     let test1 = new Date(interval)
//     count++;
    
//     h=test1.getHours()
//     m=test1.getMinutes()
//     s=test1.getSeconds()
//     document.write("<p>"+h+":"+m+":"+s+"</p>");
// }
let print = setInterval(()=>{
    
    interval = test.getTime()+count*1000;
    let test1 = new Date(interval)
    count++;
    
    h=test1.getHours()
    m=test1.getMinutes()
    s=test1.getSeconds()
    document.write("<p>"+h+":"+m+":"+s+"</p>"); }, 1000);//1초마다 x출력
setInterval(()=>{clearInterval(print)},10000);//0도 출력해야하므로 x+1초되면 끝

//html 줄바꿈 <br>
//set써야한다. 한번 new date해야한다. 하,,,ㅇ
*/


let date =new Date();
let h = date.getHours();
let m = date.getMinutes();
let s = date.getSeconds();

let t = setInterval(()=> {count();}, 1000); //1초 마다 count() 실행
setTimeout(()=>{clearInterval(t)},10000); //10초 되면 t 중단.

function count(){
    document.write(h+":"+m+":"+s+"<br>");

    date.setSeconds(date.getSeconds()+1);
    h=date.getHours();
    m=date.getMinutes();
    s=date.getSeconds();
}
