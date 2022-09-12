const express = require('express')
const bodyParser=require('body-parser')
const morgan = require('morgan')

const app=express()

let arr=[]

app.use(express.static('public'));
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',(request,response)=>{
    let output = '';
    output += '<form method="post">'
    output += '  <input type="text" name="a"/>'
    output += '   <input type="text" name="b"/>'
    output += '   <input type="submit"/>'
    output += '</form>'

    response.send(output);
});

app.get('/info/',(request,response)=>{
    for(let i in arr){
        response.write("<br>"+JSON.stringify(arr[i])+"<br>")
    }
});

app.post('/',(request,response)=>{
    arr.push(request.body);
    response.redirect("http://localhost:55273");
});


app.listen(55273,()=>{console.log('server running')});

//post 수정. 제줄누르면 전송은 된다. 화면은 그대로.sned 안하면 되나?
//입력한 내용은 지워야한다.? redirect 이용. 새로고침처리됨. 전송누르면 리다이렉트. 
//포스트를 수정해야한다. get은 수정 안해. 배열하나 만들어서 계속 추가한다.
//JSON객체 배열이 된다.
//let s=[]; s=[{"a"="se","b"="s"}] 형태. s에 추가되는 형태로.
//get을 하나 더 추가한다고? info??
//여ㅓㄹ개 전송ㅇ 힌트 : form이 힌트다.

//추가점수 1. 파일에 저장. 2. html 문서를 테이블형태로 출력.