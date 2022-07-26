const express = require('express')
const bodyParser = require('body-parser')

const fs = require('fs')//file 전송
const app = express()

const db_config = require('./database.js') // DB 정보
const conn = db_config.init()
db_config.connect(conn) //DB 연결

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

let login_chk = []
let login_id

app.get('/', (request, response) => {//로그인 페이지
    fs.readFile("./project.html", (error, data) => {
        response.writeHead(200, { 'Content-Type': "text/html" })
        response.end(data)
    })
});

app.post('/', (request, response) => {//로그인 확인
    let arr = [];
    arr.push(request.body); //post로 전송한 내용(id, pwd)

    let objArray = []

    //SQL문에 따른 결과가 배열로 나옴. 배열안에 원소는 객체임.
    let sql = 'SELECT * FROM Student';
    conn.query(sql, function (err, rows, fields) {
        if (err) console.log('query is not executed. select fail...\n' + err);
        else {
            objArray = JSON.parse(JSON.stringify(rows))//문자열로바꾸고 객체로 파싱.
            //console.log(objArray)

            let id_exi = 0;
            let lock = 0
            for (let i in objArray) {
                if (objArray[i].user_id == arr[0].user_id) {//아이디 확인(있는 아이디이다)
                    id_exi = 1;
                    if (login_chk.length != 0) {
                        for (let j in login_chk) {
                            if (login_chk[j][0] == objArray[i].user_id && login_chk[j][1] == 3) {
                                let now = new Date();
                                if ((now.getTime() - login_chk[j][2]) / 1000 >= 60) {///60초 로그인 제한
                                    //console.log("pop이전 "+login_chk)
                                    login_chk.splice(j, 1)
                                    //console.log(login_chk)
                                    break;
                                }
                                else {
                                    lock = 1
                                    let str = '<body>' + '<meta charset="UTF-8">' + '<meta http-equiv="X-UA-Compatible" content="IE=edge">' + '<script>' + 'alert("로그인이 제한된 아이디입니다.");' + 'location.replace("/");' + '</script>' + '</body>'
                                    response.write(str)
                                }
                            }
                        }
                    }
                    if (lock == 0) {
                        if (objArray[i].user_pwd != arr[0].user_pwd) {//비번 학인(다른 경우)
                            if (login_chk.length == 0) {
                                let temp = []
                                temp.push(objArray[i].user_id)
                                temp.push(1)
                                login_chk.push(temp)
                                let str = '<body>' + '<meta charset="UTF-8">' + '<meta http-equiv="X-UA-Compatible" content="IE=edge">' + '<script>' + 'alert("비밀번호가 1번 틀렸습니다.");' + 'location.replace("/");' + '</script>' + '</body>'
                                response.end(str)
                            }
                            else {
                                let chk = 0
                                for (let j in login_chk) {
                                    if (login_chk[j][0] == objArray[i].user_id) {
                                        chk = 1
                                        let count = login_chk[j][1] + 1
                                        login_chk[j].splice(1, 1, count)

                                        if (count == 3) {
                                            let befo = new Date();
                                            login_chk[j].push(befo.getTime())
                                            let str = '<body>' + '<meta charset="UTF-8">' + '<meta http-equiv="X-UA-Compatible" content="IE=edge">' + '<script>' + 'alert("비밀번호가 ' + count + '번 틀렸습니다. 로그인이 1분간 제한됩니다.");' + 'location.replace("/");' + '</script>' + '</body>'
                                            response.write(str)
                                        }
                                        else {
                                            let str = '<body>' + '<meta charset="UTF-8">' + '<meta http-equiv="X-UA-Compatible" content="IE=edge">' + '<script>' + 'alert("비밀번호가 ' + count + '번 틀렸습니다.");' + 'location.replace("/");' + '</script>' + '</body>'
                                            response.write(str)
                                        }
                                    }
                                }
                                if (chk == 0) {
                                    //처음 틀린 경우
                                    let temp = []
                                    temp.push(objArray[i].user_id)
                                    temp.push(1)
                                    login_chk.push(temp)
                                    let str = '<body>' + '<meta charset="UTF-8">' + '<meta http-equiv="X-UA-Compatible" content="IE=edge">' + '<script>' + 'alert("비밀번호가 1번 틀렸습니다.");' + 'location.replace("/");' + '</script>' + '</body>'
                                    response.write(str)
                                }
                            }


                        }
                        else {//비번 확인(같은 경우)
                            login_id = arr[0].user_id
                            let tex = '<body>' + '<script>' + 'location.replace("/Enrolment")' + '</script>' + '</body>'
                            response.end(tex)
                        }
                    }
                }
            }
            if (id_exi == 0) {//아이디가 없는 경우
                let tex = '<body>' + '<meta charset="UTF-8">' + '<meta http-equiv="X-UA-Compatible" content="IE=edge">' + '<script>' + 'alert("해당 아이디가 없습니다."); location.replace("/");' + '</script>' + '</body>'
                response.end(tex)
            }
        }
    })
})

