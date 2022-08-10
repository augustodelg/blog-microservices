import { Card, Row, Text } from '@nextui-org/react'
import React from 'react'

const CommentItem = ({ content, id }) => {

    return <Card shadow={false} >
        <Row>
            <Text h4 weight='normal' >
                {content}
            </Text>
        </Row>
        <Row justify="left" align="center" css={{ mt: '$2' }}>
            <Text h6 weight='light' >
                ID: {id}
            </Text>
        </Row>
    </Card>
}

export default CommentItem