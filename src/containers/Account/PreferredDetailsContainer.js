import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Segment } from 'semantic-ui-react'
import jwtDecode from 'jwt-decode'
import PreferredDetailsComponent from '../../components/Account/PreferredDetails'



const PreferredDetailsContainer = () => {
    const [preferredDetails, setPreferredDetails] = useState({})
    const accessToken = localStorage.getItem('access_token')
    const userId = jwtDecode(accessToken).user_id

    useEffect(() => {
        axios.defaults.headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
        axios.get(`/api/preferred/`)
            .then(resp => {
                setPreferredDetails(resp.data)
            })
            .catch(err => {
                // console.log(err)
            })
    }, [])

    return(
        <Container>
            <Segment>
                <PreferredDetailsComponent/>
            </Segment>
        </Container>
    )
}

export default PreferredDetailsContainer