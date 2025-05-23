import { jwtDecode } from "jwt-decode";

/* =============================================================History==============================================================================
1. Date: 2025-Jan-14 Description: authenticate.js authenticated to view or interact with your data #TO-DO: Test
2. Date: 2025-Feb-03 Description: Remove redundant codes, test complete. #TO-DO: None


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


// Check if user with token
export function isAuthenticated(){
    const token = readToken();
    return token ? true : false;
}



// Register a new user
export async function registerUser(user, password, password2,email, nationality, mainAirport, preferenceCarrier, preferenceAlliance){

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
        
        if (typeof data.message === 'object') {
         
          throw new Error(JSON.stringify(data.message));
        } else {
          
          throw new Error(data.message);
        }
      }

}

// Home page contact form
export async function contactMe(firstname, lastname, email, phone, description){
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/contact`,{
        method: 'POST',
        body: JSON.stringify({firstname, lastname, email, phone, description}),
        headers:{
            'Content-type':'application/json',
        },
    });

    const data = await res.json();
    if (res.status === 200) {
        return true;
      }else {
          throw new Error(data.message);
      }
}