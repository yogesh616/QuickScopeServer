const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.ndtv.com/video'
const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
    }
};

async function getLatestVideos() {
    const results = []; 

    try {
        const response = await axios.get(url, options);
        const $ = cheerio.load(response.data);
        $('.VDRes-HrSrl_ul  li').each((index, element) => {
            const title = $(element).find('.VdPg-Crd_tx a').text().trim();
            const link = $(element).find('.VdPg-Crd_tx a').attr('href');
            
            const image = $(element).find('.imgbrd').attr('src');
            const data = { title, image, link, };
            if ( data.title) {
                results.push(data);
            }
        })
        return results
    } catch (error) {
        console.error('Error fetching city details:', error);
    }
}

module.exports = getLatestVideos;
