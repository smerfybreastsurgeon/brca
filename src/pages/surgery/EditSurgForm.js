import React,{useState,useEffect} from 'react'
import {Form,FormGroup,Label,Col,Button,Input,Modal
} from 'reactstrap'

import { useUpdateSurgeryMutation,
  useDeleteSurgeryMutation,useGetSurgerysQuery } from "./surgerySlice";
import SurgeryPatient from './SurgeryPatient';
import { useParams, useNavigate } from 'react-router-dom';

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


const EditSurgForm = () => {
  const { surgeryId } = useParams()
  const navigate = useNavigate()
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [updateSurgery, { isLoading }] = useUpdateSurgeryMutation()
    const [deleteSurgery] = useDeleteSurgeryMutation()

    const { surgery, isLoading: isLoadingSurgerys, isSuccess } = useGetSurgerysQuery('getSurgerys', {
        selectFromResult: ({ data, isLoading, isSuccess }) => ({
            surgery: data?.entities[surgeryId],
            isLoading,
            isSuccess
        }),
    }) 
 
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
  const [patientId, setPatientId] = useState('')

  useEffect(() => {
    if (isSuccess) {
      setBreastsx(surgery.breastsx)
      setBreastside(surgery.breastside)
      setotherBreastsx(surgery.otherBreastsx)
      setBreastsx2(surgery.breastsx2)
      setBreastside2(surgery.breastside2)
      setotherBreastsx2(surgery.otherBreastsx2)
      setAxillasx(surgery.axillasx)
      setAxillaside(surgery.axillaside)
      setotherAxillasx(surgery.otherAxillasx)
      setAxillasx2(surgery.axillasx2)
      setAxillaside2(surgery.axillaside2)
      setotherAxillasx2(surgery.otherAxillasx2)
      setDatesurg(surgery.datesurg)
      setReconstruction(surgery.reconstruction)
      setDaterecon(surgery.daterecon)
      setRecontype(surgery.recontype)
      setOtherrecon(surgery.otherrecon)
      setPatientId(surgery.patientId)
    }
}, [isSuccess, surgery.breastsx,
    surgery.breastside,
    surgery.otherBreastsx,
    surgery.breastsx2,
    surgery.breastside2,
    surgery.otherBreastsx2,
    surgery.axillasx,
    surgery.axillaside,
    surgery.otherAxillasx,surgery.axillasx2,surgery.axillaside2,surgery.otherAxillasx2,
    surgery.datesurg,
    surgery.reconstruction,
    surgery.daterecon,surgery.recontype,surgery.otherrecon,surgery.patientId])

if (isLoadingSurgerys) return <p>Loading...</p>

if (!surgery) {
    return (
        <section>
            <h2>Surgery not found!</h2>
        </section>
    )
}

  const canSave = [breastsx,datesurg].every(Boolean) && !isLoading;

const onSaveSurgClicked = async () => {
  if (canSave) {
      try {
          await updateSurgery({id:surgery.id, breastsx,
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
            setBreastsx('')
            setBreastside('')
            setotherBreastsx('')
            setBreastsx2('')
            setBreastside2('')
            setotherBreastsx2('')
            setAxillasx('')
            setAxillaside('')
            setotherAxillasx('')
            setAxillasx2('')
            setAxillaside2('')
            setotherAxillasx2('')
            setDatesurg('')
            setReconstruction('')
            setDaterecon('')
            setRecontype('')
            setOtherrecon('')
            setPatientId('')
            navigate(`/patient/${patientId}`);
      } catch (err) {
          console.error('Failed to save the post', err)
      }
  }
}

const handleDelete = async () => {
  try {
      await deleteSurgery({ id: surgery?.id }).unwrap()
      setBreastsx('')
      setBreastside('')
      setotherBreastsx('')
      setBreastsx2('')
      setBreastside2('')
      setotherBreastsx2('')
      setAxillasx('')
      setAxillaside('')
      setotherAxillasx('')
      setAxillasx2('')
      setAxillaside2('')
      setotherAxillasx2('')
      setDatesurg('')
      setReconstruction('')
      setDaterecon('')
      setRecontype('')
      setOtherrecon('')
      setPatientId('')
              navigate('/')
  } catch (err) {
      console.error('Failed to delete the pstage', err)
  }
}
 

return (
  <div className="container my-5 flex">
  <Form>
      <FormGroup row>
        <Col sm={6}>
          <h4 > แก้ไขการผ่าตัด  <SurgeryPatient patientId={patientId} /></h4> 
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
        <Col
      sm={{offset: 9, size:3 }}
    >
      <Button color="danger" onClick={() => setShowDeleteModal(true)} style={{marginRight: '10px'}}>
        ลบ
      </Button>
       <DeleteConfirmationModal
        isOpen={showDeleteModal}
        toggle={() => setShowDeleteModal(false)}
        onDelete={handleDelete}
      />
              <Button  onClick={()=>navigate(`/patient/${patientId}`)} style={{marginRight: '10px'}}  >
                  ย้อนกลับ
                  </Button>    
              <Button onClick={onSaveSurgClicked} color='primary' disabled={!canSave}>
                บันทึก
              </Button>
              </Col>
        </FormGroup>
</Form>     
</div>
)
}

export default EditSurgForm