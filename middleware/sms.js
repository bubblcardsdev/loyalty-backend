import config from "../config/config.js";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";



const client = new SNSClient({
  region: config.awsRegion,
  credentials: {
    accessKeyId: config.awsAccessKeyId,
    secretAccessKey: config.awsSecretAccessKey,
  },
});

export async function sendSms(mobile, message) {
  try {
    const phoneNumber = `+91${mobile}`;
    const params = {
      PhoneNumber: phoneNumber,
      Message: message,
      MessageAttributes: {
        "AWS.SNS.SMS.SMSType": {
          DataType: "String",
          StringValue: "Transactional",
        },
      },
    };
console.log(config.awsSnsSenderId,"config.awsSnsSenderId");
    if (config.awsSnsSenderId) {
      params.MessageAttributes["AWS.SNS.SMS.SenderID"] = {
        DataType: "String",
        StringValue: config.awsSnsSenderId,
      };
    }

    const response = await client.send(new PublishCommand(params));
    return response; // contains MessageId, useful for debugging
  } catch (err) {
    console.error("SNS sendSms error:", err);
    throw err;
  }
}