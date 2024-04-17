const axios = require("axios");
const { addOrUpdateCharacter } = require("./dynamo");

const seedData = async () => {
    /**
     * Populates the DB with all objects from the Harry Potter API (hp-api.onrender)
     *
     * It must be run only once to avoid repeat data in the DB
     */
    const url = "http://hp-api.onrender.com/api/characters";

    try {
        const { data: characters } = await axios.get(url);
        const characterPromises = characters.map((character, i) =>
            addOrUpdateCharacter({ ...character, id: i + "" })
        );
        await Promise.all(characterPromises);
    } catch (error) {
        console.error(error);
        console.log("AAAAHHHHH");
    }
};

seedData();
