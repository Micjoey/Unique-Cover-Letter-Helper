import React, { useCallback, } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "../../store/actions/Auth"
import { useHistory } from 'react-router-dom';
import { JobForm } from '../../components/cover_letter/CoverLetterForm'
import NotLoggedInPage from '../../components/NotLoggedInPage';


const CoverLetterView = () => {
    const paramsJobId = null
    let history = useHistory()
    const props = useSelector(state => (
        {
            ...state,
            isAuthenticated: localStorage.getItem('access_token') !== null,
            loading: state.loading,
            error: state.error
        }))
    


    const dispatch = useDispatch()

    return (
        <div>
            {
                props.isAuthenticated ? 
                <JobForm requestType="post" jobID={paramsJobId} buttonTxt="Create Cover Letter"/>
                :
                <NotLoggedInPage/>
            }
        </div>
    )
}

export default CoverLetterView