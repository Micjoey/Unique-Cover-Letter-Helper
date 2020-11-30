import React from 'react'
import { useHistory } from 'react-router-dom'
import {logout} from '../../store/actions/Auth'
import {Grid, Container, Segment, Header, Menu} from 'semantic-ui-react'
import { useDispatch } from 'react-redux'


const Shell = props => {
    const dispatch = useDispatch()
    const history = useHistory()
    return (    
        <Segment vertical>
            <Container>
                <Grid container stackable verticalAlign='top' divided columns={2}>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Header as="h3">Account</Header>
                            <Menu vertical fluid>
                                <Menu.Item 
                                    onClick={() => history.push("/admin/change-email/")} 
                                    active={history.location.pathname === "/admin/change-email/"}
                                    name="change-email">
                                    Change Email
                                </Menu.Item>
                                <Menu.Item onClick={() => history.push("/admin/change-password/")}
                                    active={history.location.pathname === "/admin/change-password/"}
                                    name="change-password">
                                    Change Password
                                </Menu.Item>
                                <Menu.Item onClick={() => history.push("/admin/change-account-info/")}
                                    active={history.location.pathname === "/admin/change-account-info/"}
                                    name="change-account-info">
                                    Change Account Info
                                </Menu.Item>
                                <Menu.Item onClick={() => dispatch(logout())}
                                    name="logout">
                                    Logout
                                </Menu.Item>
                            </Menu>
                        </Grid.Column>
                        <Grid.Column width={12}>
                            {props.children}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>
    )
}

export default Shell

