const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const storeCommentByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(storeCommentByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const postId = req.params.id;
    const comments = storeCommentByPostId[postId] || [];
    const comment = { id: commentId, content, status: 'pending' };

    comments.push(comment);

    storeCommentByPostId[postId] = comments;
    await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentCreated',
        data: {
            postId,
            ...comment
        }
    });
    res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    console.log('Received event', type, data);

    if (type === 'CommentModerated') {
        const { postId, id, status } = data;
        const comments = storeCommentByPostId[postId];
        const comment = comments.find(comment => comment.id === id);
        comment.status = status;
        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentUpdated',
            data: {
                postId,
                ...comment
            }
        });
    }
    res.send({});

}
);


app.listen(4001, () => {
    console.log('Server is running on port 4001');
});