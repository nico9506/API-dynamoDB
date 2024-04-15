const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    endpoint: "http://localhost:8000",
    sslEnabled: false,
    s3ForcePathStyle: true,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
// const TABLE_NAME = "harry_potter-api";
const TABLE_NAME = "Music";

const getCharacters = async () => {
    const params = {
        TableName: TABLE_NAME,
    };
    const characters = await dynamoClient.scan(params).promise();
    console.log(characters);
    return characters;
};

getCharacters();
