import React,{useState} from 'react'
import {Form,FormGroup,Label,Col,Button,Input,
   } from 'reactstrap'

import { useAddNewRecurMutation } from "./recurSlice";
import { useNavigate } from "react-router-dom";
import MetastasisSite from '../../components/MetastasisSite';
import RecurPatient from './RecurPatient';
import LocalRecursite from '../../components/LocalRecursite';



const AddRecur = () => {
    const [addNewRecur, { isLoading }] = useAddNewRecurMutation()

    const navigate = useNavigate()

    const urlParams = new URLSearchParams(window.location.search);
    const patientId = urlParams.get('patientId');
  
    const [recurrence,setRecurrence]=useState('');
    const [datelast,setDatelast]=useState('');
    const [recurdxdate,setRecurdxdate]=useState('')
    const [status,setStatus]=useState('');
    const [metassite,setMetassite]=useState([]);
    const [othermetassite,setOthermetassite]=useState([]);
    const [localsite,setLocalsite]=useState([]);
    const [otherlocalsite,setOtherlocalsite]=useState([]);
    
    const handleSelectedsitemetas = (selected) => { setMetassite(selected);  };
    const handleOnOthermetChange=(othermet)=>{
      setOthermetassite(othermet)
      }
    
    const handleSelectedsitelocal = (selected) => { setLocalsite(selected);  };
    const handleOnOtherlocalChange=(otherlocal)=>{
      setOtherlocalsite(otherlocal)
      }

  const canSave =[recurdxdate,recurrence].every(Boolean) &&  !isLoading;
  

  const onSaveRecurClicked = async () => {
    if (canSave) {
        try {
            await addNewRecur({ recurrence,
              recurdxdate,datelast,status,
              metassite,
              othermetassite,localsite,
              otherlocalsite,patientId }).unwrap()
           setRecurdxdate('')
           setDatelast('')
           setStatus('')
           setMetassite([])
           setOthermetassite('')
           setLocalsite([])
           setOtherlocalsite('')
           setRecurrence('')
           navigate(`/patient/${patientId}`);
        
        } catch (err) {
            console.error('Failed to save the post', err)
        }
    }
}  
 
  return (
    <div className="container my-5 flex">
    <Form>
    <FormGroup row>
      <h4 sm={12}> เพิ่มบันทึก Recurrence & Metastasis  <RecurPatient patientId={patientId} /></h4>   
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
          <MetastasisSite defaultSitemetas={metassite} othermetassite={othermetassite} onOtherMetChange={handleOnOthermetChange}  onSelected={handleSelectedsitemetas} />       
  </Col>
  <Label 
      for="localsite"style={{borderColor:'#2980b9',color:'blue'}}
      sm={2}
    >
      กลับเป็นซ้ำเฉพาะที่
    </Label>    
  <Col sm={4}>    
          <LocalRecursite defaultSitelocal={localsite} otherlocalsite={otherlocalsite} onOtherLocalChange={handleOnOtherlocalChange}  onSelected={handleSelectedsitelocal} />       
  </Col>
  </FormGroup>


<FormGroup row>
<Col
  sm={{
    offset: 8,
    size:4
  }}
>
<Button  onClick={()=>navigate(`/patient/${patientId}`)} style={{marginRight: '10px'}}  >
       ย้อนกลับ
      </Button>    
  <Button color='primary' onClick={onSaveRecurClicked} disabled={!canSave}>
    บันทึก
  </Button>
</Col>
</FormGroup>
</Form>     
</div>
)
}


export default AddRecur