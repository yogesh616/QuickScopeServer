const axios = require('axios');
const cheerio = require('cheerio');

async function scrapHealth(url) {
    const newsItems = []; // Reset newsItems each time scrapData is called

    const options = {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
        }
    };

    try {
        const res = await axios.get(url, options);
        const $ = cheerio.load(res.data);

        const paginationLinks = [];

        // Select all <a> elements inside the pagination container
        $('.listng_pagntn.clear a').each((index, element) => {
            const pageNumber = $(element).text().trim(); // Get page number (text content)
            paginationLinks.push(pageNumber);
        });
        
        // Check how many pages are in the pagination container
        const totalPages = paginationLinks.filter(page => page !== '').map(page => Number(page));
        const lastPage = totalPages[totalPages.length - 1];

        // Scraping news items using classes
        $('ul.NwsLstPg_ul li.NwsLstPg-a-li').each((index, element) => {
            const title = $(element).find('a.NwsLstPg_ttl').text().trim();
            const postedBy = $(element).find('.NwsLstPg_pst_ul li:last-child').text().trim();
            const link = $(element).find('a.NwsLstPg_ttl').attr('href');
            const image = $(element).find('img.NwsLstPg_img-full').attr('src');
            const content = $(element).find('.NwsLstPg_txt-cnt').text().trim();

            newsItems.push({ title, postedBy, link, image, content, totalPages: lastPage });
        });

        return newsItems; // Return the newsItems array
    } catch (error) {
        console.error('Getting error in scraping:', error.message);
        return []; // Return empty array if there's an error
    }
}

module.exports = scrapHealth;
