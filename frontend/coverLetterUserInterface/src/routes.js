import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import JobListView from './containers/job_container/JobListView'
import JobDetailView from './containers/job_container/JobDetailView'
import CoverLetterView from './containers/forms/CoverLetterView'

import Login from './containers/forms/Login'
import Signup from './containers/forms/Signup'
import ChangeEmail from './containers/Account/ChangeEmail'
import HomePage from './components/homepage/homepage'
import { authCheckState } from './store/actions/Auth'

const PrivateRoute = ({components: Component, ...rest}) => {
    const authenticated = localStorage.getItem("access_token") !== null
    console.log(`is ${authenticated} true or false?`)
    return (
        authenticated === true ? 
        <Route {...rest} render={ props => <Component {...props}/>} />
        :
        <Redirect to="/login"/>
    )
    
}


const BaseRouter = (props) => (
    <div>
        <Switch>
            <PrivateRoute exact path='/job/form' component={CoverLetterView}/>
            <PrivateRoute exact path='/job/:jobID' component={JobDetailView}/>
            <PrivateRoute exact path='/all-jobs/' component={JobListView}/>
            <PrivateRoute exact path='/all-jobs/' component={JobListView}/>
            <PrivateRoute exact path='/admin/change-email/' component={ChangeEmail}/>
            <Route exact path='/signup' component={Signup}/>
            <Route exact path='/login' component={Login}/>
            <Route path='' component={HomePage}/>
        </Switch>
    </div>
)

export default BaseRouter