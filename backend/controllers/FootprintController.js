const Footprint = require("../models/Footprint");

// These are the carbon emission factors (how much CO2 is produced per unit)
// These are average values - in real apps, these would be more detailed
const EMISSION_FACTORS = {
  // Transportation: kg CO2 per kilometer
  car: 0.21,        // Car produces 0.21 kg CO2 per km
  bus: 0.089,       // Bus produces 0.089 kg CO2 per km
  train: 0.041,     // Train produces 0.041 kg CO2 per km
  plane: 0.255,     // Plane produces 0.255 kg CO2 per km
  
  // Electricity: kg CO2 per kWh (kilowatt-hour)
  electricity: 0.5,  // Average electricity produces 0.5 kg CO2 per kWh
  
  // Diet: kg CO2 per day (average daily diet emissions)
  vegan: 2.5,       // Vegan diet produces about 2.5 kg CO2 per day
  "non-veg": 7.2    // Non-vegan diet produces about 7.2 kg CO2 per day
};

// This function calculates the carbon footprint when user submits the form
const calculateFootprint = async (req, res) => {
  try {
    // Get data from the request body (sent from frontend)
    const { transportation, distance, electricity, diet } = req.body;
    
    // Get userId from the request (added by authMiddleware after verifying token)
    const userId = req.userId;

    // Validation: Check if all required fields are provided
    if (!transportation || !distance || !electricity || !diet) {
      return res.status(400).json({
        message: "All data required",
        error: "Please fill all fields: Transportation, Distance, Electricity, and Diet"
      });
    }

    // Additional validation: Check if distance and electricity are valid numbers
    if (isNaN(distance) || parseFloat(distance) <= 0) {
      return res.status(400).json({
        message: "Invalid distance",
        error: "Distance must be a positive number"
      });
    }

    if (isNaN(electricity) || parseFloat(electricity) <= 0) {
      return res.status(400).json({
        message: "Invalid electricity",
        error: "Electricity must be a positive number"
      });
    }

    // Start with 0 carbon footprint
    let totalCarbon = 0;

    // Step 1: Calculate transportation carbon footprint
    const factor = EMISSION_FACTORS[transportation.toLowerCase()];
    if (!factor) {
      return res.status(400).json({
        message: "Invalid transportation type",
        error: "Please select a valid transportation type"
      });
    }
    // Multiply emission factor by distance to get total CO2
    totalCarbon += factor * parseFloat(distance);

    // Step 2: Calculate electricity carbon footprint
    // Multiply emission factor by electricity usage
    totalCarbon += EMISSION_FACTORS.electricity * parseFloat(electricity);

    // Step 3: Calculate diet carbon footprint
    const dietFactor = EMISSION_FACTORS[diet.toLowerCase()];
    if (!dietFactor) {
      return res.status(400).json({
        message: "Invalid diet type",
        error: "Please select a valid diet type"
      });
    }
    // Add daily diet emissions (assuming this is for one day)
    totalCarbon += dietFactor;

    // Step 4: Save the calculation to the database
    const footprint = await Footprint.create({
      userId,                    // Which user made this calculation
      transportation: transportation,
      distance: parseFloat(distance),
      electricity: parseFloat(electricity),
      diet: diet,
      carbonFootprint: totalCarbon  // The total calculated carbon footprint
    });

    // Step 5: Send response back to frontend
    res.status(200).json({
      message: "Carbon footprint calculated successfully",
      data: {
        id: footprint._id,
        transportation: footprint.transportation,
        distance: footprint.distance,
        electricity: footprint.electricity,
        diet: footprint.diet,
        carbonFootprint: footprint.carbonFootprint.toFixed(2),  // Round to 2 decimal places
        date: footprint.date
      }
    });
  } catch (err) {
    // If something goes wrong, send error message
    res.status(500).json({
      message: "Calculation failed",
      error: err.message
    });
  }
};

// Export the function so it can be used in routes
module.exports = {
  calculateFootprint
};
