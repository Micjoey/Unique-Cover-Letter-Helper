
                </Segment >
            </Container >
        );
    } else {
    return (
        <Container>
            <Segment inverted>

                <div className="create-job-form">
                    <h1 className="form-title">Create Cover Letter</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className="list-form-field">
                            <p className="non-required-field">Template Choices: </p>
                            <select name="template_choices" ref={register} className="list-form-field-with-margin">
                                {Object.keys(template_choices).map((key, idx) => (
                                    <option value={key} key={idx} name={template_choices[key]}> {template_choices[key]} </option>
                                ))}
                            </select>
                        </label>
                        <label className="list-form-field">
                            <p className="non-required-field">Job Stage: </p>
                            <select style={{ color: 'black' }} name="job_stage" ref={register} className="list-form-field-with-margin">
                                {Object.keys(job_stages).map((key, idx) => (
                                    <option key={idx} name={job_stages[key]}> {job_stages[key]} </option>
                                ))}
                            </select>
                        </label>
                        <div className="list-form-field-with-margin">
                            <p className="required-field">*Job Posting Website: </p>
                            <textarea
                                style={{ color: 'black' }}
                                placeholder={"Job Posting Website*"}
                                name={"job_posting_website"}
                                ref={register({ required: true })}
                                className="list-form-field-with-margin"
                            />
                            {errors.job_posting_website && "Your input is required"}
                        </div>
                        <div className="list-form-field-with-margin">
                            <p className="required-field">*Position Title: </p>
                            <input
                                style={{ color: 'black' }}
                                placeholder={"Position Title*"}
                                name={"position_title"}
                                ref={register({ required: true })}
                                className="list-form-field-with-margin"
                            />
                            {errors.position_title && "Your input is required"}
                        </div>
                        <div className="list-form-field-with-margin">
                            {/* <p className="non-required-field">Choice of User: </p> */}
                            <input
                                type="hidden"
                                style={{ color: 'black' }}
                                placeholder={userId}
                                name={"belongs_to_user"}
                                defaultValue={userId}
                                ref={register({ required: true })}
                                className="list-form-field-with-margin"
                            />
                            {/* {errors.choice_of_user && "Your input is required"} */}
                        </div>
                        <div className="list-form-field-with-margin">
                            <p className="required-field">*Company: </p>
                            <input
                                style={{ color: 'black' }}
                                placeholder={"Company*"}
                                name={"company"}
                                ref={register({ required: true })}
                                className="list-form-field-with-margin"
                            />
                            {errors.company && "Your input is required"}
                        </div>
                        <div className="list-form-field-with-margin">
                            <p className="non-required-field">City: </p>
                            <input
                                style={{ color: 'black' }}
                                placeholder={"City"}
                                name={"city"}
                                ref={register({ required: false })}
                                className="list-form-field-with-margin"
                            />
                            {errors.city && "Your input is required"}
                        </div>
                        <div className="list-form-field-with-margin">
                            <p className="required-field">*Job Link: </p>
                            <textarea
                                style={{ color: 'black' }}
                                placeholder={"Link*"}
                                name={"link"}
                                ref={register({ required: true })}
                                style={{ display: 'flex', margin: '0em 1em' }}
                            />
                            {errors.link && "Your input is required"}
                        </div>
                        <div className="list-form-field-with-margin">
                            <p className="non-required-field">Recruiter: </p>
                            <input
                                style={{ color: 'black' }}
                                placeholder={"Recruiter"}
                                name={"recruiter"}
                                ref={register({ required: false })}
                                className="list-form-field-with-margin"
                            />
                            {errors.recruiter && "Your input is required"}
                        </div>
                        <div className="list-form-field-with-margin">
                            <p className="non-required-field">Description: </p>
                            <textarea
                                style={{ color: 'black' }}
                                placeholder={"Description"}
                                name={"description"}
                                ref={register({ required: false })}
                                className="list-form-field-with-margin"
                            />
                            {errors.description && "Your input is required"}
                        </div>
                        <div className="list-form-field-with-margin">
                            <p className="non-required-field">Pre Bullet Point - Paragraph one: </p>
                            <textarea
                                style={{ color: 'black' }}
                                placeholder={"Pre Bullet Point - Paragraph one"}
                                name={"pre_bullet_point_paragraph_one"}
                                ref={register({ required: false })}
                                className="list-form-field-with-margin"
                            />
                            {errors.pre_bullet_point_paragraph_one && "Your input is required"}
                        </div>
                        <div className="list-form-field-with-margin">
                            <p className="non-required-field">Pre Bullet Point - Paragraph two: </p>
                            <textarea
                                style={{ color: 'black' }}
                                placeholder={"Pre Bullet Point - Paragraph two"}
                                name={"pre_bullet_point_paragraph_two"}
                                ref={register({ required: false })}
                                className="list-form-field-with-margin"
                            />
                            {errors.pre_bullet_point_paragraph_two && "Your input is required"}
                        </div>
                        <div className="list-form-field-with-margin">
                            <p className="non-required-field">Top Skill: </p>
                            <textarea
                                style={{ color: 'black' }}
                                placeholder={"Top Skill"}
                                name={"top_skills"}
                                ref={register({ required: false })}
                                className="list-form-field-with-margin"
                            />
                            {errors.top_skills && "Your input is required"}
                        </div>
                        <div className="list-form-field-with-margin">
                            <p className="non-required-field">Bullet Point One: </p>
                            <textarea
                                style={{ color: 'black' }}
                                placeholder={"Bullet Point One"}
                                name={"bullet_point_one"}
                                ref={register({ required: false })}
                                className="list-form-field-with-margin"
                            />
                            {errors.bullet_point_one && "Your input is required"}
                        </div>
                        <div className="list-form-field-with-margin">
                            <p className="non-required-field">Bullet Point Two: </p>
                            <textarea
                                style={{ color: 'black' }}
                                placeholder={"Bullet Point Two"}
                                name={"bullet_point_two"}
                                ref={register({ required: false })}
                                className="list-form-field-with-margin"
                            />
                            {errors.bullet_point_two && "Your input is required"}
                        </div>
                        <div className="list-form-field-with-margin">
                            <p className="non-required-field">Bullet Point Three: </p>
                            <textarea
                                style={{ color: 'black' }}
                                placeholder={"Bullet Point Three"}
                                name={"bullet_point_three"}
                                ref={register({ required: false })}
                                className="list-form-field-with-margin"
                            />
                            {errors.bullet_point_three && "Your input is required"}
                        </div>
                        <div className="list-form-field-with-margin">
                            <p className="non-required-field">Bullet Point Four: </p>
                            <textarea
                                style={{ color: 'black' }}
                                placeholder={"Bullet Point Four"}
                                name={"bullet_point_four"}
                                ref={register({ required: false })}
                                className="list-form-field-with-margin"
                            />
                            {errors.bullet_point_four && "Your input is required"}
                        </div>
                        <div className="list-form-field-with-margin">
                            <p className="non-required-field">Bullet Point Five: </p>
                            <textarea
                                style={{ color: 'black' }}
                                placeholder={"Bullet Point Five"}
                                name={"bullet_point_five"}
                                ref={register({ required: false })}
                                className="list-form-field-with-margin"
                            />
                            {errors.bullet_point_five && "Your input is required"}
                        </div>
                        <div className="list-form-field-with-margin">
                            <p className="non-required-field">Bullet Point Six: </p>
                            <textarea
                                style={{ color: 'black' }}
                                placeholder={"Bullet Point Six"}
                                name={"bullet_point_six"}
                                ref={register({ required: false })}
                                className="list-form-field-with-margin"
                            />
                            {errors.bullet_point_six && "Your input is required"}
                        </div>
                        <div className="list-form-field-with-margin">
                            <p className="non-required-field">Bullet Point Seven: </p>
                            <textarea
                                style={{ color: 'black' }}
                                placeholder={"Bullet Point Seven"}
                                name={"bullet_point_seven"}
                                ref={register({ required: false })}
                                className="list-form-field-with-margin"
                            />
                            {errors.bullet_point_seven && "Your input is required"}
                        </div>
                        <div className="list-form-field-with-margin">
                            <p className="non-required-field">Bullet Point Eight: </p>
                            <textarea
                                style={{ color: 'black' }}
                                placeholder={"Bullet Point Eight"}
                                name={"bullet_point_eight"}
                                ref={register({ required: false })}
                                className="list-form-field-with-margin"
                            />
                            {errors.bullet_point_eight && "Your input is required"}
                        </div>
                        <div className="list-form-field-with-margin">
                            <p className="non-required-field">Post Bullet Point - Paragraph one: </p>
                            <textarea
                                style={{ color: 'black' }}
                                placeholder={"Post Bullet Point - Paragraph one"}
                                name={"post_bullet_point_paragraph_one"}
                                ref={register({ required: false })}
                                className="list-form-field-with-margin"
                            />
                            {errors.post_bullet_point_paragraph_one && "Your input is required"}
                        </div>
                        <div className="list-form-field-with-margin">
                            <p className="non-required-field">Post Bullet Point - Paragraph two: </p>
                            <textarea
                                style={{ color: 'black' }}
                                placeholder={"Post Bullet Point - Paragraph two"}
                                name={"post_bullet_point_paragraph_two"}
                                ref={register({ required: false })}
                                className="list-form-field-with-margin"
                            />
                            {errors.post_bullet_point_paragraph_two && "Your input is required"}
                        </div>
                        <input style={{ color: 'Black' }} type="submit" value={buttonTxt} className="form-button" />
                    </form>
                </div>
            </Segment>
        </Container>
    )
}