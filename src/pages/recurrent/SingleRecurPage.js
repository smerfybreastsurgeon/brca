import RecurPatient from "./RecurPatient";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionRecurButtons";
import { useNavigate} from 'react-router';
import { useGetRecursQuery } from "./recurSlice";
import { getThai } from "../../utility/getThai";
import { Button } from "reactstrap";
import { useParams } from 'react-router-dom';

const SingleRecurPage = () => {
    const { recurId } = useParams()
    const navigate=useNavigate()
    const { recur, isLoading } = useGetRecursQuery('getrecurs', {
        selectFromResult: ({ data, isLoading }) => ({
            recur: data?.entities[recurId],
            isLoading
        }),
    })

    if (isLoading) return <p>Loading...</p>

    if (!recur) {
        return (
            <section>
                <h2>Recur not found!</h2>
            </section>
        )
    }

    return (
        <article>
             <p>วันที่รายงานผล :{getThai(recur.recurdxdate)}</p>
            <p className="excerpt">Recur:{recur.stype}</p>
            
            <p className="postCredit">
            <Button className="btn-custom"  onClick={() => navigate(`/recur/edit/${recurId}`)}>แก้ไข</Button>
                 <RecurPatient patientId={recur.patientId} />
                <TimeAgo timestamp={recur.date} />
            </p>
            <ReactionButtons recur={recur} />
        </article>
    )
}

export default SingleRecurPage