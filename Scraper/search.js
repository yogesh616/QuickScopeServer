const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.ndtv.com/search?searchtext='
const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
    }
};

async function getSearchData(query='jaipur') {
    const results = []; 

    try {
        const response = await axios.get(`${url}${query}`, options);
        const $ = cheerio.load(response.data);
        $('.src_lst-ul .src_lst-li').each((index, element) => {
            const title = $(element).find('.src_itm-ttl a').text().trim();
            const link = $(element).find('.src_itm-ttl a').attr('href');
            const description = $(element).find('.src_itm-txt').text().trim();
            const image = $(element).find('.img-gratio img').attr('src');
            const data = { title, description, image, link, };
            if ( data.title) {
                results.push(data);
            }
        })
        return results
    } catch (error) {
        console.error('Error fetching city details:', error);
    }
}

module.exports = getSearchData;
