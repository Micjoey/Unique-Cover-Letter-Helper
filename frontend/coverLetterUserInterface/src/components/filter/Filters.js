import React, { useState } from 'react'


export default Filters = (props) => {
    const [search, setSearch] = useState('')

    const updateFilter = (field) => {
        return (event) => {
            const filters = {}
            filters[field] = event.target.value
            setSearch(setSearch)
        }
    }

    return (
        <section className="Filters" data-testid="filters">

        </section>
    )
}