app.get('/SignUp', (request, response) => {//회원가입 페이지
    fs.readFile("./SignUp.html", (error, data) => {
        response.writeHead(200, { 'Content-Type': "text/html" })
        response.end(data)
    })
})

app.post('/SignUp', (request, response) => {//회원가입 확인
    let arr = [];
    arr.push(request.body);
    let check = 0;

    let objArray = []

    let sql = 'SELECT * FROM Student';
    conn.query(sql, function (err, rows, fields) {
        if (err) console.log('query is not executed. select fail...\n' + err);
        else {
            objArray = JSON.parse(JSON.stringify(rows))//문자열로바꾸고 객체로 파싱.


            for (let i in objArray) if (objArray[i].user_id == arr[0].user_id) { check = 1; break; }

            if (check == 0) {

                let sql = "INSERT INTO Student VALUES('" + arr[0].user_id + "', '" + arr[0].user_pwd + "');"//작은 따옴표도 해줘야 SQL문법에러 안생김
                conn.query(sql);//서버에 회원정보 삽입


                let tex = '<body>' + '<meta charset="UTF-8">' + '<meta http-equiv="X-UA-Compatible" content="IE=edge">' + '<script>' + 'alert("회원가입되었습니다."); window.close();' + '</script>' + '</body>'
                response.end(tex)
            }
            else {
                let tex = '<body>' + '<meta charset="UTF-8">' + '<meta http-equiv="X-UA-Compatible" content="IE=edge">' + '<script>' + 'alert("이미 사용 중인 아이디입니다. 다른 아이디를 입력하십시오."); location.replace("/SignUp");' + '</script>' + '</body>'
                response.end(tex)

            }
        }
    })
})

app.get('/Enrolment', (request, response) => {
    let objArray = [] //로그인 아이디가 신청한 과목
    let objArray2 = [] //전체 과목
    let sum = 0

    let sql = "SELECT S.name, professor, credit FROM Subject S, Enrol E WHERE user_id='" + login_id + "' AND E.name=S.name;"
    conn.query(sql, function (err, rows, fields) {
        if (err) console.log('query is not executed. select fail...\n' + err);
        else {
            objArray = JSON.parse(JSON.stringify(rows))//문자열로바꾸고 객체로 파싱.

            let sql2 = "SELECT * FROM Subject"
            conn.query(sql2, function (err, rows, fields) {
                if (err) console.log('query is not executed. select fail...\n' + err);
                else {
                    objArray2 = JSON.parse(JSON.stringify(rows))//문자열로바꾸고 객체로 파싱.


                    let output1 = ""
                    output1 += "<h4>\<수강 신청한 교과목\></h4>"
                    output1 += '<table> <tr><th>교과목명<th>담당교수<th>학점'

                    for (let i in objArray) {
                        output1 += "<tr><td>"
                        output1 += objArray[i].name
                        output1 += "<td>"
                        output1 += objArray[i].professor
                        output1 += "<td>"
                        output1 += objArray[i].credit
                        output1 += "</tr>"
                        sum += objArray[i].credit
                    }



                    output1 += "</table><p><h5> \<총 수강 신청한 학점 총점 : "
                    output1 += sum
                    output1 += "\></h5></p>"


                    let output2 = "";
                    output2 += "<h4> \<전체 교과목\> </h4>"
                    output2 += `<table> <tr><th>교과목명<th>담당교수<th>학점 `
                    for (let i in objArray2) {
                        if (i != "") {
                            output2 += "<tr><td>"
                            output2 += objArray2[i].name
                            output2 += "<td>"
                            output2 += objArray2[i].professor
                            output2 += "<td>"
                            output2 += objArray2[i].credit
                            output2 += "</tr>"
                        }
                    }
                    output2 += "</table>"

                    fs.readFile("./Enrolment.html", (error, data) => {
                        response.writeHead(200, { 'Content-Type': "text/html" })
                        response.write(data)//html
                        response.write(output1)//수강신청한 과목 테이블 보여주기
                        response.write(output2)//전체 과목 테이블
                        response.end()
                    })
                }
            })
        }
    })
})



