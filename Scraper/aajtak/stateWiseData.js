const cheerio = require('cheerio');
const axios = require('axios');

const url = 'https://www.aajtak.in';
const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
    }
};

async function stateData(query) {
    const results = [];  // Reset results at the start
    try {
        const response = await axios.get(`${url}/${query}`, options);
        const $ = cheerio.load(response.data);

        // Adjust selector based on the site's structure
        $('.section-listing-LHS .widget-listing').each((index, element) => {
            const title = $(element).find('.widget-listing-thumb a').attr('title');
            const image = $(element).find('.widget-listing-thumb img').attr('src');
            const description = $(element).find('.widget-listing-content-section p').text();

            if (title) {
                results.push({ title, image, description });
            }
        });

        return results; // Return the results array after iteration
    }
    catch (error) {
        console.error('Error getting state data:', error);
        return []; // Return an empty array if there's an error
    }
}

module.exports = stateData;
