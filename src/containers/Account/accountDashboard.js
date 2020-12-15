import React, { useEffect, useState } from 'react'
import { useHistory, } from 'react-router-dom'
import { Grid, Container, Segment, Header, Menu } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import rg4js from 'raygun4js';




const AccountDashboard = () => {
    const [user, setUser] = useState({})
    const dispatch = useDispatch()
    const history = useHistory()
    const accessToken = localStorage.getItem('access_token')
    const userId = jwtDecode(accessToken).user_id
    const [loaded, isLoaded] = useState(true)

    useEffect(() => {
        axios.defaults.headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
        axios.get(`/api/users/${userId}/`)
            .then(resp => {
                setUser(resp.data)
                rg4js('setUser', {
                    identifier: `${resp.data.username}`,
                    isAnonymous: false,
                    email: `${resp.data.email}`,
                    firstName: `${resp.data.first_name}`,
                    fullName: `${resp.data.first_name} ${resp.data.last_name}`
                })
            })
            .then(() => {
                isLoaded(true)
            })
            .catch(err => {
                // console.log(err)
            })
    }, [])
  
    if (loaded) {
        return (
            <div class="outer-semantic">
                <Segment placeholder className="outer-semantic" padded="very">
                    <Container text textAlign="center">
                        <Grid container divided textAlign="center" >
                            {/* <Grid.Row> */}
                                {/* <Grid.Column width={8}> */}
                                <Container content>
                                    <Segment>
                                        <Header as="h3">Account Info</Header>
                                    </Segment>
                                    <Menu vertical fluid>
                                        <Menu.Item
                                            onClick={() => history.push("/user-admin/change-email/", { user: user, previousLocation: "/admin/change-email/"})}
                                            active={history.location.pathname === "/user-admin/change-email/"}
                                            name="change-email">
                                            Change Email
                                        </Menu.Item>
                                        <Menu.Item onClick={() => history.push("/user-admin/change-password/", { user: user, previousLocation: "/admin/change-password/" })}
                                            active={history.location.pathname === "/user-admin/change-password/"}
                                            name="change-password">
                                            Change Password
                                        </Menu.Item>
                                        <Menu.Item onClick={() => history.push("/user-admin/change-account-info/", { user: user, previousLocation: "/admin/change-info/" })}
                                            active={history.location.pathname === "/user-admin/change-account-info/"}
                                            name="change-account-info">
                                            Change Account Info
                                        </Menu.Item>
                                    <Menu.Item onClick={() => history.push("/default-form-values/", { user: user, previousLocation: "/admin/default-form-values/" })}
                                            active={history.location.pathname === "/user-admin/change-account-info/"}
                                            name="change-account-info">
                                            Set Default Form
                                        </Menu.Item>
                                        { user.is_superuser ? <Menu.Item onClick={() => history.push("/admin/")}
                                            active={history.location.pathname === "/admin/"}
                                            name="change-account-info">
                                            Admin
                                        </Menu.Item> : null}
                                        {/* <Menu.Item onClick={() => dispatch(logout())}
                                            name="logout">
                                            Logout
                                        </Menu.Item> */}
                                    </Menu>
                                </Container>
                                {/* </Grid.Column> */}
                            {/* </Grid.Row> */}
                        </Grid>
                    </Container>
                </Segment>
            </div>
        )
    } else {
        return(
            <Segment vertical>
                <Container>
                    <Grid container stackable={true} verticalAlign='top' divided columns={2}>
                        <Grid.Column width={4}>
                            Loading
                        </Grid.Column>
                    </Grid>
                </Container>
            </Segment>
        )
    }
}

export default AccountDashboard