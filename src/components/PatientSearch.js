import { useDispatch,useSelector } from "react-redux";
import { changeSearchTerm } from "../store";

function PatientSearch (){
    const dispatch=useDispatch()

    const searchTerm=useSelector((state)=>{
        return state.patients.searchTerm
    })

    const handleSearchTermChange =(event)=>{
        dispatch(changeSearchTerm(event.target.value))
    }

    return (
    <div className="list-header">
        <h3>Patient</h3>
        <div className="search field is-horizontal">
            <label className="label">Search</label>
            <input
            className="input"
            value={searchTerm}
            onChange={handleSearchTermChange}
            />
        </div>
    </div>
    )
}

export default PatientSearch;