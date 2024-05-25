import TimeAgo from "./TimeAgo";

import { Link, useParams } from 'react-router-dom';

import { useGetPatientsQuery } from "./patientsSlice";
import { getThai } from "../../utility/getThai";
import { getAge } from "../../utility/getAge";
import { getHospital } from "../../utility/getHospital";
import EditPatient1 from "./EditPatient1";
import { useEffect, useState } from "react";
import { Badge, Button, Col, Label, Row } from "reactstrap";
import { ImPlus } from "react-icons/im";

import { ImPencil } from "react-icons/im"

import { useGetCstagesByPatientIdQuery } from "../cstages/cstagesSlice"; 
import { useGetPstagesByPatientIdQuery } from "../pstages/pstagesSlice"; 
import { useGetSubtypesByPatientIdQuery } from "../subtypes/subtypeSlice";
import { useGetSurgerysByPatientIdQuery } from "../surgery/surgerySlice";
import { useGetNeoadjuvantsByPatientIdQuery } from "../neoadjuvant/neoadjuvantSlice"; 
import { useGetRecursByPatientIdQuery } from "../recurrent/recurSlice";


const SinglePatientPage1 = () => {
  const now=new Date()
    const { patientId } = useParams()
    const [editModal, setEditModal] = useState(false);
    const { patient, isLoading } = useGetPatientsQuery('getPatients', {
        selectFromResult: ({ data, isLoading }) => ({
            patient: data?.entities[patientId],
            isLoading
        }),
    })
    
const {data:cstage,isLoading:isLoadingCstage,refetch: refetchCstage}=useGetCstagesByPatientIdQuery(patientId)
let count=0
for (let id of cstage?.ids?? []) {
  const object = cstage?.entities[id];  
  if (object.patientId === patientId) {   
    count++;
  }
}

useEffect(() => {
  refetchCstage();
}, [patientId, refetchCstage]);

const {data:pstage,isLoading:isLoadingPstage,refetch: refetchPstage}=useGetPstagesByPatientIdQuery(patientId)
let countp=0
for (let id of pstage?.ids?? []) {
  const object = pstage?.entities[id];  
  if (object.patientId === patientId) {   
    countp++;
  }
}
useEffect(() => {
  refetchPstage();
}, [patientId, refetchPstage]);

const {data:subtype,isLoading:isLoadingSubtype,refetch: refetchSubtype}=useGetSubtypesByPatientIdQuery(patientId)
let counti=0
for (let id of subtype?.ids?? []) {
  const object = subtype?.entities[id];  
  if (object.patientId === patientId) {   
    counti++;
  }
}
useEffect(() => {
  refetchSubtype();
}, [patientId, refetchSubtype]);

const {data:surgery,isLoading:isLoadingSurgery,refetch: refetchSurgery}=useGetSurgerysByPatientIdQuery(patientId)
let counts=0
for (let id of surgery?.ids?? []) {
  const object = surgery?.entities[id];  
  if (object.patientId === patientId) {   
    counts++;
  }
}
useEffect(() => {
  refetchSurgery();
}, [patientId, refetchSurgery]);
const {data:neoadjuvant,isLoading:isLoadingNeoadjuvant,refetch: refetchNeoadjuvant}=useGetNeoadjuvantsByPatientIdQuery(patientId)
let countneo=0
for (let id of neoadjuvant?.ids?? []) {
  const object = neoadjuvant?.entities[id];  
  if (object.patientId === patientId) {   
    countneo++;
  }
}

useEffect(() => {
  refetchNeoadjuvant();
}, [patientId, refetchNeoadjuvant]);


const {data:recur,isLoading:isLoadingRecur,refetch: refetchRecur}=useGetRecursByPatientIdQuery(patientId)
let countrecur=0
for (let id of recur?.ids?? []) {
  const object = recur?.entities[id];  
  if (object.patientId === patientId) {   
    countrecur++;
  }
}
useEffect(() => {
  refetchRecur();
}, [patientId, refetchRecur]);

    if (isLoading) return <p>Loading...</p>
    if (isLoadingCstage) return <p>Loading Cstage...</p>
    if (isLoadingPstage) return <p>Loading Pstage...</p>
    if (isLoadingSubtype) return <p>Loading SSubtype...</p>
    if (isLoadingSurgery) return <p>Loading Surgery...</p>
    if (isLoadingNeoadjuvant) return <p>Loading Neoadjuvant...</p>
    if (isLoadingRecur) return <p>Loading Recur...</p>


    if (!patient) {
        return (
            <section>
                <h2>Patient not found!</h2>
            </section>
        )
    }
    if (!cstage) {
      return (
          <section>
              <h2>Cstage not found!</h2>
          </section>
      )
  }
  if (!pstage) {
    return (
        <section>
            <h2>Pstage not found!</h2>
        </section>
    )
}
if (!subtype) {
  return (
      <section>
          <h2>Pstage not found!</h2>
      </section>
  )
}

if (!surgery) {
  return (
      <section>
          <h2>Surgery not found!</h2>
      </section>
  )
}
if (!neoadjuvant) {
  return (
      <section>
          <h2>Neoadjuvant not found!</h2>
      </section>
  )
}
if (!recur) {
  return (
      <section>
          <h2>recur not found!</h2>
      </section>
  )
}
const etoggle=()=>{
        setEditModal(!editModal)
      }
      
    return (
        <article>
          <Row>
            <Col xs="6" >
            <Row  ><Col ><Label style={{color:'red',fontWeight:'bold'}}>วันที่วินิจฉัยครั้งแรก :</Label></Col><Col style={{alignItems: 'flex-start'}}>{getThai(patient.datediag)}</Col></Row>
            <Row  ><Col ><Label style={{color:'red',fontWeight:'bold'}}>วันเกิด :</Label></Col><Col style={{alignItems: 'flex-start'}}>{getThai(patient.datebirth)}</Col></Row>
            <Row  ><Col ><Label style={{color:'red',fontWeight:'bold'}}>ชื่อ :</Label></Col><Col style={{alignItems: 'flex-start'}}>{patient.name}</Col></Row>
            <Row  ><Col ><Label style={{color:'red',fontWeight:'bold'}}>อายุแรกวินิจฉัย:</Label></Col><Col style={{alignItems: 'flex-start'}}>{getAge(patient.datebirth,patient.datediag)}</Col></Row>
            <Row  ><Col ><Label style={{color:'red',fontWeight:'bold'}}>อายุปัจจุบัน:</Label></Col><Col style={{alignItems: 'flex-start'}}>{(patient.status === 'AliveFree' || patient.status === 'AliveCancer') ? getAge(patient.datebirth,now) : getAge(patient.datebirth,patient.datelast)}</Col></Row>
            <Row  ><Col ><Label style={{color:'red',fontWeight:'bold'}}>ระยะเวลารอดชีพ:</Label></Col><Col style={{alignItems: 'flex-start'}}>{getAge(patient.datediag,patient.datelast)}</Col></Row>
            <Row  ><Col ><Label style={{color:'red',fontWeight:'bold'}}>ติดต่อครั้งล่าสุด:</Label></Col><Col style={{alignItems: 'flex-start'}}>{getThai(patient.datelast)}</Col></Row>
            <Row  ><Col ><Label style={{color:'red',fontWeight:'bold'}}>สถานะการรอดชีพ:</Label></Col><Col style={{alignItems: 'flex-start'}}>{patient.status}</Col></Row>
            <Row   className="excerpt"><Col ><Label style={{color:'red',fontWeight:'bold'}}>โรงพยาบาล: </Label></Col><Col style={{alignItems: 'flex-start'}}>{getHospital(patient.hospital)}</Col></Row> 
            <Row  className="postCredit">
                <EditPatient1 buttonLabel="แก้ไข"modal={editModal}  item={patient} toggle={etoggle}/>
                <TimeAgo timestamp={patient.date} />
            </Row>
           
            </Col>
           
            <Col xs="6">
          <div style={{display: 'flex',justifyContent:'center'}}>
          <ul>
                <li style={{ margin: "10px" }}> 
                <div style={{ display: "flex", flexDirection: "row",alignItems: "center"}}>
                <Badge color="info" style={{ marginRight: "3px" }}>{count||'0'}</Badge>{'  '}
                  <Button tag={Link} to={`/cstage/${patientId}`} color="warning" style={{ flexGrow: 1 ,textAlign: "left"}} disabled={!count}>
                  <ImPencil />{'  '}
                    Clinical Staging
                  </Button>
                  <div style={{ display: "flex", flexDirection: "row",alignItems: "center"}}>
                  <Button tag={Link} to={`/cstage/search/?patientId=${patientId}`} color="primary"style={{ flexGrow: 1,textAlign: "center",marginLeft: "3px" }}>
                  <ImPlus />{'  '}
                  </Button>
                  </div> </div>
                  
                </li>
                <li style={{ margin: "10px" }}>
                <div style={{ display: "flex", flexDirection: "row",alignItems: "center"}}>
                <Badge color="info" style={{ marginRight: "3px" }}>{countp||'0'}</Badge>{'  '}
                  <Button tag={Link} to={`/pstage/${patientId}`} color="warning" style={{ flexGrow: 1,textAlign: "left" }} disabled={!countp}>
                  <ImPencil />{'  '}
                    Pathological Staging
                  </Button>
                  <div style={{ display: "flex", flexDirection: "row",alignItems: "center"}}>
                   <Button tag={Link} to={`/pstage/search/?patientId=${patientId}`} color="primary"style={{ flexGrow: 1,textAlign: "center",marginLeft: "3px" }}>
                  <ImPlus />{'  '}
                   </Button></div> </div>
                </li>
                <li style={{ margin: "10px" }}>
                <div style={{ display: "flex", flexDirection: "row",alignItems: "center"}}>
                    <Badge color="info" style={{ marginRight: "3px" }}>{counti||'0'}</Badge>{'  '}
                      <Button tag={Link} to={`/subtype/${patientId}`} color="warning" style={{ flexGrow: 1,textAlign: "left" }} disabled={!counti}>
                      <ImPencil />{'  '}
                        ImmunoHistochemistry
                      </Button>
                      <div style={{ display: "flex", flexDirection: "row",alignItems: "center"}}>
                     <Button tag={Link} to={`/subtype/search/?patientId=${patientId}`} color="primary"style={{ flexGrow: 1,textAlign: "center",marginLeft: "3px" }} disabled={!count}>
                      <ImPlus />{'  '}                        
                      </Button></div> </div>
                </li>
                <li style={{ margin: "10px" }}>
                <div style={{ display: "flex", flexDirection: "row",alignItems: "center"}}>
                    <Badge color="info" style={{ marginRight: "3px" }}>{counts||'0'}</Badge>{'  '}
                      <Button tag={Link} to={`/surgery/${patientId}`} color="warning" style={{ flexGrow: 1 ,textAlign: "left"}} disabled={!counts}>
                      <ImPencil />{'  '}
                        การผ่าตัด
                      </Button>
                      <div style={{ display: "flex", flexDirection: "row",alignItems: "center"}}>
                           <Button tag={Link} to={`/surgery/search/?patientId=${patientId}`} color="primary"style={{ flexGrow: 1,textAlign: "center",marginLeft: "3px" }}>
                      <ImPlus />{'  '}                       
                      </Button></div></div> 
                </li>
                <li style={{ margin: "10px" }}>
                <div style={{ display: "flex", flexDirection: "row",alignItems: "center"}}>
                    <Badge color="info" style={{ marginRight: "3px" }}>{countneo||'0'}</Badge>{'  '}
                      <Button tag={Link} to={`/neoadjuvant/${patientId}`} color="warning" style={{ flexGrow: 1,textAlign: "left" }} disabled={!countneo}>
                      <ImPencil />{'  '}
                        การรักษาเสริม
                      </Button>
                      <div style={{ display: "flex", flexDirection: "row",alignItems: "center"}}>
                          <Button tag={Link} to={`/neoadjuvant/search/?patientId=${patientId}`} color="primary"style={{ flexGrow: 1,textAlign: "center",marginLeft: "3px"  }}>
                      <ImPlus />{'  '}                        
                      </Button></div> </div>
                </li>
                <li style={{ margin: "10px" }}>
                <div style={{ display: "flex", flexDirection: "row",alignItems: "center"}}>
                    <Badge color="info" style={{ marginRight: "3px" }}>{countrecur||'0'}</Badge>{'  '}
                      <Button tag={Link} to={`/recur/${patientId}`} color="warning" style={{ flexGrow: 1 ,textAlign: "left"}} disabled={!countrecur}>
                      <ImPencil />{'  '}
                        การกลับเป็นซ้ำ
                      </Button>
                      <div style={{ display: "flex", flexDirection: "row",alignItems: "center"}}>                    
                      <Button tag={Link} to={`/recur/search/?patientId=${patientId}`} color="primary" style={{ flexGrow: 1,textAlign: "center",marginLeft: "3px" }}>
                      <ImPlus />{'  '}                       
                      </Button></div> </div>
                </li>
                <li style={{ margin: "10px" }}>
                <div style={{ display: "flex", flexDirection: "row",alignItems: "center"}}>
                    
                      <Button tag={Link} to={`/recur/${patientId}`} color="success" style={{ flexGrow: 1 ,textAlign: "left"}} disabled={!count&&!counti}>
                      <ImPencil />{'  '}
                        Recommendation by clinical 
                      </Button></div>
                </li>
          </ul>
                </div>
            </Col>
            
            </Row>
        </article>
    )
}

export default SinglePatientPage1