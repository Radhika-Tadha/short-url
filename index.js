const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const staticRouter = require("./routes/staticRouter");
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const app = express();
const PORT = process.env.PORT || 8001;

app.use(express.json());          // Enable JSON parsing
app.use(express.urlencoded({ extended: false }));

app.use('/url', urlRoute);        // Mount /url routes
app.use('/', staticRouter);

app.set('view engine', 'ejs');

app.get('/:shortId', async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const entry = await require('./models/url')
            .findOneAndUpdate(
                {
                    shortId,
                },
                {
                    $push: {
                        visitHistory: { timestamp: Date.now() }
                    }
                },
                { new: true }
            );
        if (!entry) return res.status(404).send('Short URL not found');
        return res.redirect(entry.redirectURL);
    } catch (err) {
        console.error('Redirect error:', err);
        return res.status(500).send('Internal Server Error');
    }
});

async function start() {
    try {
        await mongoose.connect('mongodb+srv://rat:rat99@cluster0.bpmez1o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
        });
        console.log('Connected to MongoDB');

        app.listen(PORT, () =>
            console.log(`Server running: http://localhost:${PORT}`)
        );
    } catch (err) {
        console.error('DB connection error:', err);
    }
}

start();
