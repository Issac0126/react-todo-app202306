import React, { useState } from 'react'
import {Button, Container, Grid,
  TextField, Typography, Link} from "@mui/material";


// 리다이렉트 사용하기
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL as BASE, USER } from '../../config/host-config';

const Join = () => {

  //리다이렉트 사용하기
  const redirection = useNavigate();
  
  const API_BASE_URL = BASE+USER;


  //회원가입 입력값에 대한 상태변수 관리
  const [userValue, setUserValue] = useState({
    userName: '', password: '', email: ''
  });

  //검증 메세지에 대한 상태변수 관리
  const [message, setMessage] = useState({
    userName: '', password: '', passwordCheck: '', email: ''
});

  //검증 완료 체크에 대한 상태변수 관리
  const [correct, setCorrect] = useState({
    userName: false, password: false, passwordCheck: false, email: false
  });



  //검증 데이터를 상태 변수에 저장하는 함수
  const saveInputState = ({key, inputVal, flag, msg}) => {

    // [key]에서 괄호가 없으면 새로운 프로퍼티라고 인식함. []로 변수임을 알려줘야한다.
    
    inputVal !== 'pass' 
    && setUserValue({
      ...userValue,
      [key]: inputVal
    });

    setMessage({
      ...message,
      [key]: msg
    });

    setCorrect({
      ...correct,
      [key]: flag
    });

  }




  //이름 입력창 체인지 이벤트 핸들러
  const nameHandler = e => {
    const nameRegex = /^[가-힣]{2,6}$/;

    const inputVal = e.target.value; //입력한 값을 상태변수에 저장

    //입력값 검증
    let msg; //검증 메세지를 저장할 변수
    let flag = false; //입력 검증 체크용
    if(!inputVal){ //inputVal에 아무것도 입력하지 않는다면
      msg = '유저 이름을 입력해주세요.';
    } else if(!nameRegex.test(inputVal)){ // 정규표현식에 일치하면 true
      msg = '2~6글자의 한글로 입력해주세요.'
    } else{
      msg = '사용 가능한 이름입니다.'
      flag = true;

    }

    //객체 프로퍼티에 세팅하는 변수의 이름이 키 값과 동일한 경우
    //콜론 생략이 가능
    // ex)  flag: flag,  ->  flag,
    saveInputState({key : 'userName', inputVal, flag, msg});

  }


  //이메일 중복 체크 서버 통신 함수
  const fetchDuplicateCheck = email => {

    let msg='', flag=false;
    fetch(`${API_BASE_URL}/check?email=${email}`)
      .then(res => {
        if(res.status === 200){
          return res.json();
        }
      })
      .then(json => {
        if(json){ 
          msg = '중복된 이메일입니다.'
        }else {
          msg = '사용 가능한 이메일 입니다.'
          flag = true;
        }

        setUserValue({...userValue, email: email});  //버튼 만들어서 클릭 이벤트에 넣기. 
        setMessage({...message, email: msg});   // 원랜 이렇게 하면 안됨.
        setCorrect({...correct, email: flag});

      })
      .catch(err => {
        console.log("서버 통신이 원활하지 않습니다.");
      });


  };



  //이메일 입력창 체인지 이벤트 핸들러
  const emailHandler = e => {

    //입력한 값을 상태변수에 저장
    const inputVal = e.target.value;
    
    const emailRegex = /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/;

    let msg;
    let flag = false;
    if(!inputVal){ msg = '이메일을 입력해주세요.';
    } else if(!emailRegex.test(inputVal)){ 
      msg = '이메일 형식이 아닙니다.';
    } else{
      //이메일 중복 체크
      fetchDuplicateCheck(inputVal); //버튼으로 바꾸기. 지금은 시간이 없어 생략.
      return;
    }

    saveInputState({
      key: 'email', inputVal, msg, flag });

  }


  //패스워드 입력창 체인지 이벤트 핸들러
  const passwordHandler = e => {

    //패스워드가 변동되면 패스워드 확인란을 비우기
    document.getElementById('password-check').value = '';
    // document.getElementById('check-text').textContent = '';
    saveInputState({key : 'passwordCheck', inputVal: 'pass', flag: false, 
                msg: '비밀번호 변경 시 확인란을 다시 입력해야 합니다.'})
                
    console.log(correct.passwordCheck);



    const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;
    const inputVal = e.target.value;

    //검증 시작
    let flag = false;
    let msg;
    if(!inputVal){
      msg = '비밀번호를 입력해주세요.';
    }else if(!pwRegex.test(inputVal)){
      msg = '영어, 숫자, 특수문자를 포함한 8~20자로 입력해주세요.';
    }else{
      msg = '사용 가능한 비밀번호입니다.'
      flag = true;
    }

    saveInputState({key : 'password', inputVal, flag, msg })

  
  }


  //비밀번호 확인란 체크
  const pwCheckHandler = e => {

    //검증 시작
    let msg;
    let flag = false;

    if(!e.target.value){
      msg = '비밀번호 확인란을 입력해주세요.';
    } else if(userValue.password !== e.target.value){
      msg = '비밀번호가 일치하지 않습니다.';
    } else{
      msg = '비밀번호가 일치합니다.';
      flag = true;
    }

    saveInputState({key : 'passwordCheck', inputVal: 'pass', flag, msg})


  }


  //4개의 입력칸이 모두 검증에 통과했는지 여부를 검사
  const isValid = () => {

    for(const key in correct){
      const flag = correct[key]; //키 값을 줘도 value가 나옴.
      if(!flag) return false;
    }
    return true;

  }

  //회원 가입 처리 서버 요청
  const fetchSignUpPost = () => {
    fetch(API_BASE_URL, {
      method: 'POSt',
      headers: {'content-type' : 'application/json'},
      body: JSON.stringify(userValue)
    })
    .then(res => {
      if(res.status === 200){
        alert('회원가입에 성공했습니다!');
        //로그인 페이지로 리다이렉트
        // window.location.href = '/login'; 가능하나 화면이 꿈뻑거리는 단점이 있음.
        redirection('/login');
      } else {
        alert('서버와의 통신이 원활하지 않습니다.')
      }
    })
    .then(json => {

    })
  }



  //입력창 체인지 이벤트 핸들러
  const joinButtonClickHandler = e => {

    e.preventDefault(); //submit 막아주기
    console.log(userValue);
    
    //회원가입 서버 요청
    if(isValid()){
      fetchSignUpPost();
    } else {
      alert('입력란을 다시 확인해 주세요!')
    }
  }





  return (
    <Container component="main" maxWidth="xs" style={{ margin: "200px auto" }}>
        <form noValidate>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                        계정 생성
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        autoComplete="fname"
                        name="username"
                        variant="outlined"
                        required
                        fullWidth
                        id="username"
                        label="유저 이름"
                        autoFocus
                        onChange={nameHandler}
                    />
                    <span style={
                      correct.userName ? {color : 'green'} : {color : 'red'}
                    }>{message.userName}</span>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="이메일 주소"
                        name="email"
                        autoComplete="email"
                        onChange={emailHandler}
                    />
                    <span style={
                      correct.email ? {color : 'green'} : {color : 'red'}
                    }>{message.email}</span>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="패스워드"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={passwordHandler}
                    />
                    <span style={
                      correct.password ? {color : 'green'} : {color : 'red'}
                    }>{message.password}</span>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password-check"
                        label="패스워드 확인"
                        type="password"
                        id="password-check"
                        autoComplete="check-password"
                        onChange={pwCheckHandler}
                    />
                    <span id="check-text" style={
                      correct.passwordCheck ? {color : 'green'} : {color : 'red'}
                    }>{message.passwordCheck}</span>
                </Grid>

                <Grid item xs={12}>
                    <Button 
                      type="submit" 
                      fullWidth 
                      variant="contained" 
                      style={{background: '#38d9a9'}}
                      onClick={joinButtonClickHandler}
                    >
                        계정 생성
                    </Button>
                </Grid>
            </Grid>
            <Grid container justify="flex-end">
                <Grid item>
                    <Link href="/login" variant="body2">
                        이미 계정이 있습니까? 로그인 하세요.
                    </Link>
                </Grid>
            </Grid>
        </form>
    </Container>
  );
}

export default Join