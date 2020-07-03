const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    next();
})

app.get('/photos', async (req, res) => {
    const api_url = `https://picsum.photos/v2/list?page=${req.query.page}`;
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    res.json(json);
})

const PORT = 5000;

app.listen(process.env.PORT || 5000)