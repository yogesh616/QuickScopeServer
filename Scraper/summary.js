const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.ndtv.com/entertainment/ira-khan-drops-unseen-pictures-with-junaid-azad-khan-from-her-wedding-6878331';

async function summaryData(url) {
    const summaryData = []; // Initialize summaryData inside the function

    try {
        const res = await axios.get(url);
        const $ = cheerio.load(res.data);

        $('.sp-hd .sp-cn').each((index, element) => {
            const title = $(element).find('h1').text();
            const description = $(element).find('h2').text().trim();
            const image = $(element).find('img').attr('src');
            const summaryText = $(element).find('p').text().trim();

            if (summaryText) {
                summaryData.push({ title, description, image, summaryText });
            }
        });

        return summaryData; // Return summaryData after processing all elements
    } catch (error) {
        console.error(error);
        return []; // Return an empty array in case of error
    }
}

module.exports = summaryData;