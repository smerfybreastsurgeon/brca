import PstagesExcerpt from "./PstagesExcerpt";
import { useGetPstagesQuery } from './pstagesSlice';

import { useParams } from 'react-router-dom';

const PstagesList = () => {
    
    const { patientId: routePatientId } = useParams()   
    const {
        data: pstages,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPstagesQuery('getPstages');   

    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        const pstagesentities = pstages?.entities || {};
        const allPstageIds = pstages?.ids || [];
    let filteredPstageIds = allPstageIds;   
        // Filter by patientId if it is provided in the URL params
        if (routePatientId ) {
            filteredPstageIds = allPstageIds?.filter(pstageId => {
                const pstage = pstagesentities[pstageId];
                return pstage && pstage?.patientId === routePatientId ;
            });
        }

        content = filteredPstageIds?.map(pstageId => <PstagesExcerpt key={pstageId} pstageId={pstageId} />);
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return (
        <section>
            {content}
        </section>
    );
};

export default PstagesList;