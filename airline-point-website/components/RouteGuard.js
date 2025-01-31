import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { searchHistoryAtom, comparsionAtom } from "@/store";
import { getComparsion, getHistory } from "@/lib/userData";
import { useRouter } from "next/router";
import { isAuthenticated } from "@/lib/authenticate";


const PUBLIC_PATHS = ['/login', '/', '/_error', '/register'];

export default function RouteGuard(props){

    const [authorized, setAuthorized] = useState(false); 
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [comparsionList, setComparsionList] = useAtom(comparsionAtom);

    async function updateAtoms(){
        setComparsionList(await getComparsion());
        setSearchHistory(await getHistory());
    }

    const router = useRouter();

    function authCheck(url) {
        const path = url.split('?')[0];
        if (!PUBLIC_PATHS.includes(path) && !isAuthenticated()) {
          console.log(`trying to request a secure path: ${path}`);
          setAuthorized(false);
          router.push('/login');
        }else{
            setAuthorized(true);
        }
    }

    useEffect(() =>{

        authCheck(router.pathname);

        if (isAuthenticated()) {
            updateAtoms();
          }

        
        router.events.on('routeChangeComplete', authCheck);

        return () =>{
            router.events.off('routeChangeComplete', authCheck);
        };
    },[]);


    return(
        <>
        {authorized && props.children}
        </>
    )
}