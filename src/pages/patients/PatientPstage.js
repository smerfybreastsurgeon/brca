import { Link, useParams } from 'react-router-dom'
import { useGetPstagesByPatientIdQuery } from '../pstages/pstagesSlice'
import { useGetPatientsQuery } from './patientsSlice'

const PatientPstage = () => {
    const { patientId } = useParams()

    const { patient,
        isLoading: isLoadingPatient,
        isSuccess: isSuccessPatient,
        isError: isErrorPatient,
        error: errorPatient
    } = useGetPatientsQuery('getPatients', {
        selectFromResult: ({ data, isLoading, isSuccess, isError, error }) => ({
            patient: data?.entities[patientId],
            isLoading,
            isSuccess,
            isError,
            error
        }),
    })
    

    const {
        data: pstagesForPatient,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPstagesByPatientIdQuery(patientId);
    console.log(patientId,pstagesForPatient)
   

    let content;
    if (isLoading || isLoadingPatient) {
        content = <p>Loading...</p>
    } else if (isSuccess && isSuccessPatient) {
        const { ids, entities } = pstagesForPatient
        content = (
            <section>
                <h2>{patient?.name}</h2>
                
                 <ol>
                    {ids.map(id => (
                        <li key={id}>
                            <Link to={`/pstage/${id}`}>{entities[id].stage}</Link>
                            <p>{entities[id].cT}</p>
                            <p>{entities[id].cN}</p>
                            <p>{entities[id].M}</p>
                        </li>

                    ))}
                </ol>
            </section>
        )
    } else if (isError || isErrorPatient) {
        content = <p>{error || errorPatient}</p>;
    }

    return content
}

export default PatientPstage