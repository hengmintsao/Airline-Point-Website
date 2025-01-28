import { useState, useEffect, useRef } from "react";


/* =============================================================History==============================================================================
1. Date: 2025-Jan-14 Description: AutoComplete.js can let users faster to complete the imput Area. #TO-DO: 
2. Date: 2025-Jan-28 Description: Update handleOutsideClick features #TO-DO:

=====================================================================================================================================================
*/

export default function AutoComplete({options = [], onChange, id, name, value}){

  const [inputValue, setInputValue] = useState(value || "");
    const [showOptions, setShowOptions] = useState(true);
    const [filteredOptions, setFilterOptions] = useState([]);
    const autoCompleteRef = useRef();

    useEffect(() => {
      setInputValue(value || "");
    }, [value]);

    useEffect(()=>{
          const handleOutsideClick = (event) =>{
            if(autoCompleteRef.current && !autoCompleteRef.current.contains(event.target)){
              setShowOptions(false);
            }
          };
          document.addEventListener('click', handleOutsideClick);
    
          return () => {document.removeEventListener('click', handleOutsideClick);
          };
        },[]);

    const handleChange = e => {
        const newValue = e.target.value;
        if (typeof newValue === "string") {
          console.log("Current is: ",newValue);
          setInputValue(newValue);
          onChange(newValue);
        } else {
          console.error("Invalid value detected:", newValue);
        }

        if(newValue.length > 0){
            
            const filtered = options.filter(option =>
              option.toLowerCase().includes(newValue.toLowerCase()));
            //console.log("Filtered options are: " ,filtered); // test
            setFilterOptions(filtered);
            setShowOptions(filtered.length > 0);
        }else{

            setShowOptions(false);
        }

    }
    const handleSuggestionClick = (suggestions) => {
        //console.log("Selected suggestion:", suggestions);
        setInputValue(suggestions);
        setShowOptions(false);
        onChange(suggestions);
    };
    


    
    return(
        <div style={{ position: "relative" }} ref={autoCompleteRef}>
      <input
        type="text"
        id={id}
        name={name}
        value={inputValue}
        onChange={handleChange}
        /*onBlur={() => setTimeout(() => setShowOptions(false), 100)}*/ // Delay to allow option click
        onFocus={() => setShowOptions(true)}
      />
      {showOptions && (
        <ul style={{ position: "absolute", zIndex: 1050, background: "white", border: "1px solid #ccc", width: "100%"}}>
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              style={{ padding: "8px", cursor: "pointer" }}
              onClick={() => handleSuggestionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}