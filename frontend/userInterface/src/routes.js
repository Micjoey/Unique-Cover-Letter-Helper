import React from 'react'
import { Route, Switch } from 'react-router-dom'

import JobListView from './containers/job_container/JobListView'
import JobDetailView from './containers/job_container/JobDetailView'
import CoverLetterView from './containers/forms/CoverLetterView'

import Login from './containers/forms/Login'
import Signup from './containers/forms/Signup'
import ChangeEmail from './containers/Account/ChangeEmail'


const BaseRouter = (props) => (
    <div>
        <Switch>
            <Route exact path='/job/form' component={CoverLetterView}/>
            <Route exact path='/jobs/:jobID' render={() => (<JobDetailView {...props}/>)}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/signup' component={Signup}/>
            <Route exact path='/' component={JobListView}/>
            <Route exact path='/admin/change-email/' component={ChangeEmail}/>
            <Route path='' component={JobListView}/>
        </Switch>
    </div>
)

export default BaseRouter