import React from 'react'
import { Card, Text, Row, Col, Collapse } from "@nextui-org/react";
import CommentCreate from '../Comments/CommentCreate';
import CommentList from '../Comments/CommentList';

const PostItem = ({ title, content, id, comments }) => {

  return <Card css={{ background: '#eadcf8' }}>
    <Row justify="left" align="center" >
      <Text h3 weight="bold" color='withe' css={{ mr: '$4' }}>
        TITLE:
      </Text>
      <Text h4 weight='normal' >
        {title}
      </Text>
    </Row>
    <Row justify="left" align="center" >
      <Card css={{ mt: '$2' }}>
        <Text h4 weight='normal' >
          {content}
        </Text>

      </Card>
    </Row>
    <Collapse.Group  >
      <Collapse title="Comments" css={{ mt: '$5' }}>
        <Row>
          <Col>
            <CommentList comments={comments} />
          </Col>
        </Row>
        <Row justify="left" align="center" css={{ mt: '$10' }}>
          <Col>
            <CommentCreate postId={id} />
          </Col>
        </Row>
      </Collapse>
    </Collapse.Group>

    <Row justify="left" align="center" css={{ mt: '$2' }}>
      <Text h6 weight='light' >
        ID: {id}
      </Text>
    </Row>

  </Card>
}
export default PostItem;