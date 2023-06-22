import React, { useState } from 'react'
import {Button, Container, Grid,
  TextField, Typography, Link} from "@mui/material";


const Join = () => {

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



  //검증 데이터를 상태 변수에 저장하는 함
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


  //이메일 입력창 체인지 이벤트 핸들러
  const emailHandler = e => {

    //입력한 값을 상태변수에 저장
    const inputVal = e.target.value;

    setUserValue({
      ...userValue,
      email: inputVal
    });

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



  //입력창 체인지 이벤트 핸들러
  const joinButtonClickHandler = e => {

    e.preventDefault(); //submit 막아주기

    console.log(userValue);

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