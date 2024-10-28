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

// Routes for scraping NDTV news articles based on different topics



const latest = 'https://www.ndtv.com/latest'
const india = 'https://www.ndtv.com/india'
const ai = 'https://www.ndtv.com/india-ai/'
const health = 'https://www.ndtv.com/health'
const ytnews = 'https://www.hindustantimes.com/trending'
//const summaryURL = 'https://www.ndtv.com/entertainment/ira-khan-drops-unseen-pictures-with-junaid-azad-khan-from-her-wedding-6878331'

router.get('/latest/:page', async (req, res) => {
    const page = req.params.page || 1;
    const data = await scrapData(`${latest}/page-${page}`); // Capture returned data from scrapData
    res.json(data); // Send captured data in response
});
router.get('/india/:page', async (req, res) => {
    const page = req.params.page || 1; // Get page number from request parameters, default to 1
    const data = await scrapData(`${india}/page-${page}`); // Append page number to the URL
    res.json(data); // Send captured data in response
});

router.get('/ai/:page', async (req, res) => {
    const page = req.params.page || 1;
    const data = await scrapData(`${ai}/page-${page}`); // Capture returned data from scrapData
    res.json(data); // Send captured data in response
});
router.get('/health/:page', async (req, res) => {
    const page = req.params.page || 1;
    const data = await scrapData(`${health}/page-${page}`); // Capture returned data from scrapData
    res.json(data); // Send captured data in response
});

router.get('/city', async (req, res) => {
    const data = await getCityDetails(); // Capture returned data from scrapData
    res.json(data); // Send captured data in response
});

router.get('/search/:search', async (req, res) => {
    const search = req.params.search || 'jaipur'; // Get search query from request parameters
    const data = await getSearchData(encodeURIComponent(search)); // Capture returned data from scrapData
    res.json(data); // Send captured data in response
});


router.get('/videos', async (req, res ) => {
    const data = await getLatestVideos(); // Capture returned data from scrapData
    res.json(data); // Send captured data in response
});

router.get('/aajtak/states', async (req, res ) => {
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


router.get('/aajtak/state/:state', async (req, res ) => {
    const state = req.params.state; // Get state name from request parameters
    const data = await stateData(state); // Capture returned data from scrapData
    res.json(data); // Send captured data in response
});

router.get('/summary', async (req, res) => {
    const URL = req.query.url; // Get URL from query parameters
    if (!URL) return res.status(404).json({ message: 'No URL provided' });
    const data = await summaryData(URL); // Capture returned data from scrapData
    res.json(data); // Send captured data in response
 });

 router.get('/htimes/topics', async (req, res) => {
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

 router.get('/htimes/summary', async (req, res) => {
    const URL = req.query.url; // Get URL from query parameters
    if (!URL) return res.status(404).json({ message: 'No URL provided' });
    const data = await htimessummaryData(URL); // Capture returned data from scrapData
    res.json(data); // Send captured data in response
 });
 



module.exports = router

