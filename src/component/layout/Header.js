import React, { useContext, useEffect, useState } from 'react'
import {AppBar, Toolbar, Grid, 
    Typography, Button} from "@mui/material";
import './header.css';
import { Link, useNavigate } from 'react-router-dom';
import { isLogin, getLoginUserInfo } from '../../util/login-utils';
import AuthContext from '../../util/AuthContext';

const Header = () => {

    const redirection = useNavigate();

    // AuthContext에서 로그인 상태와 onLogout 함수를 가져온다.
    const {isLoggedIn, onLogout, userName} = useContext(AuthContext);

    
    //로그아웃 핸들러
    const logoutHandler = e =>{
        // AuthContext의 onLogout 함수를 호출하여 로그인 상태를 업데이트한다.
        onLogout();
        redirection('/login');
    }
    
    // const [userInfo, setUserInfo] = useState({});
    // const {token, userName, role} = userInfo
    // useEffect(() => {
    //     setUserInfo(getLoginUserInfo()); //화면이 처음으로 렌더링 될 때 부르겠다. 
    // }, []);

    return (
        <AppBar position="fixed" style={{
            background: '#38d9a9',
            width: '100%'
        }}>
            <Toolbar>
                <Grid justify="space-between" container>
                    <Grid item flex={9}>
                        <div style={
                            {
                                display:'flex',
                                alignItems: 'center'
                            }
                        }>
                            <Typography variant="h4" >
                                <Link to='/' className='header-title'>
                                    { 
                                        isLoggedIn 
                                        ? userName + '님' : '오늘' 
                                    } 
                                    의 할 일
                                </Link>
                            </Typography>
                        </div>
                    </Grid>

                    <Grid item>
                        <div className='btn-group'>
                        {isLogin() ? 
                            (
                                <button className='logout-btn' 
                                onClick={logoutHandler} >로그아웃</button>
                            )
                            : 
                            (
                                <>
                                    <Link to='/Login'>로그인</Link>
                                    <Link to='/Join'>회원가입</Link>
                                    {/* <a href="/Login">로그인</a>
                                    <a href="/Join">회원가입</a> */}
                                </>
                            )
                        }
                        </div>
                    </Grid>

                </Grid>
            </Toolbar>
        </AppBar>
      );
}

export default Header