import RecursExcerpt from "./RecursExcerpt";
import { useGetRecursQuery } from './recurSlice';
import { useParams } from 'react-router-dom';

const RecurList = () => {
      
    const { patientId: routePatientId } = useParams() 
    const {
        data: recurs,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetRecursQuery('getRecurs')

    

    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        const recursentities = recurs?.entities || {};
        const allRecurIds = recurs?.ids || [];
    let filteredRecurIds = allRecurIds;   
        // Filter by patientId if it is provided in the URL params
        if (routePatientId ) {
            filteredRecurIds = allRecurIds?.filter(recurId => {
                const recur = recursentities[recurId];
                return recur && recur?.patientId === routePatientId ;
            });
        }

        content = filteredRecurIds?.map(recurId => <RecursExcerpt key={recurId} recurId={recurId} />);
    } else if (isError) {
        content = <p>{error}</p>;
    }

           
    return (
        <section>
            {content}
        </section>
    )
}
export default RecurList