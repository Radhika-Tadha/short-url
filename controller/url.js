const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
    try {
        const body = req.body;
        if (!body.url) return res.status(400).json({ error: 'URL is required' });

        const shortID = shortid();
        await URL.create({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],
            createdBy:req.user._id,
        });
        return res.render('home', {
            id: shortID,
        });

        // return res.json({ id: shortID });
    } catch (err) {
        console.error('Error creating short URL:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result, visitHistory, totalClicks: result.visitHistory.length,
        analytics: {
            shortId: result.shortId,
            redirectURL: result.redirectURL,
            createdAt: result.createdAt,
            visitHistory: result.visitHistory,
        },
    });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
};