import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { Card, ListGroup, Button } from "react-bootstrap";
import { removeFromHistory } from "@/lib/userData";

/* =============================================================History==============================================================================
1. Date: 2025-Jan-11 Description: history.js can allow users to keep track of previous searches and re-run/delete them if they want. #TO-DO: 
2. Date: 2025-Jan-25 Description: Add CSS, show more elements(Haven't finish). #TO-DO: Complete CSS and the history page


=====================================================================================================================================================
*/

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  if (!searchHistory) return null;

  let parasedHistory = [];

  parasedHistory = searchHistory.map((h) => ({ ...h }));

  function historyClicked(e, index) {
    e.preventDefault();

    const data = searchHistory[index];
    console.log("History clicked data:", data); // test code
  }

  async function removeHistoryClicked(e, index) {
    e.stopPropagation(); // stop the event from trigging other events
    const itemToRemove = searchHistory[index];
    const updatedHistory = await removeFromHistory(itemToRemove);
    setSearchHistory(updatedHistory);
  }

  if (searchHistory.length === 0) {
    return (
      <>
        <Card>
          <h4>No history</h4>
          <p>Try searching for something else</p>
        </Card>
      </>
    );
  }

  return (
    <ListGroup className="history-list">
      {searchHistory.map((historyItem, index) => (
        <ListGroup.Item
          key={historyItem._id || `history-${index}`}
          onClick={(e) => historyClicked(e, index)}
          className="history-list-item"
        >
          <div className="history-container">
            <span>
            <strong>{index + 1}. Airline:</strong> {historyItem.airline}
            </span>
            {historyItem.history.map((item, idx) => (
              <div key={idx} className="history-details">
                <span>
                  <strong>Type:</strong> {item.type}
                </span>
                <span>
                  <strong>Mileage:</strong> {item.mileage}
                </span>
                <span>
                  <strong>Cost:</strong> ${item.cost}
                </span>
                <span>
                  <strong>Description:</strong> {item.description}
                </span>
              </div>
            ))}
            <div className="history-summary">
              <span>
                <strong>Total Mileage:</strong> {historyItem.totalMileage}
              </span>
              <span>
                <strong>Cost Per Mile:</strong> ${historyItem.costPerMile}
              </span>
            </div>
            <Button
              className="delete-button"
              variant="danger"
              size="sm"
              onClick={(e) => removeHistoryClicked(e, index)}
            >
              Delete this history
            </Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
