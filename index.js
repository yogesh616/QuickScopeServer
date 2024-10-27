const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./Routes/routes');

// Enable CORS for all requests
 app.use(cors({
    origin: '*'
 }));

 app.use('/api', routes)

 const PORT = process.env.PORT || 3000;
 app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
 });