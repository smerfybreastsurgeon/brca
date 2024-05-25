import React, { useState,useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Form,FormGroup,Input,Row,Col,Label, } from 'reactstrap';
import CancerHistory from '../../components/CancerHistory';
import { useUpdatePatientMutation,useDeletePatientMutation,useGetPatientsQuery } from './patientsSlice';
import { useNavigate } from "react-router";
import { format } from 'date-fns';
import UnderlyingDisease from '../../components/UnderlyingDisease';
import { getAgeYear } from '../../utility/getAgeYear';

const EditPatient1 = (props) => {

  const [updatePatientMut] = useUpdatePatientMutation()
  const [deletePatient]= useDeletePatientMutation()
  const navigate=useNavigate()
  const { patients, isLoading: isLoadingPatients, isSuccess } = useGetPatientsQuery('getPatients', {
    selectFromResult: ({ data, isLoading, isSuccess }) => ({
        patients: data?.entities[props.item?.id],
        isLoading,
        isSuccess
    }),
  }) 
     
  const [data,setData]=useState('')
  const [hxcancer,setHxcancer]=useState([])
  const [othercan,setOthercan]=useState('')
  const [uddisease,setUddisease]=useState([])
  const [otherdis,setOtherdis]=useState('')
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [agedx,setAgedx]=useState(0)
  useEffect(() => {
    if (patients?.datebirth && patients?.datediag) {
   const age = getAgeYear(patients?.datebirth,patients?.datediag);
   setAgedx(age);
 } else {
    setAgedx(null); 
 }
}, [patients?.datebirth, patients?.datediag]);
 useEffect(() => {
    if (isSuccess){
      setData(patients)
      setHxcancer(patients?.hxcancer)
      setOthercan(patients?.othercan)
      setUddisease(patients?.uddisease)
      setOtherdis(patients?.otherdis)
      setAgedx(getAgeYear(patients?.datebirth,patients?.datediag))
    }},[patients,isSuccess])    
    
    if (isLoadingPatients) return <p>Loading...</p>
  const handleChange = (e) => {
    if (e.target.name === 'datebirth' || e.target.name === 'datediag' || e.target.name === 'datelast') {
      setData({ ...data, [e.target.name]: format(new Date(e.target.value), 'yyyy-MM-dd') });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const toggle = () =>{ setModal(!modal)
    setData(patients)
    setHxcancer(patients?.hxcancer)
    setOthercan(patients?.othercan)
    setUddisease(patients?.uddisease)
    setOtherdis(patients?.otherdis) 
    setAgedx(getAgeYear(patients?.datebirth,patients?.datediag))
  }
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  }
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  }
  const handleOtherCanChange=(othercan)=>{
    setOthercan(othercan)
  }
  const handleAgedx=(agedx)=>{
    setAgedx(agedx)
  }
  const handleSelected = (selected) => {
    setHxcancer(selected);
  }; 
  const handleOtherDisChange=(otherdis)=>{
    setOtherdis(otherdis)
  }
const handleSelecteddis = (selecteddis) => {
  setUddisease(selecteddis);
}; 
  const maxLengthCheck = (e) => {
    if (e.target.value.length > e.target.maxLength) {
     e.target.value = e.target.value.slice(0, e.target.maxLength)
      }else if((e.target.value-e.target.max)>0){
        e.target.value=e.target.max
      }
    }
 
  const editPatient = async (event) => {
    event.preventDefault()
   
   await updatePatientMut({id:props.item.id, ...data,hxcancer,othercan,uddisease,otherdis,agedx} )
   setData([])              
          setHxcancer([])
          setUddisease([])
          setOtherdis('')
          setOthercan('')
          setAgedx(0)
          navigate(`/patient/${props.item.id}`)
    setModal(!modal)

  };  
 
  const handleDelete = async () => {
      try {
          await deletePatient({ id: props.item.id }).unwrap()
          setData([])              
          setHxcancer([])
          setUddisease([])
          setOtherdis('')
          setOthercan('')
          setAgedx(0)
          navigate('/')
      } catch (err) {
          console.error('Failed to delete the pstage', err)

      }
    }    
    
  return (
    <div>
      <Button color="danger" onClick={toggle}>{props.buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={props.className} size='xl'>
        <ModalHeader toggle={toggle} className="custom-modal-header">แก้ไขบันทึก</ModalHeader>
        <ModalBody>
        <Form  onSubmit={editPatient} >
            <Row > 
                    <Col md={6}>
                        <FormGroup>
                            <Label className="label">PID</Label>
                            <Input
                            id='pid' name='pid' maxLength = "13" onInput={maxLengthCheck}
                            value={data?.pid} type='number' max='9999999999999'
                            onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className="label">New/Refer</Label>
                            <Input
                            id='newrefer' name='newrefer'
                            value={data?.newrefer} type='select'
                            onChange={handleChange}
                            > 
                                <option value=' '>
                                {' '}
                                </option>
                                <option value='new'>
                                New case
                                </option>
                                <option value='refer'>
                                Refer
                                </option>                               
                                <option value='other'>
                                Other
                                </option>
                            </Input>
                              {data?.newrefer === 'other' && (
            <div>
            <Label htmlFor="othernewrefer">ระบุ:</Label>
            <Input
              id="othernewrefer"
              name="othernewrefer"
              type="text"
              value={data?.othernewrefer}
              onChange={handleChange}
            /></div>)}
                        </FormGroup>
                        <FormGroup>
                            <Label className="label">HN</Label>
                            <Input
                            id='hn' name='hn'onInput={maxLengthCheck}maxLength = "9"
                            type='number' max='999999999'
                            value={data?.hn}
                            onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className="label">Name</Label>
                            <Input
                            id='name' name='name'
                            value={data?.name}
                            onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className="label">Sex</Label>
                            <Input
                            id='sex' name='sex'
                            value={data?.sex} type='select'
                            onChange={handleChange}
                            > 
                            <option value=' '>
                            {' '}
                            </option>
                            <option value='F'>
                            หญิง
                            </option>
                            <option value='M'>
                            ชาย
                            </option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label className="label">ECOG: {data?.ecog??data?.ecog}</Label>
                            <Input
                            id='ecog' name='ecog'
                            value={data?.ecog} type='select'
                            onChange={handleChange}
                            > 
                            <option value=' '>
                            {' '}
                            </option>
                            <option value='0'>
                            0 สามารถทำกิจกรรมต่าง ๆ ได้ไม่มีขีดจำกัด
                            </option>
                            <option value='1'>
                            1 ไม่สามารถทำกิจกรรมที่ออกแรงมาก แต่สามารถทำกิจวัตรประจำวันได้ เช่น งานบ้าน งานในที่ทำงาน
                            </option>
                            <option value='2'>
                            2 เดินไปมาได้ สามารถดูแลช่วยเหลือตัวเอง แต่ไม่สามารถทำงาน อยู่บนเตียงน้อยกว่าร้อยละ 50 ของเวลาที่ตื่น
                            </option>
                            <option value='3'>
                            3 ดูแลช่วยเหลือตัวเองในขีดจำกัด ต้องอยู่บนเตียงมากกว่าร้อยละ 50 ของเวลาที่ตื่น
                            </option>
                            <option value='4'>
                            4 ไม่สามารถช่วยเหลือตนเองได้เลย อยู่บนเตียงตลอดเวลา
                            </option>
                        </Input>
                        </FormGroup>
                       <FormGroup>
                       <Label  className="label" >Personal History of cancer</Label>
    <CancerHistory defaultCancers={data?.hxcancer} othercan={othercan} onOtherCanChange={handleOtherCanChange} onSelected={handleSelected} />
                       </FormGroup>
                       <FormGroup>
                       <Label  className="label" >Underlying disease</Label>
        <UnderlyingDisease defaultDiseases={data?.uddisease}  otherdis={otherdis} onOtherDisChange={handleOtherDisChange} 
        onSelected={handleSelecteddis} />
            </FormGroup>      
                </Col>
                <Col  md={6}>
                        <FormGroup>
                            <Label className="label">Date of birth</Label>
                            <Input  id='datebirth'name='datebirth'  type="date"  value={data?.datebirth}   onChange={handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label className="label">Date First Diag &#40;วันที่ตัดชิ้นเนื้อแรก&#41;</Label>
                            <Input
                            id='datediag' name='datediag'
                            type="date"
                            value={data?.datediag}
                            onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className="label">Age First Diag &#40;อายุเมื่อวินิจฉัย&#41;</Label>
                            <Input
                            id='agedx' name='agedx'
                            type="number"
                            value={agedx}
                            onChange={handleAgedx}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className="label">Hospital:</Label>
                            <Input
                            id='hospital' name='hospital'
                            type="select"
                            value={data?.hospital}
                            onChange={handleChange}
                            >
                                <option value=' '>
                                    {' '}
                                </option>
                                <option value='NMR'>
                                โรงพยาบาลนมะรักษ์
                                </option>
                                <option value='PTC'>
                                โรงพยาบาลพุทธชินราช
                                </option>
                                <option value='NRS'>
                                โรงพยาบาลมหาราชนครราชสีมา
                                </option>
                                <option value='RAC'>
                                โรงพยาบาลราชบุรี
                                </option>
                                <option value='VCP'>
                                โรงพยาบาลวชิระภูเก็ต
                                </option>
                                <option value='VC'>
                                โรงพยาบาลวชิระ
                                </option>
                                <option value='CU'>
                                โรงพยาบาลจุฬาลงกรณ์
                                </option>
                                <option value='NCI'>
                                สถาบันมะเร็งแห่งชาติ
                                </option>
                                <option value='SURIN'>
                                โรงพยาบาลสุรินทร์
                                </option>
                                <option value='SURANARI'>
                                โรงพยาบาลค่ายสุรนารี
                                </option>
                                <option value='BUMRUNG'>
                                โรงพยาบาลบำรุงราษฎร์
                                </option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label className="label">Family history of cancer</Label>
                            <Input
                            id='fmhx' name='fmhx'
                            value={data?.fmhx}
                            onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className="label">Gene mutation</Label>
                            <Input
                            id='gene' name='gene'
                            value={data?.gene} type='select'
                            onChange={handleChange}
                            > <option value=' '>
                            {' '}
                        </option>
                        <option value='BRCA1'>
                        BRCA1
                        </option>
                        <option value='BRCA2'>
                        BRCA2
                        </option>
                        <option value='TP53'>
                        TP53
                        </option>
                        <option value='PALB2'>
                        PALB2
                        </option>
                        <option value='other'>
                        Other
                        </option>
                    </Input>
          
                    {data?.gene === 'other' && (
                        <div>
                        <Label htmlFor="othergene">ระบุ:</Label>
                        <Input
                        id="othergene"
                        name="othergene"
                        type="text"
                        value={data?.othergene}
                        onChange={handleChange}
                        /></div>)}
                        </FormGroup>
                        <FormGroup>
                            <Label className="label">Date last visit</Label>
                            <Input
                            id='datelast'name='datelast'
                            type="date"
                            value={data?.datelast}
                            onChange={handleChange}
                            />
                        </FormGroup> 
                        <FormGroup>
                            <Label className="label">สถานะ</Label>
                            <Input
                            id='status' name='status'
                            type="select"
                            value={data?.status}
                            onChange={handleChange}
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
                            </Input>
                        </FormGroup>                        
                </Col>
            </Row>
        </Form>
          <br />
        <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
          <ModalHeader>ยืนยันลบข้อมูล</ModalHeader>
          <ModalBody>ท่านต้องการลบข้อมูลของ{data?.name}หรือไม่</ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={()=>{handleDelete();toggleNested()}}>ใช่</Button>{' '}
            <Button color="secondary" onClick={toggleAll}>ไม่</Button>
          </ModalFooter>
        </Modal>
        </ModalBody>
        <ModalFooter>
            <Button color="danger" onClick={toggleNested}>ลบ</Button>{' '}           
            <Button color="secondary" onClick={toggle}>ยกเลิก</Button>{' '}
            <Button color="primary" onClick={editPatient} style={{marginLeft: '10px'}} >บันทึก</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EditPatient1;