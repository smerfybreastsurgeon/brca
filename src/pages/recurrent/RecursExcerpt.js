import RecurPatient from "./RecurPatient";
import TimeAgo from "./TimeAgo";
import ReactionRecurButtons from "./ReactionRecurButtons";
import { useNavigate} from 'react-router';
import { useGetRecursQuery } from "./recurSlice";
import { getThai } from "../../utility/getThai";
import { Button } from "reactstrap";

const RecursExcerpt = ({ recurId }) => {
    const navigate=useNavigate()
    const { recur } = useGetRecursQuery('getRecurs', {
        selectFromResult: ({ data }) => ({
            recur: data?.entities[recurId]
        }),
    })

    return (
        <article>
          
            <p>วันที่รายงานผล :{getThai(recur?.recurdxdate)}</p>
            <p className="excerpt">recur:{recur?.recurdxdate}</p>
           
            <p className="postCredit">
            <Button className="btn-custom"  onClick={() => navigate(`/recur/view/${recurId}`)}>แก้ไข</Button>
                <RecurPatient patientId={recur?.patientId} />
                <TimeAgo timestamp={recur?.date} />
            </p>
            <ReactionRecurButtons recur={recur} />
        </article>
    )
}

export default RecursExcerpt