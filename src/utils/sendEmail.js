const {SendEmailCommand} = require("@aws-sdk/client-ses");

const {sesClient} = require("./sesClient.js");

const createSendEmailCommand = (toAddress, fromAddress,subject,data) => {
  return new SendEmailCommand({
    Destination: {
      /* required */
      CcAddresses: [
        /* more items */
      ],
      ToAddresses: [
        toAddress,
        /* more To-email addresses */
      ],
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: "UTF-8",
          Data: `<h1>${data}</h1>`,
        },
        Text: {
          Charset: "UTF-8",
          Data: "This is a text email from SES",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [
      /* more items */
    ],
  });
};

const run = async (subject,data) => {
    const sendEmailCommand = createSendEmailCommand(
        "siftainejaz@gmail.com",
        "rubyahmed1970@gmail.com",
        subject,
        data
    );

    try {
        return await sesClient.send(sendEmailCommand);
    } catch (caught) {
        if (caught instanceof Error && caught.name === "MessageRejected") {
        /** @type { import('@aws-sdk/client-ses').MessageRejected} */
        const messageRejectedError = caught;
        return messageRejectedError;
        }
        throw caught;
    }
};

module.exports = {run};