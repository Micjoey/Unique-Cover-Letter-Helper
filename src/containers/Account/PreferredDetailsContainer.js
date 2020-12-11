import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Segment } from 'semantic-ui-react'
import jwtDecode from 'jwt-decode'
import SetDefaultFormValue from '../../components/Account/SetDefaultFormValues'




const PreferredDetailsContainer = () => {
    const [defaultInfo, setdefaultInfo] = useState({})
    const [user, setUser] = useState({})
    const accessToken = localStorage.getItem('access_token')
    const userId = jwtDecode(accessToken).user_id

    useEffect(() => {
        axios.defaults.headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
        axios.get(`/api/defaultInfo/`)
            .then(resp => {
                const formValues = resp.data.results[0]
                if (formValues["id"]) {
                    setdefaultInfo(formValues)
                } 
            })
            .catch(err => {

            })
        axios.get(`/api/users/${userId}/`)
            .then(resp => {
                setUser(resp.data)
            })
            .catch(err => {
                // console.log(err)
            })
    }, [])
    if (user) {
        return(
            <Container>
                <Segment>
                    <SetDefaultFormValue 
                        defaultInfo={defaultInfo} 
                        accessToken={accessToken}
                        user={user}
                    />
                </Segment>
            </Container>
        )
    } else {
        <h1> loading </h1>
    }
}

export default PreferredDetailsContainer