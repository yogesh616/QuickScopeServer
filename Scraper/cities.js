const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.ndtv.com/cities';
const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
    }
};

async function getCityDetails() {
    const citiesLIST = []; // Initialize inside the function for modularity

    try {
        const response = await axios.get(url, options);
        const $ = cheerio.load(response.data);

        // Select each city option and add to the citiesLIST array
        $('select option').each((index, element) => {
            const city = $(element).text().trim();
            const cityURL = $(element).attr('value');
            
            // Only push if cityURL has a value (to avoid 'Select Your Option Here')
            if (cityURL) {
                citiesLIST.push({ city, cityURL });
            }
        });

        return citiesLIST; // Return the array for external use
    } catch (error) {
        console.error('Error fetching city details:', error);
    }
}

module.exports = getCityDetails;
