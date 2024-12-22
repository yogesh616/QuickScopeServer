const axios = require('axios');
const cheerio = require('cheerio');
const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
    },
};

async function bingFeed(offset) {
    try {
        if (offset == '') offset = '0r6h74hc-1'
       // const url = `https://www.bing.com/news/feed/infinitescrollajax?InfiniteScroll=1&q=&fcvid=1824ADB65BD36CC63A73B93D5A216DCD&fcidx=${fcidx}&IG=AD72C2D8DC8040EB8163B1D301BE9517&IID=news.5259&SFX=${sfx}`;
       const url = 'https://m.inshorts.com/api/undefined/en/news?category=top_stories&max_limit=10&include_card_data=true&news_offset=' + offset
       const response = await axios.get(url, options);
       
        return response.data
     
    } catch (error) {
        console.error('Error fetching Bing news feed:', error.message);
        return [];
    }
}


module.exports = bingFeed;