import { ToastHeader } from "react-bootstrap"



const NonTechnicalCoverLetter = (props) => {
    const job = props.job
    const user = props.user


    return (
        <div>
            <ToastHeader>
                <h1>Non Tech Cover Letter</h1>

            </ToastHeader>
            {job.position_title}

        </div>
    )
}

export default NonTechnicalCoverLetter