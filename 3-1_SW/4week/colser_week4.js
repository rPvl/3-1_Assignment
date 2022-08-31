//x는 단계값, y는 한계값.
function add(x){
    function inner(y){
        let result=0;
        while(result<y){ //잘하자 ^^
                console.log(`${result}` + " + " + `${x}` + " = " + `${result+x}`)
                result+=x;
                if(result+x>y) break; //마지막 조절하는 것
        }
       return result;
    }
    return inner;
}

let add2=add(2)
let add3=add(3)//3은 add의 x에 들어간다.
console.log(add2(10))//10은 inner의 y에 들어간다. => 클로저 함수.
console.log(add3(10))
console.log(add3(20))
//터미널 실행. cd js => node colser_week4