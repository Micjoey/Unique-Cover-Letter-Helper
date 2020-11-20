import React from 'react'
import { Route } from 'react-router-dom'
import JobDetailView from './containers/JobDetailView'
import JobListView from './containers/JobListView'

const BaseRouter = () => (
    <div>
        <Route exact path='/' component={JobListView}/>
        <Route exact path='/:jobID' component={JobDetailView}/>
    </div>
)

export default BaseRouter