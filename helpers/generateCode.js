import crypto from "crypto";
import { Op } from "sequelize";


function generateAppCode(prefix = "REST") {
  const randomPart = crypto.randomBytes(4).toString("hex").toUpperCase(); // 8 chars
  return `${prefix}-${randomPart}`;
}

function generateApiKey() {
  return crypto.randomBytes(16).toString("hex").toUpperCase(); // 32 chars
}

async function generateUniqueValue({
  model,
  field,
  generateFn,
  maxRetries = 10,
  transaction,
}) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const value = generateFn();

    const exists = await model.findOne({
      where: { [field]: { [Op.eq]: value } },
      attributes: ["id"],
      transaction,
    });

    if (!exists) {
      return value;
    }
  }

  throw new Error(
    `Could not generate unique value for field "${field}" after ${maxRetries} attempts`
  );
}



export {
  generateAppCode,
  generateApiKey,
  generateUniqueValue
};
