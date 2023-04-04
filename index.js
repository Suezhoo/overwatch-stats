const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');

// OW
const ow = require('overwatch-api');

// Express APP
const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send('Overwatch Stat Tracker written by Suezhoo thanks to Overwatch API');
});

app.get('/:platform/:region/:tag', (req, res) => {
    const params = { platform: req.params.platform, region: req.params.region, tag: req.params.tag };

    for (key in params) {
        if (params[key] == undefined) res.status(400).send({ err: `Parameter ${key} is missing.` });
    }

    ow.getProfile(params.platform, params.region, params.tag, (err, json) => {
        if (err) res.status(500).send(err);
        else res.status(200).send(json);
    });
});

server.listen(1337, '0.0.0.0');

server.on('listening', () => {
    console.log(`Listening at http://${server.address().address}:${server.address().port}`);
});
