const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

const handleEvent = async (type, data) => {
    if (type === 'CommentCreated') {
        const status = data.content.includes('spy') ? 'rejected' : 'approved';

        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentModerated',
            data: {
                ...data,
                status
            }
        })
    }
};

app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    handleEvent(type, data);
    res.send()
});

app.listen(4003, async () => {
    console.log('Server is running on port 4003');
    try {
        const res = await axios.get('http://event-bus-srv:4005/events');
        res.data.forEach(event => {
            console.log('Received event', event.type, event.data);
            handleEvent(event.type, event.data);
        });
    } catch (error) {
        console.log(error.message);
    }
});