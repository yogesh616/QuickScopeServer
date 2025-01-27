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
       
        $('.SrchLstPg-a-li').each((index, element) => {
            const title = $(element).find('.SrchLstPg_ttl').text().trim();
            const link = $(element).find('.SrchLstPg_ttl').attr('href');
            const content = $(element).find('.SrchLstPg_txt').text().trim();
            const image = $(element).find('.SrchLstPg_img-full').attr('data-src');
            const data = { title, content, image, link, };
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
