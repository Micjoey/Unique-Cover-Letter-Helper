import React from 'react'
import {Grid, Container, Segment, Header, Menu} from 'semantic-ui-react'

const Shell = props => (
    <Segment vertical>
        <Container>
            <Grid container stackable verticalAlign='middle' divided columns={2}>
                <Grid.row>
                    <Grid.Column width={4}>
                        <Header as="h3">Account</Header>
                        <Menu vertical fluid>
                            <Menu.item name="change-email">Change Email</Menu.item>
                            <Menu.item name="change-email">Change Password</Menu.item>
                            <Menu.item name="change-email">Change Name</Menu.item>
                            <Menu.item name="change-email">Logout</Menu.item>
                        </Menu>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <h1>{props.children}</h1>
                    </Grid.Column>
                </Grid.row>
            </Grid>
        </Container>
    </Segment>
)

export default Shell