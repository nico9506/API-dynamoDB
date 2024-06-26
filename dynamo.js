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
const TABLE_NAME = "harry_potter_api";

const getCharacters = async () => {
    const params = {
        TableName: TABLE_NAME,
    };
    const characters = await dynamoClient.scan(params).promise();
    console.log(characters);
    return characters;
};

const getCharacterById = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id,
        },
    };

    return await dynamoClient.get(params).promise();
};

const addOrUpdateCharacter = async (character) => {
    const params = {
        TableName: TABLE_NAME,
        Item: character,
    };

    return await dynamoClient.put(params).promise();
};

const deleteCharacter = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id,
        },
    };

    return await dynamoClient.delete(params).promise();
};

module.exports = {
    dynamoClient,
    getCharacters,
    getCharacterById,
    addOrUpdateCharacter,
    deleteCharacter,
};

// getCharacters();

// const hp = {
//     id: "0",
//     name: "Harry Potter",
//     alternate_names: [
//         "The Boy Who Lived",
//         "The Chosen One",
//         "Undesirable No. 1",
//         "Potty",
//     ],
//     species: "human",
//     gender: "male",
//     house: "Gryffindor",
//     dateOfBirth: "31-07-1980",
//     yearOfBirth: 1980,
//     wizard: true,
//     ancestry: "half-blood",
//     eyeColour: "green",
//     hairColour: "black",
//     wand: { wood: "holly", core: "phoenix tail feather", length: 11 },
//     patronus: "stag",
//     hogwartsStudent: true,
//     hogwartsStaff: false,
//     actor: "Daniel Radcliffe",
//     alternate_actors: [],
//     alive: true,
//     image: "https://ik.imagekit.io/hpapi/harry.jpg",
// };

// addOrUpdateCharacter(hp);

// deleteCharacter("0");
