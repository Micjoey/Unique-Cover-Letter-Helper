import React, { useEffect, useState } from 'react'
import { useHistory, } from 'react-router-dom'
import {logout} from '../../store/actions/Auth'
import {Grid, Container, Segment, Header, Menu} from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

import axiosInstance from '../../store/axiosApi'

const Shell = props => {
    const history = useHistory()
    const dispatch = useDispatch()
    const userId = jwtDecode(localStorage.getItem('access_token')).user_id
    const [user, setUser] = useState({})
    const [loaded, isLoaded] = useState(false)
    const url = window.location.origin
    useEffect(() => {
        axios.defaults.headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
        axios.get(`${url}/api/users/${userId}`)
        // axios.get(`http://localhost:3000/api/users/${userId}`)
        .then(resp => {
            setUser(resp.data)
            // history.push({user: resp.data})
        })
        .then(() => {
            isLoaded(true)
        })
        .catch(err => {
            console.log(err)
        })
    }, [localStorage.getItem('access_token')])

        return (    
            <Segment vertical>
                <Container>
                    <Grid container stackable verticalAlign='top' divided columns={2}>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Header as="h3">Account</Header>
                                <Menu vertical fluid>
                                    <Menu.Item 
                                        onClick={() => history.push("/admin/change-email/", {user: user})} 
                                        active={history.location.pathname === "/admin/change-email/"}
                                        name="change-email">
                                        Change Email
                                    </Menu.Item>
                                    <Menu.Item onClick={() => history.push("/admin/change-password/", { user: user })}
                                        active={history.location.pathname === "/admin/change-password/"}
                                        name="change-password">
                                        Change Password
                                    </Menu.Item>
                                    <Menu.Item onClick={() => history.push("/admin/change-account-info/", { user: user })}
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

