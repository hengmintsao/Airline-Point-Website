import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { Card, ListGroup, Button} from "react-bootstrap";
import { removeFromHistory } from "@/lib/userData";


/* =============================================================History==============================================================================
1. Date: 2025-Jan-11 Description: history.js can allow users to keep track of previous searches and re-run/delete them if they want. #TO-DO: 


=====================================================================================================================================================
*/


export default function History(){


    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    if(!searchHistory) return null; 

    let parasedHistory = [];

    parasedHistory = searchHistory.map(h => ({ ...h }));
    

    function historyClicked(e, index){
        e.preventDefault();
        
        const data = searchHistory[index];
        console.log("History clicked data:", data); // test code

    }

    async function removeHistoryClicked(e, index){

        e.stopPropagation(); // stop the event from trigging other events 
        // setSearchHistory(current =>{
        //     let x = [...current];
        //     x.splice(index, 1);
        //     return x;
        // });
        setSearchHistory(await removeFromHistory(searchHistory[index]))

    }

    if(searchHistory.length === 0){
        return(
            <>
                    <Card>
                        <h4>No history</h4>
                        <p>Try searching for something else</p>
                    </Card>
                </>
        )
    }

    return(
        
        <ListGroup>
            {parasedHistory.map((historyItem, index) =>(
                <ListGroup.Item key={index} onClick={(e)=>historyClicked(e, index)} className="historyListItem">
                    {Object.keys(historyItem).map((key) =>(<>{key}:<strong>{historyItem[key]}</strong>&nbsp;</>))}
                    <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>&times;</Button> 
                </ListGroup.Item>
            ))}
        </ListGroup>
        
    )
}