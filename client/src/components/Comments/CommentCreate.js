import { Button, Row, Textarea } from '@nextui-org/react'
import axios from 'axios';
import React, { Fragment, useState } from 'react'

const CommentCreate = ({ postId }) => {
    const [comment, setComment] = useState('')

    function onChangeHandlerComment(event) {
        setComment(event.target.value);

    }

    async function onSubmitHandler(event) {
        event.preventDefault();
        await axios.post(`http://posts.com/posts/${postId}/comments`, {
            content: comment
        });
        setComment('');
        /* let newComents= await axios.get(`http://localhost:4001/posts/${postId}/comments`)
        commentsUpdate(newComents.data) */
    }

    return <Fragment>
        <form onSubmit={onSubmitHandler}>
            <Row justify="left" align="center" css={{ mt: '$15', mb: '$10' }}>
                <Textarea value={comment} onChange={onChangeHandlerComment} labelPlaceholder="New Comment" size="lg" fullWidth={true} />
            </Row>
            <Row>
                <Button type='submit' disabled={!comment} shadow color="secondary" auto >Submit </Button>
            </Row>
        </form>
    </Fragment>
}

export default CommentCreate