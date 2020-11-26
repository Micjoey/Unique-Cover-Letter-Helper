const StandardCoverLetter = (props) => {
    const job = props.job 
    const user = props.user
    return (
        <div>
            <h1>Stadard Cover Letter</h1>
            {job.position_title}
        </div>
    )
}

export default StandardCoverLetter