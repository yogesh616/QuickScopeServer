const express = require('express');
const router = express.Router();
const scrapData = require('../Scraper/latest.js');
const getCityDetails = require('../Scraper/cities');
const getSearchData = require('../Scraper/search');
const getLatestVideos = require('../Scraper/latestVideos');
const aajtakStates = require('../Scraper/aajtak/state');
const stateData = require('../Scraper/aajtak/stateWiseData');
const summaryData = require('../Scraper/summary.js');
const scrapTopics =  require('../Scraper/HindustanTimes/topics.js');
const htimessummaryData = require('../Scraper/HindustanTimes/summary.js');
const scrapAi = require('../Scraper/ai.js');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 }); // Cache duration (in seconds), e.g., 10 minutes


const newsFeed = require('../Scraper/bing/feed.js')

const cacheMiddleware = (req, res, next) => {
    const key = req.originalUrl; // Use the request URL as the cache key
    const cachedData = cache.get(key); // Check if data exists in cache

    if (cachedData) {
        // If cached data exists, send it as the response
        return res.json(cachedData);
    }

    // Override res.json to store data in cache after sending the response
    res.sendResponse = res.json;
    res.json = (data) => {
        cache.set(key, data); // Store data in cache
        res.sendResponse(data); // Send the response
    };

    next(); // Proceed to the next middleware/route handler
};



// Routes for scraping NDTV news articles based on different topics



const latest = 'https://www.ndtv.com/latest'
const india = 'https://www.ndtv.com/india'
//const ai = 'https://www.ndtv.com/india-ai/'
const ai  = 'https://www.ndtv.com/ai/article-load-more/page'
const health = 'https://www.ndtv.com/health'
const ytnews = 'https://www.hindustantimes.com/trending'
//const summaryURL = 'https://www.ndtv.com/entertainment/ira-khan-drops-unseen-pictures-with-junaid-azad-khan-from-her-wedding-6878331'

router.get('/latest/:page', cacheMiddleware , async (req, res) => {
    const page = req.params.page || 1;
    const data = await scrapData(`${latest}/page-${page}`); // Capture returned data from scrapData
    res.json(data); // Send captured data in response
});
router.get('/india/:page', cacheMiddleware,  async (req, res) => {
    const page = req.params.page || 1; // Get page number from request parameters, default to 1
    const data = await scrapData(`${india}/page-${page}`); // Append page number to the URL
    res.json(data); // Send captured data in response
});

router.get('/ai/:page', cacheMiddleware, async (req, res) => {
    const page = req.params.page || 1;
    const data = await scrapAi(`${ai}/${page}/category/india-ai`); // Capture returned data from scrapData
    res.json(data); // Send captured data in response
});
router.get('/health/:page', cacheMiddleware, async (req, res) => {
    const page = req.params.page || 1;
    const data = await scrapData(`${health}/page-${page}`); // Capture returned data from scrapData
    res.json(data); // Send captured data in response
});

router.get('/city', cacheMiddleware,  async (req, res) => {
    const data = await getCityDetails(); // Capture returned data from scrapData
    res.json(data); // Send captured data in response
});

router.get('/search/:search',  cacheMiddleware,  async (req, res) => {
    const search = req.params.search || 'jaipur'; // Get search query from request parameters
    const data = await getSearchData(encodeURIComponent(search)); // Capture returned data from scrapData
    res.json(data); // Send captured data in response
});


router.get('/videos', cacheMiddleware ,  async (req, res ) => {
    const data = await getLatestVideos(); // Capture returned data from scrapData
    res.json(data); // Send captured data in response
});

router.get('/aajtak/states', cacheMiddleware,  async (req, res ) => {
   // const data = await aajtakStates(); // Capture returned data from scrapData
   const indStates = [
    "india",
    "uttar-pradesh",
    "bihar",
    "delhi",
    "madhya-pradesh",
    "rajasthan",
    "punjab",
    "haryana",
    "west-bengal",
    "himachal-pradesh",
    "maharashtra",
    "jharkhand",
    "uttarakhand",
    "chhattisgarh",
    "gujarat",
    "jammu-kashmir",
    "telangana"
    ]
    res.json(indStates); // Send captured data in response
});


router.get('/aajtak/state/:state', cacheMiddleware,  async (req, res ) => {
    const state = req.params.state; // Get state name from request parameters
    const data = await stateData(state); // Capture returned data from scrapData
    res.json(data); // Send captured data in response
});

router.get('/summary', cacheMiddleware , async (req, res) => {
    const URL = req.query.url; // Get URL from query parameters
    if (!URL) return res.status(404).json({ message: 'No URL provided' });
    const data = await summaryData(URL); // Capture returned data from scrapData
    res.json(data); // Send captured data in response
 });

 router.get('/htimes/topics', cacheMiddleware, async (req, res) => {
   // Get URL from query parameters
   try {
    const topic = req.query.topic;
     // Get URL from query parameters
    if (!topic) return res.status(404).json({ message: 'No Topic provided' });
    const customURL = 'https://www.hindustantimes.com/' +topic
    const data = await scrapTopics(customURL); // Capture returned data from scrapData
    res.json(data); // Send captured data in response
   }
   catch(error) {
   
    res.status(500).json({ message: 'Internal Server Error' });
   }

 });

 router.get('/htimes/summary', cacheMiddleware , async (req, res) => {
    const URL = req.query.url; // Get URL from query parameters
    if (!URL) return res.status(404).json({ message: 'No URL provided' });
    const data = await htimessummaryData(URL); // Capture returned data from scrapData
    res.json(data); // Send captured data in response
 });


 
 router.get('/bing/news', cacheMiddleware, async (req, res) => {
     const { offset } = req.query; // Get search query from request parameters
     const data = await newsFeed(offset); // Use bingFeed function
     res.json(data); // Send captured data in response
 });
 
 



module.exports = router

