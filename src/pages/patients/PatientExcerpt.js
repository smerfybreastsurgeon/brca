import TimeAgo from "./TimeAgo";
import ReactionPatButtons from "./ReactionPatButtons";
import { useNavigate } from "react-router";
import { getThai } from "../../utility/getThai";
import { Button } from "reactstrap";
import { useGetPatientsQuery } from "./patientsSlice";
import { getAge } from "../../utility/getAge";

const PatientExcerpt = ({ patientId }) => {
const navigate=useNavigate()
    const { patient } = useGetPatientsQuery('getPatients', {
        selectFromResult: ({ data }) => ({
            patient: data?.entities[patientId]
        }),
    })

    return (
        <article>
        <p>วันที่วินิจฉัยครั้งแรก :{getThai(patient.datediag)}</p>
            <p>วันเกิด :{getThai(patient.datebirth)}</p>
            <p>อายุ:{getAge(patient.datebirth,patient.datediag)}</p>
            <p className="excerpt">โรงพยาบาล: {patient.hospital} </p>
            <p className="postCredit">
            <Button onClick={() => navigate(`${patientId}`)}>View Clinical Stage</Button>
                <TimeAgo timestamp={patient.date} />
            </p>
            <ReactionPatButtons patient={patient} />
        </article>
    )
}

export default PatientExcerpt