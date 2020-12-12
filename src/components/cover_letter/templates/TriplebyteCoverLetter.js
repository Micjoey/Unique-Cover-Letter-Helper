const TriplebyteCoverLetter = (props) => {
    const job = props.job
    const user = props.user
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    if (user && job) {
        return (
            <div className="full-cover-letter">
                <header>
                    <h1>Triplebyte Cover Letter</h1>
                    {/* <h3> Resume Link for tracking - <br /> <a href="http://macallan.space/?utm_source=Resume%20Link&utm_medium=link&utm_campaign=Resume%20Link"> https://bit.ly/2HXrCWl </a> </h3> */}
                </header>
                <div>
                    <div className="cover-letter-body">
                        <p>{today}</p>
                        <div>

                            <div>
                                {job.recruiter ? <p> Dear {job.recruiter}:</p>
                                    :
                                    <p> Dear Hiring Manager:</p>}
                            </div>
                            <p>
                                As advertised on the {job.job_posting_website ? ` ${job.job_posting_website} ` : ` ${job.company} `} website, your need for a
                                {` ${job.position_title} `} is an excellent match to my background
                                and career goals. With my strong education and experience, I am
                                confident I can make an immediate contribution given the opportunity.
                            </p>
                            {job.pre_bullet_point_paragraph_one ? <p>{job.pre_bullet_point_paragraph_one}</p> : null}
                            {job.pre_bullet_point_paragraph_two ? <p>{job.pre_bullet_point_paragraph_two}</p> : null}
                            {job.top_skills ? <p>Highlights of my qualifications most relevant to your needs include:</p> : null}
                            {job.top_skills ? <p> * {job.top_skills}</p> : null}
                            {job.bullet_point_one ? <p> * {job.bullet_point_one}</p> : null}
                            {job.bullet_point_two ? <p> * {job.bullet_point_two}</p> : null}
                            {job.bullet_point_three ? <p> * {job.bullet_point_three}</p> : null}
                            {job.bullet_point_four ? <p> * {job.bullet_point_four}</p> : null}
                            {job.bullet_point_five ? <p> * {job.bullet_point_five}</p> : null}
                            {job.bullet_point_six ? <p> * {job.bullet_point_six}</p> : null}
                            {job.bullet_point_seven ? <p> * {job.bullet_point_seven}</p> : null}
                            {job.bullet_point_eight ? <p> * {job.bullet_point_eight}</p> : null}
                            <p>
                                These proven abilities can contribute to the continued success of
                                {job.company ? ` tour comapny - ${job.company}.` : ` your company.`}
                            </p>
                            <br />
                            {job.post_bullet_point_paragraph_one ? <p>{job.post_bullet_point_paragraph_one}</p> : null}
                            {job.post_bullet_point_paragraph_two ? <p>{job.post_bullet_point_paragraph_two}</p> : null}
                            <br />
                            <p>
                                Sincerely,
                                <br />
                                {user.preferred_name ? `${user.preferred_name} ${user.last_name}`
                                    :
                                    `${user.first_name} ${user.last_name}`
                                }
                            </p>
                            <br/>
                            <br/>
                            {user.email ? <p className="com">{user.email}</p>
                                :
                                null}
                            {user.linkedin ? <p><a href={user.linkedin}>{user.linkedin}</a></p>
                                :
                                null}
                            {user.github ? <p><a href={user.github}>{user.github}</a></p>
                                :
                                null}
                            {user.portfolio_website ? <p><a href={user.portfolio_website}>{user.portfolio_website}</a></p>
                                :
                                null}
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

export default TriplebyteCoverLetter