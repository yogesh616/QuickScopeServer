const axios = require('axios');
const cheerio = require('cheerio');

async function scrapAi(url) {
    const newsItems = []; // Initialize newsItems array

    const options = {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9',
        },
    };

    try {
        const res = await axios.get(url, options);
        const $ = cheerio.load(res.data);

        $('.NwsLstPg-a-li').each((index, element) => {
            const title = $(element).find('.NwsLstPg_ttl-lnk').text().trim();
            const postedBy = $(element).find('.NwsLstPg_pst_txt').text().trim();
            const link = $(element).find('.NwsLstPg_ttl-lnk').attr('href');
            const image = $(element).find('.img-gr').find('img').attr('src');
            const content = $(element).find('.NwsLstPg_txt').text().trim();

            if (title && postedBy && link && image && content) {
                newsItems.push({ title, postedBy, link, image, content });
            }
        });

        return newsItems; // Return the newsItems array
    } catch (error) {
        console.error('Error scraping data:', error.message); // Log the error
        return []; // Return an empty array if there's an error
    }
}

module.exports = scrapAi;
