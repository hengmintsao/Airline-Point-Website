import { jwtDecode } from "jwt-decode";

/* =============================================================History==============================================================================
1. Date: 2025-Jan-14 Description: authenticate.js authenticated to view or interact with your data #TO-DO: Test



=====================================================================================================================================================
*/


export async function authenticateUser(user, password){
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/login`,{
        method: 'POST',
        body: JSON.stringify({userName: user, password: password}),
        headers:{
            'content-type': 'application/json',
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

function setToken(token){
    localStorage.setItem('access_token', token);
}



export function getToken(){
    try{
        return localStorage.getItem('access_token');
    }catch(err){
        return null;
    }
}

export function removeToken(){
    localStorage.removeItem('access_token');
}


export function readToken(){
    try{
        const token = getToken();
        return token ? jwtDecode(token) : null;
    }catch(err){
        return null;
    }
}

export function isAuthenticated(){
    const token = readToken();
    return token ? true : false;
}

export async function registerUser(user, password, password2){

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/register`, {
        method: 'POST',
        headers:{
            'content-type':'application/json',
        },
    });

    const data = await res.json();

    if(res.status === 200){
        return true;
    }else{
        throw new Error(data.message);
    }

}