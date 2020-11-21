import React from 'react'
import { Route, Switch } from 'react-router-dom'
import JobDetailView from './containers/JobDetailView'
import JobListView from './containers/JobListView'

const BaseRouter = () => (
    <div>
        <Switch>
            <Route exact path='/:jobID' component={JobDetailView}/>
            <Route path='/' component={JobListView}/>
        </Switch>
    </div>
)

export default BaseRouter