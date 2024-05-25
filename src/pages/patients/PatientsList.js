import { Link } from 'react-router-dom'
import { useGetPatientsQuery,useGetPatientsByFieldQuery } from './patientsSlice'
import { getAge } from '../../utility/getAge'
import { getThai } from '../../utility/getThai'
import {getHospital} from '../../utility/getHospital'

import { useState } from 'react';
import CreatePatient from './CreatePatient';
import EditPatient1 from './EditPatient1'
import SearchForm from '../../components/SearchForm'
import { Col, Row } from 'reactstrap'

const PatientsList = () => {
    const [field, setField] = useState(null);  
  
    
const handleSelect = (option) => {    
     setField(option);
  };
  
    const {
        data: patients,
        isLoading:isLoadingAll,
        isSuccess:isSuccessAll,
        isError,
        error:errorAll
    } =  useGetPatientsQuery("getPatients");

    const {
        data: dataByField,
        error: errorByField,
        isLoading: isLoadingByField,
        isSuccess: isSuccessByField,
      } = useGetPatientsByFieldQuery(field);
      
      const data = field &&(field.label!=='ชื่อ-นามสกุล'&&field.label!=='HN'&&field.label!=='อายุแรกวินิจฉัย')? dataByField : patients;
      const error = field ? errorByField : errorAll;
      const isLoading = field ? isLoadingByField : isLoadingAll;
      const isSuccess = field ? isSuccessByField : isSuccessAll;
     
    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const toggle=()=>{
        setCreateModal(!createModal)
      }
      const etoggle=()=>{
        setEditModal(!editModal)
      }
    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {

    const renderedPatients = data.ids.map(patientId => ( 
                  
            <tr key={patientId} >
            <th >{data.entities[patientId].pid}</th>
            <th ><Link to={`/patient/${patientId}`} >{data.entities[patientId].hn}</Link></th>
            <th ><Link to={`/patient/${patientId}`}>{data.entities[patientId].name}</Link></th>
            <th >{getThai(data.entities[patientId].datebirth)}</th>
            <th >{getThai(data.entities[patientId].datediag)}</th>
            <th >{getHospital(data.entities[patientId].hospital)}</th>
            <th >{getAge(data.entities[patientId].datebirth,data.entities[patientId].datediag)}</th>
            <th >{getThai(data.entities[patientId].datelast)}</th>
            <th >{data.entities[patientId].status}</th>
            <th >
                
                <EditPatient1 modal={editModal} buttonLabel='แก้ไข' item={data.entities[patientId]} toggle={etoggle}/>
            </th>
            
        </tr>
       
        ))

        content = (
            <><Row style={{ marginTop: "10px" }}><Col>
                <SearchForm setField={setField} onSelect={handleSelect}  /></Col><Col>
                <CreatePatient  sm={6} modal={createModal} toggle={toggle}  /></Col> </Row>                
                <table className="styled-table" >
                <thead>
                        <tr>
                            <th >pid</th>
                            <th >HN</th>
                            <th >ชื่อ-นามสกุล</th>
                            <th >วันเกิด</th>
                            <th >วันแรกวินิจฉัย</th>
                            <th >โรงพยาบาล</th>
                            <th >อายุแรกวินิจฉัย</th>
                            <th >ติดต่อได้ล่าสุด</th>
                            <th >สถานะ</th>
                            <th >action</th>
                        </tr>
                    
                </thead>
                <tbody>
                {renderedPatients}
                </tbody>
            </table>                    
            </>
        )
    } else if (isError) {
        content = <p>{error}</p>;
    }
       
    return content
}

export default PatientsList