import React, { useContext, useEffect, useState } from 'react'
import {AppBar, Toolbar, Grid, 
    Typography, Button} from "@mui/material";
import './header.css';
import { Link, useNavigate } from 'react-router-dom';
import { isLogin, getLoginUserInfo } from '../../util/login-utils';
import AuthContext from '../../util/AuthContext';
import { API_BASE_URL, USER } from '../../config/host-config';

const Header = () => {

    const profileRequestURL = API_BASE_URL+USER+'/load-profile';

    const redirection = useNavigate();

    // 프로필 이미지 url 상태 변수
    const [profileUrl, setProfileUrl] = useState(AuthContext)

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

    const fetchProfileImage = async() => {
        const res = await fetch(profileRequestURL, {
            method: 'GET',
            headers: {'Authorization' : 'Bearer ' 
                    + localStorage.getItem('ACCESS_TOKEN')}
        });

        if(res.status === 200){
            //서버에는 직렬화된 이미지가 응답된다.
            const profileBlob = await res.blob();
            // 받은 이미지를 imgUrl로 변경
            const imgUrl = window.URL.createObjectURL(profileBlob);
            setProfileUrl(imgUrl);
        } else{
            const err = await res.text();
            setProfileUrl(null)
        }


    }

    useEffect( () => {
        fetchProfileImage();
    }, [isLoggedIn]);




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
                            {isLoggedIn &&
                                <img 
                                    src={profileUrl || require('../../assets/img/anonymous.jpg')} 
                                    alt="profileImg"
                                    style={{
                                        marginRight: 15,
                                        width: 65,
                                        height: 65,
                                        borderRadius: '50%'
                                    }} 
                                />
                            }
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