import { useState } from "react";


/* =============================================================History==============================================================================
1. Date: 2025-Jan-14 Description: AutoComplete.js can let users faster to complete the imput Area. #TO-DO: 


=====================================================================================================================================================
*/

export default function AutoComplete({options = [], onChange}){

    const [value, setValue] = useState("");
    const [showOptions, setShowOptions] = useState(false);
    const [filteredOptions, setFilterOptions] = useState([]);


    const handleChange = e => {
        const value = e.target.value;
        setValue(e.target.value);
        onChange(value);

        if(value.length > 0){
            
            const filtered = options.filter(option =>
              option.toLowerCase().includes(value.toLowerCase()));
            //console.log("Filtered options are: " ,filtered); // test
            setFilterOptions(filtered);
            setShowOptions(filtered.length > 0);
        }else{

            setShowOptions(false);
        }

    }
    const handleSuggestionClick = (suggestions) => {
        //console.log("Selected suggestion:", suggestions);
        setValue(suggestions);
        setShowOptions(false);
        onChange(suggestions);
    };
    


    
    return(
        <div style={{ position: "relative" }}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={() => setTimeout(() => setShowOptions(false), 100)} // Delay to allow option click
        onFocus={() => setShowOptions(true)}
      />
      {showOptions && (
        <ul style={{ position: "absolute", zIndex: 1000, background: "white", border: "1px solid #ccc", width: "100%" }}>
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