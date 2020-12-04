import React, { useEffect, useState } from 'react'
import { useHistory, } from 'react-router-dom'
import { logout } from '../../store/actions/Auth'
import { Grid, Container, Segment, Header, Menu } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import jwtDecode from 'jwt-decode'
import axios from 'axios'



const AccountDashboard = () => {
    const [user, setUser] = useState({})
    const dispatch = useDispatch()
    const history = useHistory()
    const accessToken = localStorage.getItem('access_token')
    const userId = jwtDecode(accessToken).user_id
    const [loaded, isLoaded] = useState(false)
    const url = window.location.origin
    useEffect(() => {
        axios.defaults.headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
        axios.get(`http://localhost:3000/api/users/${userId}`)
        // axios.get(`${url}/api/users/${userId}`)
            .then(resp => {
                setUser(resp.data)
            })
            .then(() => {
                isLoaded(true)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    if (loaded) {
        return (
            <div class="outer-semantic">
                <Segment placeholder className="outer-semantic">
                    <Container text textAlign="center">
                        <Grid container divided textAlign="center" >
                            {/* <Grid.Row> */}
                                {/* <Grid.Column width={8}> */}
                                    <Header as="h3">Account</Header>
                                    <Menu vertical fluid>
                                        <Menu.Item
                                            onClick={() => history.push("/admin/change-email/", { user: user, previousLocation: "/admin/change-email/"})}
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
                    <Grid container stackable verticalAlign='top' divided columns={2}>
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