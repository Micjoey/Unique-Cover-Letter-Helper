import React from 'react'

export const searchBar = (searchString, allJobs, setAllJobs) => {
    const oldJobs = allJobs
    if (searchString.length === 0) setAllJobs(oldJobs)
    console.log(allJobs)
    allJobs.filter(jobObject => {
    })
}
