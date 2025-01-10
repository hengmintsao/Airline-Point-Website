import mongoose from "mongoose";

/* =============================================================History==============================================================================
1. Date: 2025-Jan-07 Description: About.js can view card list, CardDetail basic feature complete. #TO-DO: Might need to consider storage folder and names might too similar to another folder



=====================================================================================================================================================
*/

// This JavaScript file connects to MongoDB, defines the Airline schema, and handles GET requests to retrieve "all" airline data.
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

const Airline = mongoose.models.Airline || mongoose.model("Airline", airlineSchema, "airline"); // Need the third parameter

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
        const airlines = await Airline.find();
        console.log("Fetched airlines:", airlines);

        res.status(200).json(airlines);
        
    }catch(error){
        console.error("MongoDB connection error:", error);
        res.status(500).json({error: "Failed to fetch data from MongoDB", details: error.message});

    }

}