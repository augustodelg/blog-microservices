import React, { Fragment, useState } from "react";
import { Button, Input, Textarea, Row } from '@nextui-org/react';
import axios from "axios";

const PostCreate = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    function onChangeHandlerTitle(event) {
        setTitle(event.target.value);

    };
    function onChangeHandlerContent(event) {
        setContent(event.target.value);

    };

    async function onSubmitHandler(event) {
        event.preventDefault();
        await axios.post('http://posts.com/posts/create', {
            title, content
        });
        setTitle('');
        setContent('');
        window.location.reload(false)
    }

    return <Fragment>
        <form onSubmit={onSubmitHandler}>
            <Row >
                <Input clearable value={title} onChange={onChangeHandlerTitle} size="lg" labelPlaceholder="Title" css={{ mt: '$5' }} />
            </Row>
            <Row >
                <Textarea value={content} onChange={onChangeHandlerContent} labelPlaceholder="Content" size="lg" fullWidth css={{ mt: '$15', mb: '$5' }} />
            </Row>
            <Row>
                <Button type='submit' disabled={!title || !content} shadow color="secondary" auto css={{ mt: '$5', mb: '$5' }}>Submit </Button>
            </Row>
        </form>
    </Fragment>
}

export default PostCreate;