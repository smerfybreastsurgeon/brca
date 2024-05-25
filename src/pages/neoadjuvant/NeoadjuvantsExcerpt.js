import NeoadjuvantPatient from "./NeoadjuvantPatient";
import TimeAgo from "./TimeAgo";
import ReactionNeoadjuvantButtons from "./ReactionNeoadjuvantButtons";
import { Link } from 'react-router-dom';
import { useGetNeoadjuvantsQuery } from "./neoadjuvantSlice";
import { getThai } from "../../utility/getThai";
import { getChemoregimen } from "../../utility/getChemoregimen";


const NeoadjuvantsExcerpt = ({ neoadjuvantId }) => {

    const { neoadjuvant } = useGetNeoadjuvantsQuery('getNeoadjuvants', {
        selectFromResult: ({ data }) => ({
            neoadjuvant: data?.entities[neoadjuvantId]
        }),
    })

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
                <Link style={{color:'blue'}} to={`/neoadjuvant/view/${neoadjuvant.id}`}>ดูรายละเอียด</Link>
                <NeoadjuvantPatient patientId={neoadjuvant.patientId} />
                <TimeAgo timestamp={neoadjuvant.date} />
            </p>
            <ReactionNeoadjuvantButtons neoadjuvant={neoadjuvant} />
        </article>
    )
}

export default NeoadjuvantsExcerpt