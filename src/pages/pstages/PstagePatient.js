import { Link } from "react-router-dom";
import { useGetPatientsQuery } from "../patients/patientsSlice";

const PstagePatient = ({ patientId }) => {

    const { patient: brca } = useGetPatientsQuery('getPatients', {
        selectFromResult: ({ data, isLoading }) => ({
            patient: data?.entities[patientId]
        }),
    })

    return <span>บันทึกของ {brca
        ?<> <Link to={`/patient/${patientId}`}>{brca.name}</Link>
        <h4>HN:{' '}{brca.hn}</h4></>
        : 'Unknown breast cancer patient'}</span>
}
export default PstagePatient