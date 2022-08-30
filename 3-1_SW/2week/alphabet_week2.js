let text = prompt("문자를 입력하시오","")

if (text>= 'A' && text<='Z'){
    let num = text.charCodeAt(0) //입력된 문자열에서 0번째인 것 유니코드 숫자ㅣㄷ 반환
    let t = String.fromCharCode(num+32)//숫자에 해당하는 아스키코드? 문자 반환
    console.log(t)
}
else if (text>= 'a' && text<='z'){
    let num = text.charCodeAt(0)
    let t = String.fromCharCode(num-32)
    console.log(t)
}
else{
    console.log("not alphabet")
}
