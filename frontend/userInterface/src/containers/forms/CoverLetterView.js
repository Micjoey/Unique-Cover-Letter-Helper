import React, { useCallback, } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "../../store/actions/Auth"
import { useHistory } from 'react-router-dom';
import { JobForm } from '../../components/cover_letter/CoverLetterForm'


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
    


    const dispatch = useDispatch()

    return (
        <div>
            {
                props.isAuthenticated ? 
                <JobForm requestType="post" jobID={paramsJobId} buttonTxt="Create Cover Letter"/>
                :
                <h1>No user is signed in. Please <a href="/signup"> Sign Up</a> or <a href="/login"> Login</a>.</h1>
            }
        </div>
    )
}

export default CoverLetterView