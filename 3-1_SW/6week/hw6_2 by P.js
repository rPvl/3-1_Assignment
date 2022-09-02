let count=0
let id,pwd;
let data=[];
let logData=[];
let t=false;
function Info(id,pwd){
    this.id=id;
    this.pwd=pwd||null;
}
//시작부터 끝까지 a-zA-Z로 구성된, 5~10자리이다
let idReg=/^[a-zA-Z]{5,10}$/
//앞에뭐든뒤가 a-zA-Z고, 앞에뭐든 뒤가 숫자고, 앞에뭐든 특수문자인.  a-zA-Z숫자,특수문자로 시작하는 8~12자리, 전역으로 찾는다.
         // /^(?=.*[a-zA-z])(?=.*\d)(?=.*[~!@#%^&*])[a-zA-Z\d!@#$%^&*]{8,12}$/g
let pwdReg1=/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$^%&*]{8,12}$/g
let pwdReg2
while(count<5){
    id=prompt("영문자로 된 ID 를 입력하시오(5~10자리");
    if (id==null) process.exit()
    pwd=null;
    if(idReg.test(id)){
        t=false
        for (let i in data){
            if(data[i].id== id)
            {
                t=true;//id와 같은게 이미 있다면 t=true
                break;
            }
        }
        if (t){
            alert("id failed")
            logData.push(new Info(id,pwd))
            continue;
	    }
        alert (`${id}는 유효한 ID`)
        pwdReg2=new RegExp(id,"gi")//옵션 gi : 전역+대소문자 상관없음.
        while(1){
            pwd=prompt("pwd 입력, 영문자, 숫자, 특수문자 1개 이상 입력")
            if(pwd==null) process.exit()
            if(!(pwdReg2.test(pwd)) && pwdReg1.test(pwd))//!(pwdReg2.test(pwd)) 이건 아이디랑 비번이 같은지 전역으로 대소문자구분없이 찾아서 리턴.
            {
                alert("id,pwd nice");
                data.push(new Info(id,pwd))
                count=count+1;
                break //비밀번호 입력 중단.
            }
            else{
                alert("pwd failed")
                logData.push(new Info(id,pwd))
                continue
            }
        }
        
    }
    else{//조건에 맞지않는 ID인 경우
        alert("id failed")
        logData.push(new Info(id,pwd))
        continue
    }

}
console.log(data)
console.log(logData)