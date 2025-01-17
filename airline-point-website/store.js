import { atom } from "jotai";

/* =============================================================History==============================================================================
1. Date: 2025-Jan-11 Description: store.js can allow users to keep track of previous searches and re-run/delete them if they want. #TO-DO: Add comparsionAtom
2. Date: 2025-Jan-12 Description: comparsionAtom completed. #TO-DO: integration test
3. Date: 2025-Jan-17 Description: Update comparsionAton(Remove array), update searchHistoryAtom(Remove array) #TO-DO: integration test


=====================================================================================================================================================
*/

export const searchHistoryAtom = atom();

export const comparsionAtom = atom();