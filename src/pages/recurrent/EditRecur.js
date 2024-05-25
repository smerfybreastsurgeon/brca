import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetRecursQuery } from './recurSlice';
import RecurPatient from './RecurPatient';

import { useUpdateRecurMutation,useDeleteRecurMutation } from './recurSlice';
import {Form,FormGroup,Label,Col,Button,Input,Modal
} from 'reactstrap'
import MetastasisSite from '../../components/MetastasisSite';
import LocalRecursite from '../../components/LocalRecursite';

const DeleteConfirmationModal = ({ isOpen, toggle, onDelete }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <div className="modal-header">
        <h5 className="modal-title">Confirm Deletion</h5>
        <button type="button" className="btn-close" onClick={toggle}></button>
      </div>
      <div className="modal-body">
        Are you sure you want to delete this record?
      </div>
      <div className="modal-footer">
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <Button color="danger" onClick={onDelete}>
        Delete
        </Button>
      </div>
    </Modal>
  );
};

const EditRecur = () => {
    const { recurId } = useParams()
    const navigate = useNavigate()
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [updateRecur, { isLoading }] = useUpdateRecurMutation()
    const [deleteRecur] = useDeleteRecurMutation()

    const { recur, isLoading: isLoadingRecurs, isSuccess } = useGetRecursQuery('getRecurs', {
        selectFromResult: ({ data, isLoading, isSuccess }) => ({
            recur: data?.entities[recurId],
            isLoading,
            isSuccess
        }),
    })

    const [recurrence,setRecurrence]=useState('');
    const [recurdxdate,setRecurdxdate]=useState('')
    const [datelast,setDatelast]=useState('');
const [status,setStatus]=useState('');
    const [metassite,setMetassite]=useState([]);
    const [othermetassite,setOthermetassite]=useState([]);
    const [localsite,setLocalsite]=useState([]);
    const [otherlocalsite,setOtherlocalsite]=useState([]);
    const [patientId, setPatientId] = useState('')

    const handleSelectedsitemetas = (selected) => { setMetassite(selected);  };
    const handleOnOthermetChange=(othermet)=>{
      setOthermetassite(othermet)
      }  
      const handleSelectedsitelocal = (selected) => { setLocalsite(selected);  };
      const handleOnOtherlocalChange=(otherlocal)=>{
        setOtherlocalsite(otherlocal)
        }
   

    useEffect(() => {
        if (isSuccess) {
          setRecurrence(recur.recurrence)
          setRecurdxdate(recur.recurdxdate)
          setMetassite(recur.metassite)
          setLocalsite(recur.localsite)
          setStatus(recur.status)
          setDatelast(recur.datelast)
          setOthermetassite(recur.othermetassite)
          setOtherlocalsite(recur.otherlocalsite)
          setPatientId(recur.patientId)
        }
    }, [isSuccess,recur.patientId,recur.recurrence,recur.status,
      recur.datelast,
      recur.recurdxdate,
      recur.metassite,
      recur.othermetassite,
      recur.localsite,
      recur.otherlocalsite])

    if (isLoadingRecurs) return <p>Loading...</p>

    if (!recur) {
        return (
            <section>
                <h2>Recur not found!</h2>
            </section>
        )
    }
    
    const canSave =  !isLoading;

    const onSaveRecurClicked = async () => {
        if (canSave) {
            try {
                await updateRecur({id:recur.id,recurrence,
                  recurdxdate,
                  metassite,
                  othermetassite,
                  localsite,
                  otherlocalsite,patientId}).unwrap()

                
                setPatientId('')
                navigate(`/patient/${patientId}`);
              window.location.reload();
            } catch (err) {
                console.error('Failed to save the post', err)
            }
        }
    }
    

    const handleDelete = async () => {
        try {
            await deleteRecur({ id: recur?.id }).unwrap()           
            setPatientId('')           
            navigate(`/patient/${patientId}`);
          
        } catch (err) {
            console.error('Failed to delete the recur', err)
        }
    }
    
    return (
        <div className="container my-5 flex">
    <Form>
    <FormGroup row>
      <h2 sm={12}> แก้ไข Recurrence  <RecurPatient patientId={patientId} /></h2>      
    </FormGroup>
    <FormGroup row>
      <Label className="label"
        for="recurrence"
        sm={2}
      >
        Recurrence
      </Label>
      <Col sm={4}>
        <Input 
          id="recurrence" style={{borderColor:'#2980b9'}}
          name="recurrence"
          type="select"
          value={recurrence}
          onChange={(e)=>{setRecurrence(e.target.value)}}
        >
              <option value=''>
                {""}
              </option>
              <option value='no'>
                No
              </option>
              <option value='yes'>
                Yes
              </option>
 
        </Input>
      </Col> 
      <Label className="label" sm={2}>Date last visit</Label>
                            <Col sm={4}>
                            <Input 
                            id='datelast'name='datelast'
                            type="date"
                            value={datelast}
                            onChange={(e)=>{setDatelast(e.target.value)}}
                            />                      
                        </Col>     
</FormGroup>
<FormGroup row>
<Label className="label"
  for="recurdxdate"
  sm={2}
>
  Recurrence diagnosis date :
</Label>
<Col sm={4}>
<Input
  id="recurdxdate"style={{borderColor:'#2980b9'}}
  name="recurdxdate"
  type="date"
  value={recurdxdate}
  onChange={(e)=>{setRecurdxdate(e.target.value)}}
/>
</Col>
<Label className="label" sm={2}>สถานะ</Label>
                            <Col sm={4}>
                            <Input
                            id='status' name='status'
                            type="select"
                            value={status}
                            onChange={(e)=>{setStatus(e.target.value)}}
                            >
                                <option value=' '>
                                    {' '}
                                </option>
                                <option value='AliveFree'>
                                มีชีวิตปราศจากมะเร็ง
                                </option>
                                <option value='AliveCancer'>
                                มีชีวิตกับมะเร็ง
                                </option>
                                <option value='DeadCancer'>
                                ตายจากมะเร็ง
                                </option>
                                <option value='DeadOther'>
                                ตายจากสาเหตุอื่น
                                </option>
                            </Input></Col>
</FormGroup>
<FormGroup row>
  <Label 
      for="metassite"style={{borderColor:'#2980b9',color:'blue'}}
      sm={2}
    >
      อวัยวะที่มีการแพร่กระจาย
    </Label>    
  <Col sm={4}>    
          <MetastasisSite defaultSitemetas={recur.metassite} othermetassite={recur.othermetassite} onOtherMetChange={handleOnOthermetChange}  onSelected={handleSelectedsitemetas} />       
  </Col>
  
  <Label 
      for="localsite"style={{borderColor:'#2980b9',color:'blue'}}
      sm={2}
    >
      การกลับเป็นซ้ำเฉพาะที่
    </Label>    
  <Col sm={4}>    
          <LocalRecursite defaultSitelocal={recur.localsite} otherlocalsite={recur.otherlocalsite} onOtherLocalChange={handleOnOtherlocalChange}  onSelected={handleSelectedsitelocal} />       
  </Col>
  </FormGroup>
  <FormGroup row>
<Col
  sm={{
    offset: 8,
    size: 4
  }}
> 
      <Button color="danger" onClick={() => setShowDeleteModal(true)}>
        ลบ
      </Button>
       <DeleteConfirmationModal
        isOpen={showDeleteModal}
        toggle={() => setShowDeleteModal(false)}
        onDelete={handleDelete}
      />
      <Button  onClick={()=>navigate(`/patient/${patientId}`)}  style={{marginLeft: '10px'}} >
           ย้อนกลับ
      </Button>   
      <Button onClick={onSaveRecurClicked} style={{marginLeft: '10px'}} disabled={!canSave} color='primary'>
        บันทึก
      </Button>
      </Col>
</FormGroup>
</Form>     
</div>
)
}

export default EditRecur