import SurgeryPatient from "./SurgeryPatient";
import TimeAgo from "./TimeAgo";
import { useGetSurgerysQuery } from "./surgerySlice";
import { getThai } from "../../utility/getThai";
import { getSurgery } from "../../utility/getSurgery";
import { useNavigate } from 'react-router-dom';
import { Button } from "reactstrap";

const SurgerysExcerpt = ({ surgeryId }) => {
    const navigate=useNavigate()
    const { surgery } = useGetSurgerysQuery('getSurgerys', {
        selectFromResult: ({ data }) => ({
            surgery: data?.entities[surgeryId]
        }),
    })

    return (
        <article>
          
            <p>วันที่ผ่าตัด :{getThai(surgery.datesurg)}</p>
            <p className="excerpt">Breast operation:{getSurgery(surgery.breastsx)}</p>
           
            <p className="postCredit">
                <Button className="btn-custom" onClick={() => navigate(`/surgery/view/${surgeryId}`)}>ดูรายละเอียด</Button>{' '}
                <SurgeryPatient patientId={surgery.patientId} />
                <TimeAgo timestamp={surgery.date} />
            </p>
               
        </article>
    )
}

export default SurgerysExcerpt