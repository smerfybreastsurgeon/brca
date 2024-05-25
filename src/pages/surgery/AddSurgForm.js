import React,{useState} from 'react'
import {Form,FormGroup,Label,Col,Button,Input,
   } from 'reactstrap'

import { useAddNewSurgeryMutation } from "./surgerySlice";
import SurgeryPatient from './SurgeryPatient';
import { useNavigate } from "react-router-dom";

const AddSurgForm = () => {
  const [addNewSurgery, { isLoading }] = useAddNewSurgeryMutation()

  const navigate = useNavigate()

  const urlParams = new URLSearchParams(window.location.search);
  const patientId = urlParams.get('patientId');
 
  const [breastsx,setBreastsx]=useState('')
  const [breastside,setBreastside]=useState('')
  const [otherBreastsx,setotherBreastsx]=useState('')
  const [breastsx2,setBreastsx2]=useState('')
  const [breastside2,setBreastside2]=useState('')
  const [otherBreastsx2,setotherBreastsx2]=useState('')
  const [axillasx,setAxillasx]=useState('')
  const [axillaside,setAxillaside]=useState('')
  const [otherAxillasx,setotherAxillasx]=useState('')
  const [axillasx2,setAxillasx2]=useState('')
  const [axillaside2,setAxillaside2]=useState('')
  const [otherAxillasx2,setotherAxillasx2]=useState('')
  const [datesurg,setDatesurg]=useState('')
  const [reconstruction,setReconstruction]=useState('') 
  const [daterecon,setDaterecon]=useState('')
  const [recontype,setRecontype]=useState('')
  const [otherrecon,setOtherrecon]=useState('')

  const canSave = [datesurg].every(Boolean) && !isLoading;

const onSaveSurgClicked = async () => {
  if (canSave) {
      try {
          await addNewSurgery({ breastsx,
            breastside,
            otherBreastsx,
            breastsx2,
            breastside2,
            otherBreastsx2,
            axillasx,
            axillaside,
            otherAxillasx,
            axillasx2,
            axillaside2,
            otherAxillasx2,
            datesurg,
            reconstruction,
            daterecon,
            recontype,
            otherrecon,
            patientId, }).unwrap()
          setDatesurg('')
          setBreastsx('')
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
        <Col sm={6}>
          <h4 > เพิ่มบันทึกการผ่าตัด  <SurgeryPatient patientId={patientId} /></h4> 
        </Col>
          <Label className="label"
                for="datesurg"
                sm={2}
              >
                Operation Date :
          </Label>
            <Col sm={4}>
            <Input
            id='datesurg'
            type="date"
            value={datesurg}
            onChange={(e) => {
                
                setDatesurg(e.target.value);
            }}
            />
            </Col>  
      </FormGroup>
      <FormGroup row>        
        <Label className="label"
        for="breastsx"
        sm={2}
        >
        Breast operation :
        </Label>
        <Col sm={4}>
              <Input
              id="breastsx"style={{borderColor:'#2980b9'}}
              name="breastsx"
              type="select"
              value={breastsx}
              onChange={(e)=>setBreastsx(e.target.value)}
              >
                  <option value=''>
                  {''}
                  </option>
                  <option value='0'>
                    No
                  </option>
                  <option value='1'>
                  BCS/Lumpectomy/Quadrantectomy/wide excision/Excision/Partial mastectomy
                  </option>
                  <option value='2'>
                  Mastectomy
                  </option>
                  <option value='3'>
                  Skin sparing mastectomy
                  </option>
                  <option value='4'>
                  Nipple sparing mastectomy
                  </option>
                  <option value='5'>
                  Other
                  </option>
              </Input>
              <Label htmlFor="ิbreastside">ข้าง:</Label>
              <Input
                id="ิbreastside"
                name="ิbreastside"
                type="select"
                value={breastside}
                onChange={e => setBreastside(e.target.value)}
              >
                    <option value=''>
                    {''}
                    </option>
                    <option value='0'>
                    Right
                    </option>
                    <option value='1'>
                    Left
                    </option>
                    <option value='2'>
                    Bilateral
                    </option>
              </Input>
              
              {breastsx === '5' && (
              <div>
              <Label htmlFor="otherBreastsx">ระบุวิธีการอื่น:</Label>
              <Input
                id="otherBreastsx"
                name="otherBreastsx"
                type="text"
                value={otherBreastsx}
                onChange={e => setotherBreastsx(e.target.value)}
              />
              </div>
)}
        </Col>
        <Col sm={{
          offset: 2,
          size: 4
        }}>
              <Input
              id="breastsx2"style={{borderColor:'#2980b9'}}
              name="breastsx2"
              type="select"
              value={breastsx2}
              onChange={(e)=>setBreastsx2(e.target.value)}
              >
                  <option value=''>
                  {''}
                  </option>
                  <option value='0'>
                    No
                  </option>
                  <option value='1'>
                  BCS/Lumpectomy/Quadrantectomy/wide excision/Excision/Partial mastectomy
                  </option>
                  <option value='2'>
                  Mastectomy
                  </option>
                  <option value='3'>
                  Skin sparing mastectomy
                  </option>
                  <option value='4'>
                  Nipple sparing mastectomy
                  </option>
                  <option value='5'>
                  Other
                  </option>
              </Input>
              <Label htmlFor="ิbreastside2">ข้าง:</Label>
              <Input
                id="ิbreastside2"
                name="ิbreastside2"
                type="select"
                value={breastside2}
                onChange={e => setBreastside2(e.target.value)}
              >
                    <option value=''>
                    {''}
                    </option>
                    <option value='0'>
                    Right
                    </option>
                    <option value='1'>
                    Left
                    </option>
                    <option value='2'>
                    Bilateral
                    </option>
              </Input>
              
              {breastsx === '5' && (
              <div>
              <Label htmlFor="otherBreastsx2">ระบุวิธีการอื่น:</Label>
              <Input
                id="otherBreastsx2"
                name="otherBreastsx2"
                type="text"
                value={otherBreastsx2}
                onChange={e => setotherBreastsx2(e.target.value)}
              />
              </div>
)}
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label className="label"
        for="axillasx"
        sm={2}
        >
        Axilla operation :
        </Label>
        <Col sm={4}>
              <Input
              id="axillasx"style={{borderColor:'#2980b9'}}
              name="axillasx"
              type="select"
              value={axillasx}
              onChange={(e)=>setAxillasx(e.target.value)}
              >
              <option value=''>
              {''}
              </option>
              <option value='0'>
                No
              </option>
              <option value='1'>
              Sentinel lymph node biopsy &#40;SLNBx&#41;
              </option>
              <option value='2'>
              Axillary lymph node dissection &#40;ALND&#41;
              </option>
              <option value='3'>
              Sentinel lymph node biopsy &#40;SLNBx&#41; and Axillary lymph node dissection &#40;ALND&#41;
              </option>
              <option value='4'>
              Other
              </option>
             
              </Input>
              <Label htmlFor="ิaxillaside" sm={2}>ข้าง:</Label>
              <Input sm={4}
                id="ิaxillaside"
                name="ิaxillaside"
                type="select"
                value={axillaside}
                onChange={e => setAxillaside(e.target.value)}
              >
                    <option value=''>
                    {''}
                    </option>
                    <option value='0'>
                    Right
                    </option>
                    <option value='1'>
                    Left
                    </option>
                    <option value='2'>
                    Bilateral
                    </option>
              </Input>
              
              {axillasx === '4' && (
              <div>
              <Label htmlFor="otherAxillasx">ระบุวิธีการอื่น:</Label>
              <Input
                id="otherAxillasx"
                name="otherAxillasx"
                type="text"
                value={otherAxillasx}
                onChange={e => setotherAxillasx(e.target.value)}
              />
              </div>
)}
        </Col>
        <Col sm={{
          offset: 2,
          size: 4
        }}>
              <Input
              id="axillasx2"style={{borderColor:'#2980b9'}}
              name="axillasx2"
              type="select"
              value={axillasx2}
              onChange={(e)=>setAxillasx2(e.target.value)}
              >
              <option value=''>
              {''}
              </option>
              <option value='0'>
                No
              </option>
              <option value='1'>
              Sentinel lymph node biopsy &#40;SLNBx&#41;
              </option>
              <option value='2'>
              Axillary lymph node dissection &#40;ALND&#41;
              </option>
              <option value='3'>
              Sentinel lymph node biopsy &#40;SLNBx&#41; and Axillary lymph node dissection &#40;ALND&#41;
              </option>
              <option value='4'>
              Other
              </option>
             
              </Input>
              <Label htmlFor="ิaxillaside2" sm={2}>ข้าง:</Label>
              <Input sm={4}
                id="ิaxillaside2"
                name="ิaxillaside2"
                type="select"
                value={axillaside2}
                onChange={e => setAxillaside2(e.target.value)}
              >
                    <option value=''>
                    {''}
                    </option>
                    <option value='0'>
                    Right
                    </option>
                    <option value='1'>
                    Left
                    </option>
                    <option value='2'>
                    Bilateral
                    </option>
              </Input>
              
              {axillasx2 === '4' && (
              <div>
              <Label htmlFor="otherAxillasx2">ระบุวิธีการอื่น:</Label>
              <Input
                id="otherAxillasx2"
                name="otherAxillasx2"
                type="text"
                value={otherAxillasx2}
                onChange={e => setotherAxillasx2(e.target.value)}
              />
              </div>
)}
        </Col>
      </FormGroup>
      <FormGroup row>
      <Label className="label"
      for="datesurg"
      sm={2}
    >
      Reconstruction Date :
    </Label>
    <Col sm={4}>
    <Input
    id='daterecon'
    type="date"
    value={daterecon}
    onChange={(e) => {
        
        setDaterecon(e.target.value);
    }}
/>
    </Col>
        
        </FormGroup>
        <FormGroup row>
        <Label className="label"
        for="reconstruct"
        sm={2}
        >
        Reconstruction
        </Label>
        <Col sm={4}>
        <Input
        id="reconstruction"style={{borderColor:'#2980b9'}}
        name="reconstruction"
        type="select"
        value={reconstruction}
        onChange={(e)=>setReconstruction(e.target.value)}

        > <option>
        {""}
        </option>
        <option value='0'>
        No
        </option>
        <option value='1'>
        yes,Immediate Reconstruction
        </option>
        <option value='2'>
        yes,Late Reconstruction
        </option>     
        </Input>
        </Col>
        <Label className="label"
        for="reconstruct"
        sm={2}
        >
        Reconstruction Type:
        </Label>
        <Col sm={4}>
        <Input
        id="recontype"style={{borderColor:'#2980b9'}}
        name="recontype"
        type="select"
        value={recontype}
        onChange={(e)=>setRecontype(e.target.value)}

        > <option>
        {""}
        </option>
        <option value='0'>
        Autologous based
        </option>
        <option value='1'>
        Implant based
        </option>
        <option value='2'>
        Combine
        </option> 
        <option value='3'>
        Mammoreduction
        </option>
        <option value='4'>
        Mammoplasty
        </option> 
        <option value='5'>
        Other
        </option>       
        </Input>
        {recontype === '5' && (
              <div>
              <Label htmlFor="otherrecon">ระบุวิธีการอื่น:</Label>
              <Input
                id="otherrecon"
                name="otherrecon"
                type="text"
                value={otherrecon}
                onChange={e => setOtherrecon(e.target.value)}
              />
              </div>
)}
        </Col>
        </FormGroup>
        <FormGroup row>

        </FormGroup>
        <FormGroup row>
        <Col
        sm={{
          offset: 10,
          size: 2
        }}
        >
        <Button  onClick={()=>navigate(`/patient/${patientId}`)} style={{marginRight: '10px'}}  >
            ย้อนกลับ
            </Button>    
        <Button color='primary' onClick={onSaveSurgClicked} disabled={!canSave}>
          บันทึก
        </Button>
        </Col>
        </FormGroup>
</Form>     
</div>
)
}

export default AddSurgForm