import NeoadjuvantsExcerpt from "./NeoadjuvantsExcerpt";
import { useGetNeoadjuvantsQuery } from './neoadjuvantSlice';
import { useParams } from 'react-router-dom';

const NeoadjuvantList = () => {
    const { patientId: routePatientId } = useParams()
    const {
        data: neoadjuvants,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNeoadjuvantsQuery('getNeoadjuvants')

    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        const neoadjuvantsentities = neoadjuvants?.entities || {};
    const allNeoadjuvantIds = neoadjuvants?.ids || [];
    let filteredNeoadjuvantIds = allNeoadjuvantIds;

        // Filter by patientId if it is provided in the URL params
        if (routePatientId ) {
            filteredNeoadjuvantIds = allNeoadjuvantIds?.filter(neoadjuvantId => {
                const neoadjuvant = neoadjuvantsentities[neoadjuvantId];
                return neoadjuvant && neoadjuvant?.patientId === routePatientId ;
            });
        }

        content = filteredNeoadjuvantIds?.map(neoadjuvantId => <NeoadjuvantsExcerpt key={neoadjuvantId} neoadjuvantId={neoadjuvantId} />);
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return (
        <section>
            {content}
        </section>
    );
};

           
   
export default NeoadjuvantList