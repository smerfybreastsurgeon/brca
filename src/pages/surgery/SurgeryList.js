import SurgerysExcerpt from "./SurgerysExcerpt";
import { useGetSurgerysQuery } from './surgerySlice';
import { useParams } from 'react-router-dom';

const SurgeryList = () => {
    const { patientId: routePatientId } = useParams()
    const {
        data: surgerys,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetSurgerysQuery('getSurgerys')    

    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        const surgerysentities = surgerys?.entities || {};
        const allSurgeryIds = surgerys?.ids || [];
    let filteredSurgeryIds = allSurgeryIds;   
        // Filter by patientId if it is provided in the URL params
        if (routePatientId ) {
            filteredSurgeryIds = allSurgeryIds?.filter(surgeryId => {
                const surgery = surgerysentities[surgeryId];
                return surgery && surgery?.patientId === routePatientId ;
            });
        }

        content = filteredSurgeryIds?.map(surgeryId => <SurgerysExcerpt key={surgeryId} surgeryId={surgeryId} />);
    } else if (isError) {
        content = <p>{error}</p>;
    }
           
    return (
        <section>
            {content}
        </section>
    )
}
export default SurgeryList