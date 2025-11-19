import logger from "../../config/logger.js";
import model from "../../models/index.js";

const getPointsData = async (req, res) => {
  try {
    const restaurant_id = req.restaurant.id;
    const points = await model.Point.findOne({
      where: { restaurant_id },
      order: [['minSpend', 'ASC']],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    res.json({ success: true,message: "Points data fetched successfully", data: points });
  } catch (error) {
    console.log("Get Points Data Error ----------- ", error);
    logger.error("Get Points Data Error ----------- ", error);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
};

const updatePoints = async (req, res) => {
  try{
    
  }
  catch (error) {
    console.log("Update Points Error ----------- ", error);
    logger.error("Update Points Error ----------- ", error);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
};

export { getPointsData};