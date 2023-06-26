
// 로그인 한 유저의 데이터 객체를 반환하는 함수
export const getLoginUserInfo = () => {
    return {
        token: localStorage.getItem('ACCESS_TOKEN'),
        userName: localStorage.getItem('LOGIN_USERNAME'),
        role: localStorage.getItem('USER_ROLE')
    };
};


//로그인 여부를 확인하는 함수
export const isLogin = () => !!localStorage.getItem('ACCESS_TOKEN') 
// !!를 통해 논리값으로 바꾼다. 있으면 true를 반환. 



