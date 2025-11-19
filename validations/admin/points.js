import Joi from "joi";

const updatePointsSchema = Joi.object({
    points: Joi.number().required().min(1).max(100).messages({
        "number.base": "Points must be a number",
        "number.min": "Points must be at least 1",
        "number.max": "Points must be at most 100",
    }),
    maxPoints: Joi.number().optional().allow(null),
    minSpends: Joi.number().required().allow(null),
}).required();

export { updatePointsSchema };