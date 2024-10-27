const cheerio = require('cheerio');
const axios = require('axios');

const url = 'https://www.aajtak.in/';
const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
    }
};
const states = [];

async function aajtakStates() {
    try {
        const response = await axios.get(url, options);
        const $ = cheerio.load(response.data);

        // Adjust selector based on the site's structure
        $('.navNAVLI').eq(2).find('a').each((index, element) => {
            const stateLink = $(element).attr('href'); // Get href attribute

            if (stateLink) {
                states.push(stateLink);
            }
        });

        // Process the states array to remove the base URL and keep only state names
        const stateNames = states.map(state => state.replace('https://www.aajtak.in/', '').split('/').filter(Boolean).pop());

        // Print the final array of state names
        return stateNames;       // Return the cleaned array of state names
    }
    catch (error) {
        console.error('Error getting states:', error);
    }
}

module.exports = aajtakStates;
