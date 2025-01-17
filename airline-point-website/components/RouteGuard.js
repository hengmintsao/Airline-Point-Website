import { useAtom } from "jotai";
import { searchHistoryAtom, comparsionAtom } from "@/store";
import { getComparsion, getHistory } from "@/lib/userData";

const PUBLIC_PATHS = ['/login', '/', '/_error', '/register'];

export default function RouteGuard(props){

    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [comparsionList, setComparsionList] = useAtom(comparsionAtom);

    async function updateAtoms(){
        setComparsionList(await getComparsion());
        setSearchHistory(await getHistory());
    }

    return(
        <>
        {props.children}
        </>
    )
}