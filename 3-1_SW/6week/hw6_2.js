let array1 = []
let array2 = []
let array3 = []
let id = /([A-Z]|[a-z]){5,10}/
let pw = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$/
while(true){
    let input=prompt("ID를 입력하세요(영문자로만 5~10자리,대소문자구별)","")
    if(input==null)continue;
    if(id.test(input)==true){
        let check=0
        for(let i in array1){
            if(array1[i]==input){
                array3.push(input)
                check=1
            }
        }
        if(check!=1){
            array1.push(input)
            let input2 = prompt("PW를 입력하세요(영문자, 숫자, 특수문자는각각1개이상입력, 8~12자리, ID와 같은 영문자는 안된다(대소문자 구별안함))","")
            if(pw.test(input2)==true){
                let check2=0
                for(let i in array1){
                    if(input2.search(input)>-1){
                        array3.push(input2)
                        check2=1
                    }
                }
                if(check2!=1){
                    array2[array1.length-1]=input2
                    //array2.push(input2)
                }
            }
        else array3.push(input2)
        }
    }
    else array3.push(input)
    if(array1.length==5) break;
}
//console.log(array1)
//console.log(array2)
//console.log(array3)
for(let i in array1)
    document.write("<p>ID : "+array1[i]+"  PW : "+array2[i]+"</p>")
document.write("<p>유효하지 않은 ID & PW</p>")
for(let i in array3)
    document.write("<p>"+array3[i]+"</p>")