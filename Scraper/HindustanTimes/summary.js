const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.hindustantimes.com//lifestyle/festivals/happy-dhanteras-2024-wishes-top-30-greetings-images-messages-whatsapp-and-facebook-status-to-share-with-loved-ones-101730096086530.html';

async function htimessummaryData(url) {
    const summaryData = []; // Initialize summaryData inside the function

    try {
        const res = await axios.get(url);
        const $ = cheerio.load(res.data);

        $('.fullStory').each((index, element) => {
            const title = $(element).find('.hdg1').text();
            const description = $(element).find('.sortDec').text().trim();
            const image = $(element).find('picture img').attr('src');
            const summaryText = $(element).find('.storyParagraphFigure p').text().trim();
            const authorName = $(element).find('.authorNameClick').text().trim();
            const postTime = $(element).find('.dateTime').text().trim();

            if (summaryText) {
                summaryData.push({ title, description, image, summaryText, authorName, postTime });
            }
        });

        return summaryData; // Return summaryData after processing all elements
    } catch (error) {
        console.error(error);
        return []; // Return an empty array in case of error
    }
}

module.exports = htimessummaryData;