let input, data=[], plus=[];
while(true){
    input=prompt("데이터를 입력하시오","");
    //취소 버튼 눌렀을 때 반환값
    if (input==null) break;
    data.push(input);
}
console.log(data);


plus = data.filter((item,index)=>{
    return !isNaN(item) && Number(item)>=0;
});
plus.forEach((item,index)=>{//문자열을 숫자로 변경.
    plus[index]=Number(item);
    })

plus.sort(function compare(a,b) { return a-b; })

console.log(plus);
