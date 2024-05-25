import NeoadjuvantPatient from "./NeoadjuvantPatient";
import TimeAgo from "./TimeAgo";
import ReactionNeoadjuvantButtons from "./ReactionNeoadjuvantButtons";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useGetNeoadjuvantsQuery } from "./neoadjuvantSlice";
import { getThai } from "../../utility/getThai";
import { getChemoregimen } from "../../utility/getChemoregimen";


const SingleNeoadjuvantPage = () => {
    const { neoadjuvantId } = useParams()

    const { neoadjuvant, isLoading } = useGetNeoadjuvantsQuery('getNeoadjuvants', {
        selectFromResult: ({ data, isLoading }) => ({
            neoadjuvant: data?.entities[neoadjuvantId],
            isLoading
        }),
    })

    if (isLoading) return <p>Loading...</p>

    if (!neoadjuvant) {
        return (
            <section>
                <h2>Neoadjuvant not found!</h2>
            </section>
        )
    }

    return (
        <article>
              {neoadjuvant.neo==="1"?<>
            <p>วันที่เริ่ม :{getThai(neoadjuvant.datestartneo)}</p>
            <p>วันที่สิ้นสุด :{getThai(neoadjuvant.dateendneo)}</p>
            <p className="excerpt">Neoadjuvant :{getChemoregimen(neoadjuvant.typeofneoadjuvant)}</p></>:""}
            {neoadjuvant.adjuvantchemo==="1"?<>
            <p>วันที่เริ่ม :{getThai(neoadjuvant.adjchemostartdate)}</p>
            <p>วันที่สิ้นสุด :{getThai(neoadjuvant.adjchemoenddate)}</p>
            <p className="excerpt">Adjuvant :{getChemoregimen(neoadjuvant.typeofadjuvantchemo)}</p></>:""}    
            <p className="postCredit">
                <Link style={{color:'red'}} to={`/neoadjuvant/edit/${neoadjuvant.id}`}>แก้ไข</Link>
                <NeoadjuvantPatient patientId={neoadjuvant.patientId} />
                <TimeAgo timestamp={neoadjuvant.date} />
            </p>
            <ReactionNeoadjuvantButtons neoadjuvant={neoadjuvant} />
        </article>
    )
}

export default SingleNeoadjuvantPage