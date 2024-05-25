import SurgeryPatient from "./SurgeryPatient";
import TimeAgo from "./TimeAgo";

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useGetSurgerysQuery } from "./surgerySlice";
import { getThai } from "../../utility/getThai";
import { getSurgery } from "../../utility/getSurgery";

const SingleSurgeryPage = () => {
    const { surgeryId } = useParams()

    const { surgery, isLoading } = useGetSurgerysQuery('getSurgerys', {
        selectFromResult: ({ data, isLoading }) => ({
            surgery: data?.entities[surgeryId],
            isLoading
        }),
    })

    if (isLoading) return <p>Loading...</p>

    if (!surgery) {
        return (
            <section>
                <h2>Surgery not found!</h2>
            </section>
        )
    }

    return (
        <article>
             <p>วันที่ผ่าตัด :{getThai(surgery.datesurg)}</p>
            <p className="excerpt">Breast Operation:{getSurgery(surgery.breastsx)}  Side:{surgery.breastside==='0'?'Right':surgery.breastside==='1'?'Left':'Bilateral' }</p>           
            <p className="postCredit">
                <Link to={`/surgery/edit/${surgery.id}`}>Edit surgery</Link>
                <SurgeryPatient patientId={surgery.patientId} />
                <TimeAgo timestamp={surgery.date} />
            </p>
           
        </article>
    )
}

export default SingleSurgeryPage