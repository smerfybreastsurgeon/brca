import React, { useEffect, useState } from 'react';

import { FaPlusCircle } from 'react-icons/fa';
import {Modal,ModalHeader,ModalBody,ModalFooter, 
    Input,
    Label,Button,
    Form,FormGroup,Col,Row}  from 'reactstrap';

import { useAddPatientMutation} from './patientsSlice';
import { nanoid } from '@reduxjs/toolkit';
import { useNavigate } from "react-router";
import { format } from 'date-fns';
import CancerHistory from '../../components/CancerHistory';
import UnderlyingDisease from '../../components/UnderlyingDisease';
import { getAgeYear } from '../../utility/getAgeYear';

const initialState={
pid:'',
hn:'',
name:'',
datebirth:'',
datediag:'',
datelast:'',
hospital:'',
status:'',
sex:'',
fmhx:'',
hxcancer:[],
uddisease:[],
gene:'',
othergene:'',
newrefer:'',
othernewrefer:'',
ecog:'',
othercan:'',
otherdis:'',
agedx:0
}

function CreatePatient( {modal,toggle}) {
    const [addPatient, { isLoading }] = useAddPatientMutation()  
    const [data,setData]=useState([])
    const navigate=useNavigate()
    const {pid,hn,name,datebirth,datediag,datelast,hospital,status,sex,fmhx,gene,othergene,ecog,newrefer,othernewrefer}=data
    const [hxcancer,setHxcancer]=useState([])
    const [uddisease,setUddisease]=useState([])
    const [othercan,setOthercan]=useState('') 
    const [otherdis,setOtherdis]=useState('')  
    const [agedx,setAgedx] =useState(0)  
    
    const handleChange = (e) => {
        if (e.target.name === 'datebirth' || e.target.name === 'datediag' || e.target.name === 'datelast') {
          setData({ ...data, [e.target.name]: format(new Date(e.target.value), 'yyyy-MM-dd') });

        } else {
          setData({ ...data, [e.target.name]: e.target.value });
        }
      };
    const handleOtherCanChange=(othercan)=>{
        setOthercan(othercan)
      }
      const handleOtherDisChange=(otherdis)=>{
        setOtherdis(otherdis)
      }
      const handleAgedx=(agedx)=>{
        setAgedx(agedx)
      }
    const handleSelected = (selected) => {
      setHxcancer(selected);
    }; 
    const handleSelecteddis = (selected) => {
      setUddisease(selected);
    }; 
  
    const maxLengthCheck = (e) => {
      if (e.target.value.length > e.target.maxLength) {
        e.target.value = e.target.value.slice(0, e.target.maxLength)
        }else if((e.target.value-e.target.max)>0){
          e.target.value=e.target.max
        }
      }
    const canSave=[pid,hn,name,datebirth,datediag,datelast,hospital,status,sex,ecog].every(Boolean) && !isLoading;
  
    const createPatient = async (event) => {
        event.preventDefault()
        const patient = {
          id: nanoid(),
          ...data,
          hxcancer,
          uddisease,agedx,
          othercan,otherdis
        }
    
        if (canSave) {
          try {
                  
            await addPatient(patient).unwrap()
            setData(initialState)
            setHxcancer([])
            setUddisease([])
            setOthercan('')   
            setOtherdis('')
            setAgedx(0)        
            toggle()
            navigate('/')
          } catch (err) {
            console.error('Failed to save the post', err)
          }
        }
      }
      useEffect(() => {
           if (datebirth && datediag) {
          const age = getAgeYear(datebirth, datediag);
          setAgedx(age);
        } else {
           setAgedx(null); 
        }
      }, [datebirth, datediag]);
      
    return (
        <div>            
            <div style={{marginTop:2,marginRight:0, alignItems:"right", position:"relative", float:"right",whiteSpace:'nowrap'}}>
              <Button color="primary" onClick={toggle} style={{marginBottom:10,fontSize:18}}><FaPlusCircle />  บันทึกผู้ป่วยใหม่ </Button> </div> 
  <Modal isOpen={modal} toggle={toggle} size='xl'  backdrop="static" keyboard={false} >
          <ModalHeader toggle={toggle} className="custom-modal-header">บันทึกผู้ป่วยใหม่</ModalHeader>
              <ModalBody>                
                  <Form   onSubmit={createPatient} >
                    <Row > 
                    <Col md={6}>
                        <FormGroup>
                            <Label className="label">PID</Label>
                            <Input
                            id='pid' name='pid' maxLength = "13" onInput={maxLengthCheck}
                            value={pid} type='number' max='9999999999999'
                            onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className="label">New/Refer</Label>
                            <Input
                            id='newrefer' name='newrefer'
                            value={newrefer} type='select'
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
                              {newrefer === 'other' && (
            <div>
            <Label htmlFor="othernewrefer">ระบุ:</Label>
            <Input
              id="othernewrefer"
              name="othernewrefer"
              type="text"
              value={othernewrefer}
              onChange={handleChange}
            /></div>)}
                        </FormGroup>
                        <FormGroup>
                            <Label className="label">HN</Label>
                            <Input
                            id='hn' name='hn'onInput={maxLengthCheck}maxLength = "9"
                            type='number' max='999999999'
                            value={hn}
                            onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className="label">Name</Label>
                            <Input
                            id='name' name='name'
                            value={name}
                            onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className="label">Sex</Label>
                            <Input
                            id='sex' name='sex'
                            value={sex} type='select'
                            onChange={handleChange}
                            > <option value=' '>
                            {' '}
                        </option>
                        <option value='F'>
                        หญิง
                        </option>
                        <option value='M'>
                        ชาย
                        </option></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label className="label">ECOG: {ecog??ecog}</Label>
                            <Input
                            id='ecog' name='ecog'
                            value={ecog} type='select'
                            onChange={handleChange}
                            > <option value=' '>
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
        <CancerHistory value={hxcancer}  othercan={othercan} onOtherCanChange={handleOtherCanChange} 
        onSelected={handleSelected} />
            </FormGroup>
            <FormGroup>
                       <Label  className="label" >Underlying disease</Label>
        <UnderlyingDisease value={uddisease}  otherdis={otherdis} onOtherDisChange={handleOtherDisChange} 
        onSelected={handleSelecteddis} />
            </FormGroup>                   
                </Col>
                <Col  md={6}>
                        <FormGroup>
                            <Label className="label">Date of birth</Label>
                            <Input  id='datebirth'name='datebirth'  type="date"  value={datebirth}   onChange={handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label className="label">Date First Diag &#40;วันที่ตัดชิ้นเนื้อแรก&#41;</Label>
                            <Input
                            id='datediag' name='datediag'
                            type="date"
                            value={datediag}
                            onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className="label">Age First Diag &#40;อายุเมื่อวินิจฉัย&#41;</Label>
                            <Input
                            id='datediag' name='datediag'
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
                            value={hospital}
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
                            value={fmhx}
                            onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className="label">Gene mutation</Label>
                            <Input
                            id='gene' name='gene'
                            value={gene} type='select'
                            onChange={handleChange}
                            > 
                                <option value=' '>
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
                              {gene === 'other' && (
            <div>
            <Label htmlFor="othergene">ระบุ:</Label>
            <Input
              id="othergene"
              name="othergene"
              type="text"
              value={othergene}
              onChange={handleChange}
            /></div>)}
                        </FormGroup>
                        <FormGroup>
                            <Label className="label">Date last visit</Label>
                            <Input
                            id='datelast'name='datelast'
                            type="date"
                            value={datelast}
                            onChange={handleChange}
                            />
                        </FormGroup> 
                        <FormGroup>
                            <Label className="label">สถานะ</Label>
                            <Input
                            id='status' name='status'
                            type="select"
                            value={status}
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
                    </ModalBody>
                    <ModalFooter> 
                        <Button type='submit' color='primary' disabled={!canSave} onClick={createPatient} >บันทึก</Button>
                        <Button    onClick={()=>{setData(initialState); setHxcancer([]); setOthercan('');toggle()}}>ย้อนกลับ</Button>  
                    </ModalFooter>        
                </Modal>               
            </div>
    );
}

export default CreatePatient;