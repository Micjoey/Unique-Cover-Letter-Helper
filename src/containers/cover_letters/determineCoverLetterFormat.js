import CoverLetter from '../../components/cover_letter/templates/CoverLetter'
import NonTechnicalCoverLetter from '../../components/cover_letter/templates/NonTechnicalCoverLetter'
import StandardCoverLetter from '../../components/cover_letter/templates/StandardJobTemplate'
import TriplebyteCoverLetter from '../../components/cover_letter/templates/TriplebyteCoverLetter'


export const determineCoverLetter = (coverLetter, job, user) => {
    switch (coverLetter) {
        case "non-technical-cover-letter":
            return <NonTechnicalCoverLetter job={job} user={user} />
        // case 'cover-letter':
        //     return <CoverLetter job={job} user={user}/>
        case 'Triplebyte (message-version)':
            return <TriplebyteCoverLetter job={job} user={user}/>
        case 'Standard Job Template':
            return <StandardCoverLetter job={job} user={user}/>
        default:
            return <NonTechnicalCoverLetter job={job} user={user} />;
    }
}