



const NonTechnicalCoverLetter = (props) => {
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
                    <h1>Non Tech Cover Letter</h1>
                    {/* <h3> Resume Link for tracking - <br /> <a href="http://macallan.space/?utm_source=Resume%20Link&utm_medium=link&utm_campaign=Resume%20Link"> https://bit.ly/2HXrCWl </a> </h3> */}
                </header>
                <div>
                    <div className="cover-letter-body">
                        <p>{today}</p>
                        <div>
                            <div>

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
                            <br></br>
                            <div>
                                {job.recruiter ? <p> Dear {job.recruiter }:</p> 
                                :
                                <p> Dear Hiring Manager:</p>}
                            </div>
                            <p>
                                Thank you for the opportunity to apply for the {` ${job.position_title} `} 
                                role at your company{job.company ? ` - ${ job.company }` : null}.
                                After reviewing your job description, it's clear that you're looking
                                for a candidate that is familiar with
                                the responsibilities associated with the  
                                {job.position_title ? ` ${job.position_title} ` : " " }
                                role and can perform them confidently. Given these requirements,
                                I am confident that I can do the job adeptly and fulfill the above
                                expectations successfully.
                            </p>
                            <p>
                                I am a diligent professional who has been consistently praised
                                as hard-working by my peers. Throughout my career, I have
                                developed proven communication, analytical, and teamwork skills,
                                which I hope to leverage into the
                                {job.position_title ? ` ${job.position_title} ` : null} role at
                                {job.company ? ` ${job.company}.` : `your company.`}
                            </p>
                            <br/>
                            <p>
                                After reviewing my resume, I hope you will agree that I am a
                                competent and competitive candidate for the
                                {job.position_title ? ` ${job.position_title } ` : " " }
                                role. I look forward to elaborating on how my specific skills
                                and abilities will benefit your organization.
                                I can be reached at {user.phone_number} or
                                via email at {user.email } to arrange a convenient time to chat.
                            </p>
                            <br/>
                            <p>
                                Thank you for your consideration and I look forward to hearing from you soon.
                            </p>
                            <p>
                                My résumé is attached and offers additional information about
                                my specific achievements.
                            </p>
                            <p>
                                Sincerely, 
                                <br/>
                                {user.preferred_name ? `${user.preferred_name} ${user.last_name}`
                                :
                                `${user.first_name} ${user.last_name}`
                                }
                            </p>
                        </div>

                    </div>
                </div>
    
            </div>
        )
    }
}

export default NonTechnicalCoverLetter