import CstagesExcerpt from "./CstagesExcerpt";
import { useGetCstagesQuery } from './cstagesSlice';

import { useParams } from 'react-router-dom';

const CstagesList = () => {
    
    const { patientId: routePatientId } = useParams()
    
    const {
        data: cstages,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCstagesQuery('getCstages');
    console.log('cstages:', cstages);
    console.log('patientId:', routePatientId );

    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        const cstagesentities = cstages?.entities || {};
    const allCstageIds = cstages?.ids || [];
    let filteredCstageIds = allCstageIds;

        // Filter by patientId if it is provided in the URL params
        if (routePatientId ) {
            filteredCstageIds = allCstageIds?.filter(cstageId => {
                const cstage = cstagesentities[cstageId];
                return cstage && cstage?.patientId === routePatientId ;
            });
        }

        content = filteredCstageIds?.map(cstageId => <CstagesExcerpt key={cstageId} cstageId={cstageId} />);
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return (
        <section>
            {content}
        </section>
    );
};

export default CstagesList;
