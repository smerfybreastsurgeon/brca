import { Link } from "react-router-dom";
import { useGetPatientsQuery } from "../patients/patientsSlice";

const SurgeryPatient = ({ patientId }) => {

    const { patient } = useGetPatientsQuery('getPatients', {
        selectFromResult: ({ data, isLoading }) => ({
            patient: data?.entities[patientId]
        }),
    })

    return <span>ของ {patient
        ? <Link to={`/patient/${patientId}`}>{patient.name}</Link>
        : 'Unknown breast cancer patient'}</span>
}
export default SurgeryPatient