import SubtypesExcerpt from "./SubtypesExcerpt";
import { useGetSubtypesQuery } from './subtypeSlice';
import { useParams } from 'react-router-dom';

const SubtypeList = () => {
    const { patientId: routePatientId } = useParams()   
    const {
        data: subtypes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetSubtypesQuery('getSubtypes')

    
    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        const subtypeentities = subtypes?.entities || {};
        const allSubtypeIds = subtypes?.ids || [];
    let filteredSubtypeIds = allSubtypeIds;   
        // Filter by patientId if it is provided in the URL params
        if (routePatientId ) {
            filteredSubtypeIds = allSubtypeIds?.filter(subtypeId => {
                const subtype = subtypeentities[subtypeId];
                return subtype && subtype?.patientId === routePatientId ;
            });
        }

        content = filteredSubtypeIds?.map(subtypeId => <SubtypesExcerpt key={subtypeId} subtypeId={subtypeId} />);
    } else if (isError) {
        content = <p>{error}</p>;
    }
           
    return (
        <section>
            {content}
        </section>
    )
}
export default SubtypeList