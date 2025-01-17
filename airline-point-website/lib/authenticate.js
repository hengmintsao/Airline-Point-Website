import { jwtDecode } from "jwt-decode";

/* =============================================================History==============================================================================
1. Date: 2025-Jan-14 Description: authenticate.js authenticated to view or interact with your data #TO-DO: Test



=====================================================================================================================================================
*/

// Authenticates user with their username and password and retrieves token
export async function authenticateUser(user, password){
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/login`,{
        method: 'POST',
        body: JSON.stringify({userName: user, password: password}),
        headers:{
            'Content-type': 'application/json',
        },
    });

    const data = await res.json();

    if(res.status === 200){
        setToken(data.token);
        return true;
    }else{
        throw new Error(data.message);
    }
}

// Store token into local storage
function setToken(token){
    localStorage.setItem('access_token', token);
}


// Get token from local storage
export function getToken(){
    try{
        return localStorage.getItem('access_token');
    }catch(err){
        return null;
    }
}


// Remove token from local storage
export function removeToken(){
    localStorage.removeItem('access_token');
}



// Decode token 
export function readToken(){
    try{
        const token = getToken();
        return token ? jwtDecode(token) : null;
    }catch(err){
        return null;
    }
}


// Chech if user with token
export function isAuthenticated(){
    const token = readToken();
    return token ? true : false;
}



// Register a new user
export async function registerUser(user, password, password2,email, nationality, mainAirport, preferenceCarrier, preferenceAlliance,){

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/register`, {
        method: 'POST',
        body: JSON.stringify({userName:user, password, password2:password2, email, nationality, mainAirport, preferenceCarrier, preferenceAlliance}),
        headers:{
            'Content-type':'application/json',
        },
    });

    const data = await res.json();
    console.log("Register response data:", data);
    console.log("Register response data.message:", data.message);
    if (res.status === 200) {
        return true;
      } else {
        // 如果 data.message 是物件，就自己決定要如何處理
        if (typeof data.message === 'object') {
          // 例如把它轉成字串
          throw new Error(JSON.stringify(data.message));
        } else {
          // 如果是字串就直接拋出
          throw new Error(data.message);
        }
      }

}