import mongoose from "mongoose";

/* =============================================================History==============================================================================
1. Date: 2025-Jan-27 Description: For searching airport data from mongoDB. #TO-DO:



=====================================================================================================================================================
*/

// This JavaScript file connects to MongoDB, defines the Airline schema, and handles GET requests to retrieve "all" airline data.
const MONGO_URL = process.env.MONGO_URL

//Define airline Schema and model
let dataAirportSchema = new mongoose.Schema({
    iata: String,
    displayName: String
})


const Airport = mongoose.models.Airport || mongoose.model("Airport", dataAirportSchema, "airports"); // Need the third parameter

export default async function handler(req,res){

    if(req.method !== "GET"){

        return res.status(405).json({error: "Only GET requests are allowed"});
    }

    try{
        // if (!mongoose.connection.readyState) {
        //     console.log("Connecting to MongoDB...");
        // }
        await mongoose.connect(MONGO_URL);
        console.log("MongoDB connected.");
        const airports = await Airport.find();
        console.log("Fetched airlines:", airports);

        res.status(200).json(airports);
        
    }catch(error){
        console.error("MongoDB connection error:", error);
        res.status(500).json({error: "Failed to fetch data from MongoDB", details: error.message});

    }

}