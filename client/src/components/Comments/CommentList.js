
import React, { Fragment } from "react";
import { Row } from "@nextui-org/react";
import CommentItem from './CommentItem';

const CommentList = ({ comments }) => {
    function renderComments() {
        return comments.map((comment) => {
            return (
                <Row justify="center" css={{ mt: '$8' }} key={comment.id}>
                    <CommentItem {...comment} />
                </Row>)
        })
    }
    return <Fragment>
        {renderComments()}

    </Fragment>
}

export default CommentList