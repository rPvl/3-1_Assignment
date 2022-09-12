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
    response.write("<table border='1'><tr><th>a"+"<th>b")
    for(let i in arr){
        response.write("<tr><td>"+arr[i].a+"<td>"+arr[i].b+"</tr>")
    }
    response.write("</table>")
});

app.post('/',(request,response)=>{
    arr.push(request.body);
    response.redirect("http://localhost:55273");
});


app.listen(55273,()=>{console.log('server running')});