import React from 'react'
import { Route, Switch } from 'react-router-dom'

import JobListView from './containers/job_container/JobListView'
import JobDetailView from './containers/job_container/JobDetailView'
import CoverLetterView from './containers/forms/CoverLetterView'


const BaseRouter = () => (
    <div>
        <Switch>
            <Route exact path='/job/form' component={CoverLetterView}/>
            <Route exact path='/:jobID' component={JobDetailView}/>
            <Route path='/' component={JobListView}/>
        </Switch>
    </div>
)

export default BaseRouter