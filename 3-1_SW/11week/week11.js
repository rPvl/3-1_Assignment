const express = require('express')
const fs=require('fs')//file 전송
const app=express()
app.get('/',(request,response)=>{
    fs.readFile("./js/hw11-2.html",(error,data)=>{//main.html 말고
        response.writeHead(200,{'Content-Type':"text/html"})
        //추가작업할때는 ReadWrite.여러번 가능.보내는 파일은 html이다라는거.200은 상태 포트 인코디알 방법 제시
        //통신방법을 content-type에 보낸다?
        response.end(data)//response.wirte가능. end는 종료하면서 보냄.
    })
});

app.get("/imgs",(request,response)=>{//이미지 전송.
    fs.readFile("./js/rue.png",(error,data)=>{
        response.writeHead(200,{'Content-Type':"text/html"})
        response.write(data)
        response.end()
    })
})

app.listen(52273,()=>{console.log('Server Start')});//서버구동 코드