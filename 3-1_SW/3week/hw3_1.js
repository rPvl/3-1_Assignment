const readline=require('readline');

const rl=readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let rawdata=[];
let plus=[];
let minus=[];
let munja=[];

let count=0, plusMax=0, minusMax;

rl.on('line',(line)=>{//(line)이름 마음대로 가능. 줄단위 
    rawdata.push(line);//할일 던져줘
});
rl.on('close',()=>{//입력끝날때. 
    separate();
    print();
    process.exit();//프로세스 완전히 끝내라.
})

function separate(){ //배열 3개로 분리.
    //isNaN()
    plus = rawdata.filter((item,index)=>{
            return !isNaN(item) && Number(item)>=0;//문자열로 저장됨.
    })
    plus.forEach((item,index)=>{//문자열을 숫자로 변경.
        plus[index]=Number(item);
    })
    
    minus = rawdata.filter((item,index)=>{
        return !isNaN(item) && Number(item)<0;
    })
    minus.forEach((item,index)=>{
        minus[index]=Number(item);
    })


    munja = rawdata.filter((item,index)=>{
        return !Number(item);
    })

}

function print(){
    plus.forEach((item,index)=>{
        count++;
        plusMax= (item>plusMax)?item:plusMax;
    })
    console.log("양수의 개수 : "+count+", 양수의 최대값 : "+plusMax);
    
    minusMax=minus[0];
    minus.forEach((item,index)=>{
        minusMax= (item>minusMax)?item:minusMax;
    })
    console.log("음수의 최대값 : "+minusMax);

    munja.sort();
    console.log("문자열 정렬시 제일 마지막 문장 : "+munja[munja.length-1])

}