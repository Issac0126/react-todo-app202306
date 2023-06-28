import React, { useState, useContext, useEffect } from 'react'
import {Button, Container, Grid,
  TextField, Typography, Link} from "@mui/material";
import { API_BASE_URL as BASE, USER } from '../../config/host-config';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../util/AuthContext';
import CustomSnackBar from '../../config/CustomSnackBar';

const Login = () => {

  const redirection = useNavigate();

  // AuthContext에서 onLogin 함수를 가져온다. 
  const {onLogin, isLoggedIn} = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if(isLoggedIn){
      setOpen(true);
      setTimeout(()=>{
        redirection('/');
      }, 3000);
    }
  }, [isLoggedIn, redirection]);



  const REQUEST_URL = BASE + USER + "/signin";

  //서버에 비동기 로그인 요청
  //함수 앞에 async를 붙이면 해당 함수는 프로미스 객체를 바로 리턴한다.

  const fetchLogin = async() => {

    //사용자가 입력한 이메일, 비밀번호 입력 태그 얻어오기
    const $email = document.getElementById('email');
    const $password = document.getElementById('password');
    console.log($email.value + ' / ' +$password.value);
    
    // # async - await
    //await는 async로 선언된 함수에서만 사용이 가능하다.
    //await는 프로미스 객체가 처리될 때까지 기다린다. 
    //프로미스 객체의 반환값을 바로 활용할 수 있게 도와준다.
    //then을 활용하는 것보다 가독성이 좋고 쓰기도 용이하다.
    const res = await fetch(REQUEST_URL, {
      method: 'post',
      headers: {'content-type' : 'application/json'},
      body: JSON.stringify({
        email : $email.value,
        password : $password.value
      })
    });
    
    if(res.status === 400){ // 로그인이 틀린다면
      const text = await res.text();
      alert(text);
      return;
    }
    
    const { token, userName, email, role } = await res.json();
    // console.log('json :'+json);
 
    // Context API를 사용하여 로그인 상태를 업데이트한다.
    onLogin(token, userName, role);

    
    //홈으로 리다이렉트 
    redirection('/');
    

    // fetch(REQUEST_URL, {
    //   method: 'post',
    //   headers: {'content-type' : 'application/json'},
    //   body: JSON.stringify({
    //     email : $email.value,
    //     password : $password.value
    //   })
    // })
    // .then(res => {
    //   if(res.status === 400){ //가입이 안되어있거나 비밀번호가 틀림
    //     //400에러는 json이 아닌 text(에러 메세지)가 옴.
    //     return res.text();
    //   }
    //   return res.json();
    // })
    // .then(result => {
    //   if(typeof result === 'string'){
    //     alert(result);
    //     return;
    //   }
    //   console.log('result: '+result);
    // })


  }

  //로그인 요청 핸들러
  const loginHandler = e => {
    e.preventDefault();

    //서버에 로그인 요청 전송
    fetchLogin();

  }





  return (
        <>
          {!isLoggedIn && //isLoggedIn이 false = 비로그인 일 때만 보여ㅜ기.
          <Container component="main" maxWidth="xs" style={{ margin: "200px auto" }}>
              <Grid container spacing={2}>
                  <Grid item xs={12}>
                      <Typography component="h1" variant="h5">
                          로그인
                      </Typography>
                  </Grid>
              </Grid>
              <form noValidate onSubmit={loginHandler}>
                  <Grid container spacing={2}>
                      <Grid item xs={12}>
                          <TextField
                              variant="outlined"
                              required
                              fullWidth
                              id="email"
                              label="email address"
                              name="email"
                              autoComplete="email"
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <TextField
                              variant="outlined"
                              required
                              fullWidth
                              name="password"
                              label="on your password"
                              type="password"
                              id="password"
                              autoComplete="current-password"
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              color="primary"
                          >
                              로그인
                          </Button>
                      </Grid>
                  </Grid>
              </form>
          </Container>
          }
          <CustomSnackBar 
            open={open} 
          />
        </>
      );
}

export default Login