app.post('/Enrolment/insert', (request, response) => {//DB에 전송된 데이터 삽입(insert)
    let enrolData = request.body.intext;//post로 전송 받은 교과목명
    let enrolArray = []//로그인 아이디가 등록한 과목명
    let enrolArray2 = []//전체 과목명
    let chk = 0;

    let sql = "SELECT name FROM Enrol WHERE user_id='" + login_id + "';"
    conn.query(sql, function (err, rows, fields) {
        if (err) console.log('query is not executed. select fail...\n' + err);
        else {
            enrolArray = JSON.parse(JSON.stringify(rows))//문자열로바꾸고 객체로 파싱.

            let sql2 = "SELECT name FROM Subject"
            conn.query(sql2, function (err, rows, fields) {
                if (err) console.log('query is not executed. select fail...\n' + err);
                else {
                    enrolArray2 = JSON.parse(JSON.stringify(rows))//문자열로바꾸고 객체로 파싱.
                    //console.log(enrolArray2) //[ { name: 'C++프로그래밍' }, { name: '범죄심리학' } ] 형태

                    for (let i in enrolArray2) {//전체 과목에서 입력된 데이터가 있는지 확인
                        //console.log("i.name : "+enrolArray2[i].name)
                        if (enrolArray2[i].name == enrolData) chk = 1
                    }
                    if (chk == 0) {
                        response.write('<body><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><script>alert("교과목명이 잘못 입력되었습니다. 다시 입력하십시오.");location.replace("/Enrolment");</script>')
                    }

                    else {
                        chk = 0
                        for (let i in enrolArray) {
                            if (enrolArray[i].name == enrolData) {//이미 수강신청한 과목인지 확인
                                chk = 1;
                                response.write('<body><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><script>alert("이미 수강신청한 교과목입니다."); location.replace("/Enrolment");</script>')
                            }
                        }
                        if (chk == 0) {//수강신청과목 db에 추가
                            let sql3 = "INSERT INTO Enrol VALUES('" + login_id + "', '" + enrolData + "');"
                            conn.query(sql3)

                            response.write('<body><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><script>alert("수강신청되었습니다.");location.replace("/Enrolment");</script>')
                        }
                    }
                }
            })
        }
    })
})
app.post('/Enrolment/delet', (request, response) => {//enrolment.txt에 데이터 삭제(delete)
    let enrolData = request.body.intext; //post로 전송 받은 교과목명
    let enrolArray = []//등록한 과목명
    let enrolArray2 = []//전체 과목명
    let chk = 0;

    let sql = "SELECT name FROM Enrol WHERE user_id='" + login_id + "';"
    conn.query(sql, function (err, rows, fields) {
        if (err) console.log('query is not executed. select fail...\n' + err);
        else {
            enrolArray = JSON.parse(JSON.stringify(rows))//문자열로바꾸고 객체로 파싱.

            let sql2 = "SELECT name FROM Subject"
            conn.query(sql2, function (err, rows, fields) {
                if (err) console.log('query is not executed. select fail...\n' + err);
                else {
                    enrolArray2 = JSON.parse(JSON.stringify(rows))

                    for (let i in enrolArray2) {//전체 과목에서 입력된 데이터가 있는지 확인
                        if (enrolArray2[i].name == enrolData) chk = 1
                    }
                    if (chk == 0) {
                        response.write('<body><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><script>alert("교과목명이 잘못 입력되었습니다. 다시 입력하십시오.");location.replace("/Enrolment");</script>')
                    }
                    if (chk == 1) {
                        chk = 0
                        for (let i in enrolArray) {
                            if (enrolArray[i].name == enrolData) {//교과목 삭제
                                chk = 1;

                                let sql3 = "Delete FROM Enrol where user_id='" + login_id + "' AND name='" + enrolData + "';"
                                conn.query(sql3)

                                response.write('<body><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><script>alert("삭제되었습니다."); location.replace("/Enrolment");</script>')
                                break;
                            }
                        }
                        if (chk == 0) {//신청안한 교과목
                            response.write('<body><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><script>alert("수강신청하지 않은 교과목입니다.");location.replace("/Enrolment");</script>')
                        }
                    }
                }
            })
        }
    })
})

app.listen(52273, () => { console.log('Server Start') });//서버구동 코드