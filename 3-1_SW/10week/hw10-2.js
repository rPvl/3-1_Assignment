const express = require('express')
const bodyParser=require('body-parser')
const morgan = require('morgan')

const app=express()

const fs = require('fs')
let stream = fs.createWriteStream("file11.txt", {flags: 'a'})

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

app.get('/info/',(request,response)=>{//배열을 파일로 저장하기.
    for(let i in arr){
        if(i==0){ //write
           fs.writeFileSync('file11.txt', JSON.stringify(arr[0]))
        }
        else{
           stream.write("\n"+JSON.stringify(arr[i]))
        }
        //fs.appendFileSync("file11.txt",)
    }
    response.write("<h1>FINISH</h1>")
});

app.post('/',(request,response)=>{
    arr.push(request.body);
    response.redirect("http://localhost:55273");
});


app.listen(55273,()=>{console.log('server running')});