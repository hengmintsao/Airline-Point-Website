import mongoose from "mongoose";

/* =============================================================History==============================================================================
1. Date: 2025-Jan-07 Description: About.js can view card list, CardDetail basic feature complete. #TO-DO: Might need to consider storage folder and names might too similar to another folder



=====================================================================================================================================================
*/


// This [id].js file connects to MongoDB, defines the Airline schema and model, and retrieves an airline's details based on its ID.
const MONGO_URL = process.env.MONGO_URL

//Define airline Schema and model
const airlineSchema = new mongoose.Schema({
    Name: String,
    Alliance: String,
    Code: String,
    Website: String,
    Advantage: [String],
    Disadvantage: [String],
    Image: String,
});

const Airline = mongoose.models.Airline || mongoose.model("Airline", airlineSchema, "airline");

export default async function handler(req,res){

    // Retrieve ID from the route parameter
    const { id } = req.query;

    if(req.method !== "GET"){

        return res.status(405).json({error: "Only GET requests are allowed"});
    }

    try{

        mongoose.connect(MONGO_URL);

        // Search single airline
        const airline = await Airline.findById(id);
        if (!airline) {
            return res.status(404).json({ error: "Airline not found" });
          }

        res.status(200).json(airline);
        
    }catch(error){

        res.status(500).json({error: "Failed to fetch data from MongoDB", details: error.message});

    }

}