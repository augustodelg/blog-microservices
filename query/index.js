const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const storePostsWithComments = {};

app.get('/posts', (req, res) => {
    res.send(storePostsWithComments);
});

const checkComentStatus = (status, content) => {
    switch (status) {
        case 'pending': {
            content = 'This comment is pending moderation 🕵🏽‍♀️';
            break;
        }
        case 'rejected': {
            content = 'This comment has been rejected ❌';
            break;
        }
        case 'approved': {
            break;
        }
        default:
            break;
    }
    return content;
}

const handleEvent = (type, data) => {
    switch (type) {
        case 'PostCreated': {
            const { id, title, content } = data;
            storePostsWithComments[id] = { id, title, content, comments: [] };
            break;
        }

        case 'CommentCreated': {
            const { postId, id, content, status } = data;
            const post = storePostsWithComments[postId];

            post.comments.push({ id, content: checkComentStatus(status, content), status });
            break
        }

        case 'CommentUpdated': {
            const { id, content, postId, status } = data;
            const post = storePostsWithComments[postId];
            const comment = post.comments.find(comment => comment.id === id);
            comment.status = status;
            comment.content = checkComentStatus(status, content);
            break;
        }

        default:
            break;
    }
};
app.post('/events', (req, res) => {
    const { type, data } = req.body;
    handleEvent(type, data);
    console.log('Received event', type, data);
});

app.listen(4002, async () => {
    console.log('Server is running on port 4002');

    const res = await axios.get('http://event-bus-srv:4005/events');
    res.data.forEach(event => {
        console.log('Received event', event.type, event.data);
        handleEvent(event.type, event.data);
    });
});