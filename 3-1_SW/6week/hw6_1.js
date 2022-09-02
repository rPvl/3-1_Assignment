//이름은 무조건 객체배열에 저장. 이름만 입력되면 과목 점수 초기값 0. 취소눌러도 prompt띄워.
//메서드는 프로토타입을 쓴다. sum,ave를 printinfo에서 출력하게하자.
let class1=[]

class Cl {
    constructor(name,kor=0,eng=0,mat=0){
        this.name = name;
        this.kor = Number(kor);
        this.eng = Number(eng);
        this.mat = Number(mat);
    }
}//위치주의

while(true){
    let s=prompt("\"이름(필수)/국어점수/영어점수/수학점수\" 입력('/'로 구분)\n\"종료\"입력시 입력종료","")
    if(s==null) continue;
    let t=s.split("/")
    if(s.size==0) continue;
    if(isNaN(Number(t[0]))){
        if(t[0]=="종료") break;
        else class1.push(new Cl(t[0],t[1],t[2],t[3]))
    }
}

Cl.prototype.sum = function(kor,eng,mat){return kor+eng+mat}
Cl.prototype.ave = function(kor,eng,mat){return (kor+eng+mat)/3}
Cl.prototype.print_info = function(){document.write("<p>"+this.name+" "+this.sum(this.kor,this.eng,this.mat)+" "+this.ave(this.kor,this.eng,this.mat)+"</p>")}

//class1 name기준 오름차순 정렬. 강의 자료 3주차
class1.sort(function(a,b){
    return a.name <b.name ? -1: a.name>b.name ? 1 : 0; //내림차순 하고 싶으면 <이거 >이걸로 바꾸면 됨.
})
console.log(class1)
for (let i in class1){
    class1[i].print_info();
}

