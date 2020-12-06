import React, { useCallback, } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "../../store/actions/Auth"
import { useHistory } from 'react-router-dom';
import { JobForm } from '../../components/cover_letter/CoverLetterForm'
import NotLoggedInPage from '../../components/NotLoggedInPage';
import { Segment } from 'semantic-ui-react';


const CoverLetterView = () => {
    const paramsJobId = null
    let history = useHistory()
    const props = useSelector(state => (
        {
            ...state, 
            isAuthenticated: state.token !== null,
            loading: state.loading,
            error: state.error
        }))
    return (
        <Segment inverted>
            <JobForm requestType="post" jobID={paramsJobId} buttonTxt="Create Cover Letter"/>
        </Segment>
    )
}

export default CoverLetterView