import { Link } from "react-router-dom";
import { useGetPatientsQuery } from "../patients/patientsSlice";

const CstagePatient = ({ patientId }) => {

    const { patient: brca } = useGetPatientsQuery('getPatients', {
        selectFromResult: ({ data, isLoading }) => ({
            patient: data?.entities[patientId]
        }),
    })

    return <span>บันทึกของ {brca
        ? <Link to={`/patient/${patientId}`}>{brca.name}{'  HN: '}{brca.hn}</Link>
        : 'Unknown breast cancer patient'}</span>
}
export default CstagePatient