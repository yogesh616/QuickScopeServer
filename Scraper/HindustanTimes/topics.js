const axios = require('axios');
const cheerio = require('cheerio');

async function scrapTopics(url) {
    const Items = []; // Reset videoItems each time scrapData is called
    const urlPrefix = 'https://www.hindustantimes.com/'
    const options = {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
        }
    };

    try {
        const res = await axios.get(url, options);
        const $ = cheerio.load(res.data);
        

        // Iterate over each video item
        $('.listingPage .cartHolder').each((index, element) => {
            const title = $(element).find('.hdg3').text().trim();
            const image = $(element).find('img').attr('src'); 
            const postLink = $(element).find('a').attr('href');
            const publishTime = $(element).find('.dateTime').text().trim();
            const link = urlPrefix + postLink;

            if (title && image ) {
                Items.push({
                    title,
                    image,
                    link,
                    publishTime
                    
                });
            }
        });

      

    } catch (error) {
       
        return Items.push(error); // Return empty array if there's an error
    }

    return Items; // Return the collected items
}

module.exports = scrapTopics;
