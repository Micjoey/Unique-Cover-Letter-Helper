import React from "react";
import { Link } from "react-router-dom";
import {
    Container,
    Grid,
    Header,
    List,
    Segment,
} from 'semantic-ui-react'


const FooterPage = () => {
    return (
        <Segment inverted vertical style={{ padding: '5em 0em' }}>
            <Container>
                <Grid divided inverted stackable>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Header inverted as='h4' content='Creator' />
                            <List link inverted>
                                <List.Item href='http://macallan.space/' target="_blank">Personal Portfolio</List.Item>
                                <List.Item href='https://github.com/Micjoey' target="_blank">Github</List.Item>
                                <List.Item href='https://www.linkedin.com/in/macallan-savett/' target="_blank">LinkedIn</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Header inverted as='h4' content='About' />
                            <List link inverted>
                                {/* <List.Item as='a'>About</List.Item> */}
                                {/* <List.Item as='a'>FAQ</List.Item> */}
                                {/* <List.Item as='a'>How To Access</List.Item> */}
                                {/* <List.Item as='a'>Favorite X-Men</List.Item> */}
                            </List>
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <Header as='h4' inverted>
                                Comments and suggestions wanted!
                            </Header>
                            <p>
                                Any suggestions or comments please send to at this - <a href="mailto: admin@uniquecoverlettergenerator.com">link.</a>
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>
    );
}

export default FooterPage;