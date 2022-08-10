import React from "react";
import { Container, Card, Row, Text, NextUIProvider, Col, Spacer } from "@nextui-org/react";
import PostCreate from "./components/Posts/PostCreate";
import PostList from "./components/Posts/PostList";
import { title } from "./const"
/* import PostCreate from "./PostCreate";
import PostList from "./PostList"; */

const App = () => {

  return (
    <NextUIProvider css={{ background: '#F5F5F5' }}>
      <title>{title}</title>
      <Container sm >
        <Row justify="left" align="center" >
          <Text weight="bold" h1 color='gradient' transform='capitalize'
            css={{
              textGradient: "45deg, $purple600 -20%, $pink600 100%",
            }}
          >🕵🏿 Anonymity blog </Text>
        </Row>
        <Card color="gradient" css={{ px: '$5', mt: '$5' }}>
          <Row justify="left" align="center" >
            <Text weight="bold" h1 color="white">Create Post</Text>
          </Row>
          <Row justify="left" align="center">
            <Col>
              <PostCreate />
            </Col>
          </Row>
        </Card>

        <Row justify="left" align="center" css={{ mt: '$5' }}>
          <Col>
            <PostList />
          </Col>
        </Row>
        <Spacer y={3} />
      </Container>



    </NextUIProvider>
  );
};
export default App;
