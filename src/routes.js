import React from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import JobListView from './containers/job_container/JobListView'
import JobDetailView from './containers/job_container/JobDetailView'
import CoverLetterView from './containers/forms/CoverLetterView'
import Login from './containers/forms/Login'
import Signup from './containers/forms/signUpForms.js/SignupInitial'
import ChangeEmail from './components/Account/ChangeEmail'
import HomePage from './components/homepage/homepage'
import AccountDashboard from './containers/Account/accountDashboard'
import ChangePassword from './components/Account/ChangePassword'
import ChangeAccountInfo from './components/Account/ChangeAccountInfo'
import AccountDetailsForm from './containers/forms/signUpForms.js/SignUpDetails'


const PrivateRoute = ({components: Component, ...rest}) => {
    const authenticated = localStorage.getItem("access_token") !== null
    return (
        authenticated === true ? 
        <Route {...rest} render={ props => <Component {...props}/>} />
        :
        <Redirect to="/login"/>
    )
    
}
const NeedUserCredentials = ({components: Component, ...rest}) => {
    const state = useHistory().location.state
    return (
        state !== undefined ? 
        <PrivateRoute {...rest} render={ props => <Component {...props}/>} />
        :
        <Redirect to="/user-admin/"/>
    )
}


const BaseRouter = (props) => (
    <div>
        <Switch>
            <PrivateRoute exact path='/job/form/' component={CoverLetterView}/>
            <PrivateRoute exact path='/job/:jobID/' component={JobDetailView}/>
            <PrivateRoute exact path='/all-jobs/' component={JobListView}/>
            <PrivateRoute exact path='/signup-user-details/' component={AccountDetailsForm}/>
            <NeedUserCredentials exact path='/user-admin/change-email/' component={ChangeEmail} {...props}/>
            <NeedUserCredentials exact path='/user-admin/change-password/' component={ChangePassword} {...props}/>
            <NeedUserCredentials exact path='/user-admin/change-account-info/' component={ChangeAccountInfo} {...props}/> */}
            <PrivateRoute exact path='/user-admin/' component={AccountDashboard} />
            <Route exact path='/signup/' component={Signup}/>
            <Route exact path='/login/' component={Login}/>
            <Route exact path='' component={HomePage}/>
            <Route path='/' component={HomePage}/>
        </Switch>
    </div>
)



export default BaseRouter