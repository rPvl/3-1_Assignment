let id1="dbsab2"
let id2="vmfhtmxm"
let id3="dnawlrdlsmsghlfkd3"
let pw1="qwert1234"
let pw2="123k"
let pw3="32kdjsa2"

const Data1 = [id1,pw1]
const Data2 = [id2,pw2]
const Data3 = [id3,pw3]

const fs = require('fs')

let stream1 = fs.createWriteStream("file1.txt", {flags: 'a'})

fs.writeFileSync('file1.txt', JSON.stringify(Data1))
stream1.write("\n"+JSON.stringify(Data2))
stream1.write("\n"+JSON.stringify(Data3))
stream1.end()


function Cre(id,pw){this.id=id; this.pw=pw;}
const OData1=new Cre(id1,pw1)
const OData2=new Cre(id2,pw2)
const OData3=new Cre(id3,pw3)

let stream2 = fs.createWriteStream('file2.txt',{flags: 'a'})

fs.writeFileSync('file2.txt', JSON.stringify(OData1))
stream2.write("\n"+JSON.stringify(OData2))
stream2.write("\n"+JSON.stringify(OData3))
stream2.end()


//이거 추가시키고...
let id4 = '1ijkdja'
let pw4 = '23jipw'
const Data4=[id4,pw4]
const OData4=new Cre(id4,pw4)
fs.appendFileSync('file1.txt',"\n"+JSON.stringify(Data4))
fs.appendFileSync('file2.txt',"\n"+JSON.stringify(OData4))


//파일 읽기
function T(){
let tem=[]
tem=fs.readFileSync('file1.txt').toString().split('\n')
for(let i in tem) tem[i] = JSON.parse(tem[i].toString())
console.log(tem)

let objArray=[]
objArray = fs.readFileSync('file2.txt').toString().split('\n')
for(let i in objArray) objArray[i] = JSON.parse(objArray[i].toString())
console.log(objArray)
//for(let i in objArray) console.log(objArray[i].id)
}
setTimeout(()=>{T()},5)//이거 안하면 배열안에 2개밖에 안들어감,,,