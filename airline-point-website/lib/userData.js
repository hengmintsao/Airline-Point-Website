import { getToken } from "./authenticate";

/* =============================================================History==============================================================================
1. Date: 2025-Jan-14 Description: userData.js authenticated to view or interact with your data #TO-DO: Test



=====================================================================================================================================================
*/


// Add and item into comparsion list
export async function addToComparsion(id){

    const token = getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comparsion/${id}`,
        {method:'POST',
            headers:{
                'content-type': 'application/json',
                'authorization': `JWT ${token}`,
            },
        });

    if(res.status === 200){
            return await res.json();
    }else{
        return [];
    }

}


// Delete and item into comparsion list
export async function removeComparsion(id){

    const token = getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comparsion/${id}`,
        {method: 'DELETE',
            headers:{
                'content-type': 'application/json',
                'authorization': `JWT ${token}`
            },
        }
    );

    if(res.status === 200){
        return await res.json();
    }else{
        return [];
    }
}


// Fetch the comparsion list for the user
export async function getComparsion(){

    const token = getToken();
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comparsion`,
        {method: 'GET',
            headers:{
                'content-type': 'application/json',
                'authorization': `JWT ${token}`
            },
        }
    );

    if(res.status === 200){
        return await res.json();
    }else{
        return [];
    }
}


// Adds an item to the history list
export async function addToHistory(id){

    const token = getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/history/${id}`,
        {method: 'POST',
            headers:{
                'content-type': 'application/json',
                'authorization': `JWT ${token}`
            },
        });
    
    if(res.status === 200){
        return await res.json();
    }else{
        return [];
    }
        
}

// Remove an item to the history list
export async function removeFromHistory(id){

    const token = getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/history/${id}`,
        {method: 'DELETE',
            headers:{
                'content-type': 'application/json',
                'authorization': `JWT ${token}`,
            }
        }
    );

    if(res.status === 200){
        return await res.json();
    }else{
        return [];
    }
}



// Fetch the history list for the user
export async function getHistory(){

    const token = getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/history`,
        {method: 'GET',
            headers:{
                'content-type': 'application/json',
                'authorization': `JWT ${token}`
            },
        }
    );

    if(res.status === 200){
        return await res.json();
    }else{
        return [];
    }
}