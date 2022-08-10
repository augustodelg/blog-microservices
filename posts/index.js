const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const storePosts = {};

app.get('/posts', (req, res) => {
    res.send(storePosts);
});

app.post('/posts/create', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title, content } = req.body;
    storePosts[id] = { id, title, content };
    await axios.post('http://event-bus-srv:4005/events', {
        type: 'PostCreated',
        data: storePosts[id]
    }).catch((err) => {
        console.log(err);
    });
    res.status(201).send(storePosts[id]);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;
    console.log('Received event', type, data);
});


app.listen(4000, () => {
    console.log('Server is running on port 4000');
});