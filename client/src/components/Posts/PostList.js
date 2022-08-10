import React, { Fragment, useState, useEffect } from "react";
import { Text, Row, Input, Col } from "@nextui-org/react";
import axios from "axios";
import PostItem from "./PostItem";
import useFilter from "../../hooks/useFilter";


const PostList = () => {
    const [posts, setPosts] = useState({});
    const [filterPosts, search, setSearch] = useFilter(Object.values(posts), (post) => [post.title]);


    useEffect(() => {
        fetchPosts();
    }, [])

    function onChangeSearch(event) {
        setSearch(event.target.value)
    }

    async function fetchPosts() {
        const res = await axios.get('http://posts.com/posts');
        setPosts(res.data);
    }

    function renderPosts() {
        return (filterPosts || Object.values(posts)).map((post) => {
            return (
                <Row justify="center" css={{ mt: '$10' }} key={post.id}>
                    <PostItem {...post} />
                </Row>)
        })
    }

    return <Fragment>
        <Row justify="left" align="center" css={{ mb: '$5', mt: '$15' }}>
            <Col>
                <Input
                    shadow={false}
                    clearable
                    labelPlaceholder="Search by title"
                    status="secondary"
                    type="search"
                    fullWidth
                    contentRight={
                        <Text>🔎</Text>
                    }
                    value={search}
                    onChange={onChangeSearch}
                />
            </Col>
        </Row>
        <Row justify="left" align="center" >
            <Text h2>Posts List </Text>
        </Row>

        {renderPosts()}


    </Fragment>
}

export default PostList;