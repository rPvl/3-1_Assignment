let stddata=[]

while(true){
    let s=prompt("학번 이름 학년 학과 입력(띄어쓰기로 구분)","")
    if(s==null) break;
    let t=s.split(" ")
    //console.log(t)
    stddata.push(new Stddate(t[0],t[1],t[2],t[3]))
}

console.log(stddata)
for(let k in stddata){
    stddata[k].print_name()
}
for(let k in stddata){
    stddata[k].print_info()
}

function Stddate(number,name,grade, hak){
    this.number=number;
    this.name = name;
    this.grade = grade;
    this.hak = hak;
    this.print_name=function(){
        document.write("<p>"+this.number+" "+this.name+"<p>")
    }
    this.print_info=function(){
        document.write("<p>"+this.name+" "+this.hak+" "+this.grade+"<p>")
    }
}
