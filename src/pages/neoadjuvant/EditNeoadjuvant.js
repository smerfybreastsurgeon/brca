import React,{useState,useEffect} from 'react'
import {Form,FormGroup,Label,Col,Button,
  Input} from 'reactstrap'
import { useGetNeoadjuvantsQuery,
  useUpdateNeoadjuvantMutation,
  useDeleteNeoadjuvantMutation} from "./neoadjuvantSlice";
import NeoadjuvantPatient from './NeoadjuvantPatient';
import { useNavigate, useParams } from "react-router-dom";
import TypeadjuvantForm from '../../components/TypeadjuvantForm';
import { confirmAlert } from 'react-confirm-alert';

const EditNeoadjuvant = () => {
  
  const { neoadjuvantId } = useParams()
  const navigate = useNavigate()

  const [updateNeoadjuvant, { isLoading }] = useUpdateNeoadjuvantMutation()
  const [deleteNeoadjuvant] = useDeleteNeoadjuvantMutation()

  const { neoadjuvant, isLoading: isLoadingNeoadjuvants, isSuccess } = useGetNeoadjuvantsQuery('getNeoadjuvants', {
      selectFromResult: ({ data, isLoading, isSuccess }) => ({
          neoadjuvant: data?.entities[neoadjuvantId],
          isLoading,
          isSuccess
      }),
  })    
    
      const [neo,setNeo]=useState('')
      const [datestartneo,setDatestartneo]=useState('')
      const [dateendneo,setDateendneo]=useState('')
      const [typeofneoadjuvant,setTypeofneoadjuvant]=useState('')
      const [othertypeofneoadjuvant,setOthertypeofneoadjuvant]=useState('')
      const [adj,setAdj]=useState('')
      const [typeofadjuvant,setTypeofadjuvant]=useState([])
      const [othertypeofadjuvant,setOthertypeofadjuvant]=useState('')      
      const [adjuvantchemo,setAdjuvantchemo]=useState('')
      const [adjchemostartdate,setAdjchemostartdate]=useState('')
      const [adjchemoenddate,setAdjchemoenddate]=useState('')
      const [adjuvantradiation,setAdjuvantradiation]=useState('')
      const [adjradiationstartdate,setAdjradiationstartdate]=useState('')
      const [adjradiationenddate,setAdjradiationenddate]=useState('')
      const [typeofadjuvantchemo,setTypeofadjuvantchemo]=useState('')
      const [othertypeofadjuvantchemo,setOthertypeofadjuvantchemo]=useState('')
      const [adjuvantHer2,setAdjuvantHer2]=useState('')
      const [typeadjuvantHer2,setTypeAdjuvantHer2]=useState('')
      const [othertypeofadjuvantHer2,setOthertypeofadjuvantHer2]=useState('')
      const [adjHer2startdate,setAdjHer2startdate]=useState('')
      const [adjHer2enddate,setAdjHer2enddate]=useState('')
      const [adjhormone,setAdjhormone]=useState('')
      const [adjhormonestart,setAdjhormonestart]=useState('') 
      const [adjhormoneend,setAdjhormoneend]=useState('')
      const [othertypeofadjhormone,setOthertypeofadjhormone]=useState('')
      const [typeofadjhormone,setTypeofadjhormone]=useState('') 

      const [patientId, setPatientId] = useState('')
      useEffect(() => {
        if (isSuccess) {
          setNeo(neoadjuvant.neo)
          setDatestartneo(neoadjuvant.datestartneo)
          setDateendneo(neoadjuvant.dateendneo)
          setTypeofneoadjuvant(neoadjuvant.typeofneoadjuvant)
          setOthertypeofneoadjuvant(neoadjuvant.othertypeofneoadjuvant)
          setAdj(neoadjuvant.adj)
          setTypeofadjuvant(neoadjuvant.typeofadjuvant)
          setOthertypeofadjuvant(neoadjuvant.othertypeofadjuvant)
          setAdjuvantchemo(neoadjuvant.adjuvantchemo)
          setAdjchemostartdate(neoadjuvant.adjchemostartdate)
          setAdjchemoenddate(neoadjuvant.adjchemoenddate)
          setAdjuvantradiation(neoadjuvant.adjuvantradiation)
          setAdjradiationstartdate(neoadjuvant.adjradiationstartdate)
          setAdjradiationenddate(neoadjuvant.adjradiationenddate)
          setTypeofadjuvantchemo(neoadjuvant.typeofadjuvantchemo)
          setOthertypeofadjuvantchemo(neoadjuvant.othertypeofadjuvantchemo)
          setAdjuvantHer2(neoadjuvant.adjuvantHer2)
          setTypeAdjuvantHer2(neoadjuvant.typeAdjuvantHer2)
          setOthertypeofadjuvantHer2(neoadjuvant.othertypeofadjuvantHer2)
          setAdjHer2startdate(neoadjuvant.adjHer2startdate)
          setAdjHer2enddate(neoadjuvant.adjHer2enddate)
          setAdjhormone(neoadjuvant.adjhormone)
          setAdjhormonestart(neoadjuvant.adjhormonestart)
          setAdjhormoneend(neoadjuvant.adjhormoneend)
          setOthertypeofadjhormone(neoadjuvant.othertypeofadjhormone)
          setTypeofadjhormone(neoadjuvant.typeofadjhormone) 
          setPatientId(neoadjuvant.patientId)
                
        }
    }, [isSuccess,neoadjuvant?.neo,
      neoadjuvant?.datestartneo,
      neoadjuvant?.dateendneo,
      neoadjuvant?.typeofneoadjuvant,
      neoadjuvant?.othertypeofneoadjuvant,
      neoadjuvant?.adj,
      neoadjuvant?.typeofadjuvant,
      neoadjuvant?.othertypeofadjuvant,
      neoadjuvant?.adjuvantchemo,
      neoadjuvant?.adjchemostartdate,
      neoadjuvant?.adjchemoenddate,
      neoadjuvant?.adjuvantradiation,
      neoadjuvant?.adjradiationstartdate,
      neoadjuvant?.adjradiationenddate,
      neoadjuvant?.typeofadjuvantchemo,
      neoadjuvant?.othertypeofadjuvantchemo,
      neoadjuvant?.adjuvantHer2,
      neoadjuvant?.typeAdjuvantHer2,
      neoadjuvant?.othertypeofadjuvantHer2,
      neoadjuvant?.adjHer2startdate,
      neoadjuvant?.adjHer2enddate,
      neoadjuvant?.adjhormone,
      neoadjuvant?.adjhormonestart,
      neoadjuvant?.adjhormoneend,
      neoadjuvant?.othertypeofadjhormone,
      neoadjuvant?.typeofadjhormone,
      neoadjuvant?.patientId])

    if (isLoadingNeoadjuvants) return <p>Loading...</p>
    if (!neoadjuvant) {
        return (
            <section>
                <h2>Neoadjuvant not found!</h2>
            </section>
        )
    }
    const handleSelected = (selectedNeoadjuvants) => {
      setTypeofadjuvant(selectedNeoadjuvants);
    };
      const handleOnOthertypeofadjuvantChange=(othertypeofadjuvant)=>{
        setOthertypeofadjuvant(othertypeofadjuvant)
      } 
    
      const canSave =  !isLoading;
    
    const onSaveNeoadjuvantClicked = async () => {
      if (canSave) {
          try {
              await updateNeoadjuvant({id:neoadjuvant.id, neo,datestartneo, dateendneo,typeofneoadjuvant,othertypeofneoadjuvant,
                adj,typeofadjuvant, othertypeofadjuvant,adjuvantradiation,adjradiationstartdate,adjradiationenddate,
                adjuvantchemo,adjchemostartdate, adjchemoenddate,typeofadjuvantchemo,othertypeofadjuvantchemo,
                adjuvantHer2,typeadjuvantHer2,adjHer2startdate,adjHer2enddate,othertypeofadjuvantHer2,
                adjhormone,adjhormonestart,adjhormoneend,typeofadjhormone,othertypeofadjhormone,patientId
                 }).unwrap() 
              setNeo('')
              setDatestartneo('')
              setDateendneo('')
              setTypeofneoadjuvant('')
              setOthertypeofneoadjuvant('')
              setAdj('')
              setTypeofadjuvant([])
              setOthertypeofadjuvant('')
              setAdjuvantchemo('')
              setAdjchemostartdate('')
              setAdjchemoenddate('')
              setTypeofadjuvantchemo('')
              setOthertypeofadjuvantchemo('')
              setAdjuvantHer2('')
              setTypeAdjuvantHer2('')
              setOthertypeofadjuvantHer2('')
              setAdjHer2startdate('')
              setAdjHer2enddate('')
              setAdjhormone('')
              setAdjhormonestart('')
              setAdjhormoneend('')
              setOthertypeofadjhormone('')
              setTypeofadjhormone('') 
              setPatientId('')            
              navigate(`/${patientId}`)
          } catch (err) {
              console.error('Failed to save the post', err)
          }
      }
    }
    
    const showDeleteConfirmation = () => {
      confirmAlert({
        title: 'ยืนยันลบข้อมูล',
        message: 'คุณต้องการลบข้อมูลนี้หรือ?',
        buttons: [
          { 
            label: 'ใช่',
            onClick: async () => {
              try {
                await deleteNeoadjuvant({ id: neoadjuvant?.id }).unwrap();
                setNeo('')
              setDatestartneo('')
              setDateendneo('')
              setTypeofneoadjuvant('')
              setOthertypeofneoadjuvant('')
              setAdj('')
              setTypeofadjuvant([])
              setOthertypeofadjuvant('')
              setAdjuvantchemo('')
              setAdjchemostartdate('')
              setAdjchemoenddate('')
              setAdjuvantradiation('')
              setAdjradiationstartdate('')
              setAdjradiationenddate('')
              setTypeofadjuvantchemo('')
              setOthertypeofadjuvantchemo('')
              setAdjuvantHer2('')
              setTypeAdjuvantHer2('')
              setOthertypeofadjuvantHer2('')
              setAdjHer2startdate('')
              setAdjHer2enddate('')
              setAdjhormone('')
              setAdjhormonestart('')
              setAdjhormoneend('')
              setOthertypeofadjhormone('')
              setTypeofadjhormone('') 
              setPatientId('')     
                navigate(`/patient/${patientId}`);
              
              } catch (err) {
                console.error('Failed to delete the cstage', err);
              }
            },
            style: { backgroundColor: 'red' },
          },
          {
            label: 'ไม่',
            onClick: () => {},
          },
        ],
      });
    };
    return (
      <div className="container my-5 flex">
      <Form>
      <FormGroup row>
            <Col sm={6}>
              <h4 > แก้ไขบันทึกการรักษาเสริม  <NeoadjuvantPatient patientId={patientId} /></h4> 
            </Col>
      </FormGroup>
      <FormGroup row>        
            <Label style={{borderColor:'#2980b9',color:'blue'}}
              for="neoadjuvant"
              sm={2}
            >
             neoadjuvant treatment
            </Label>
            <Col sm={4}>
            <Input
                id='adj'
                type="select"
                value={adj}
                onChange={(e) => {                    
                  setAdj(e.target.value);
                }}> 
                      <option value=''>
                      {''}
                      </option>
                      <option value='0'>
                        No
                      </option>
                      <option value='1'>
                        yes
                      </option>
            </Input></Col>
            <Label style={{borderColor:'#2980b9',color:'blue'}}
          for="typeofadjuvant"
          sm={2}
        >
            Type of neoadjuvant
        </Label>
        <Col sm={4}>
             <TypeadjuvantForm defaultTypeofadjuvant={neoadjuvant.typeofadjuvant} othertypeofadjuvant={neoadjuvant.othertypeofadjuvant} onOthertypeofadjuvantChange={handleOnOthertypeofadjuvantChange}  onSelected={handleSelected} />
        </Col>
            
</FormGroup>
<FormGroup row>
<Label style={{borderColor:'#2980b9',color:'blue'}}
          for="adjuvantchemo"
          sm={2}
        >
          adjuvant radiationtherapy:
        </Label>
          <Col sm={4}>
            <Input
                id='adjuvantradiation'
                type="select"
                value={adjuvantradiation}
                onChange={(e) => {                    
                  setAdjuvantradiation(e.target.value);
                }}> 
                      <option value=''>
                      {''}
                      </option>
                      <option value='0'>
                        No

                      </option>
                      <option value='1'>
                        yes
                      </option>
            </Input>
            </Col>
</FormGroup>
<FormGroup row>
            <Label className="label"
                    for="adjradiationstartdate"
                    sm={2}
                  >
                     Date start adjuvant Radiotherapy :
            </Label>
                <Col sm={4}>
                <Input
                id='datestartradiation'
                name='adjradiationstartdate'
                type="date"
                value={adjradiationstartdate}
                onChange={(e) => {                    
                  setAdjradiationstartdate(e.target.value);
                }}
                />
                </Col>  
            <Label className="label"
                    for="adjradiationenddate"
                    sm={2}
                  >
                     Date last adjuvant Radiotherapy :
            </Label>
                <Col sm={4}>
                <Input
                id='adjradiationenddate'
                name="adjradiationenddate"
                type="date"
                value={adjradiationenddate}
                onChange={(e) => {                    
                  setAdjradiationenddate(e.target.value);
                }}
                />
                </Col> 
                
</FormGroup>
<FormGroup row> 
  <Label style={{borderColor:'#2980b9',color:'blue'}}
          for="neoadjuvant"
          sm={2}
        >
             neoadjuvant chemotherapy:
        </Label>
        <Col sm={4}>
        <Input 
                id='neo'
                type="select"
                value={neo}
                onChange={(e) => {                    
                  setNeo(e.target.value);
                }}> 
                      <option value=''>
                      {''}
                      </option>
                      <option value='0'>
                        No
                      </option>
                      <option value='1'>
                        yes
                      </option>
            </Input></Col>
            <Label className="label"
                  for="typeofneoadjuvant"
                  sm={2}
                  >
                  สูตรเคมีบำบัดนำก่อนผ่าตัด Neoadjuvant Chemotherapy :
          </Label>
          <Col sm={4}>
                  <Input
                  id="typeofneoadjuvant"style={{borderColor:'#2980b9'}}
                  name="typeofneoadjuvant"
                  type="select"
                  value={typeofneoadjuvant}
                  onChange={(e)=>setTypeofneoadjuvant(e.target.value)}
                  >
                      <option value=''>
                      {''}
                      </option>
                      <option value='0'>
                      ACx4q3wks&#8594;weekly paclitaxel x12
                      </option>
                      <option value='1'>
                      ACx4q3wks&#8594;paclitaxel q 3wks
                      </option>
                      <option value='2'>
                      ACx4dd&#8594;weekly paclitaxel x12
                      </option>
                      <option value='3'>
                      dd ACx4&#8594;dd paclitaxel q 2 wks x4
                      </option>
                      <option value='4'>
                      ACx4
                      </option>
                      <option value='5'>
                      TCx4
                      </option>
                      <option value='6'>
                      CMFx6
                      </option>
                      <option value='7'>
                      FACx6
                      </option>
                      <option value='8'>
                      Capecitabine
                      </option>
                      <option value='9'>
                      Other
                      </option>
                  </Input>            
                  {typeofneoadjuvant === '9' && (
                  <div>
                  <Label htmlFor="othertypeofneoadjuvant">ระบุสูตรเคมีบำบัดอื่น:</Label>
                  <Input
                    id="othertypeofneoadjuvant"
                    name="othertypeofneoadjuvant"
                    type="text"
                    value={othertypeofneoadjuvant}
                    onChange={e => setOthertypeofneoadjuvant(e.target.value)}
                  />
                  </div>
                  )}
          </Col>            
            </FormGroup>
            <FormGroup row>
            <Label className="label"
                    for="datestartneo"
                    sm={2}
                  >
                     Date start neoadjuvant Chemotherapy :
            </Label>
                <Col sm={4}>
                <Input
                id='datestartneo'
                type="date"
                value={datestartneo}
                onChange={(e) => {                    
                  setDatestartneo(e.target.value);
                }}
                />
                </Col>  
            <Label className="label"
                    for="dateendneo"
                    sm={2}
                  >
                     Date last neoadjuvant Chemotherapy :
            </Label>
                <Col sm={4}>
                <Input
                id='dateendneo'
                type="date"
                value={dateendneo}
                onChange={(e) => {                    
                  setDateendneo(e.target.value);
                }}
                />
                </Col>  
</FormGroup>
<FormGroup row>
<Label style={{borderColor:'#2980b9',color:'blue'}}
          for="adjuvantchemo"
          sm={2}
        >
          adjuvant chemotherapy:
        </Label>
          <Col sm={4}>
            <Input
                id='adjuvantchemo'
                type="select"
                value={adjuvantchemo}
                onChange={(e) => {                    
                  setAdjuvantchemo(e.target.value);
                }}> 
                      <option value=''>
                      {''}
                      </option>
                      <option value='0'>
                        No

                      </option>
                      <option value='1'>
                        yes
                      </option>
            </Input>
            </Col>
          <Label className="label"
            for="typeofadjadjuvant"
            sm={2}
            >
            สูตรเคมีบำบัดหลังผ่าตัด adjuvant Chemotherapy :
            </Label>
            <Col sm={4}>
                  <Input
                  id="typeofadjuvantchemo"style={{borderColor:'#2980b9'}}
                  name="typeofadjuvantchemo"
                  type="select"
                  value={typeofadjuvantchemo}
                  onChange={(e)=>setTypeofadjuvantchemo(e.target.value)}
                  >
                      <option value=''>
                      {''}
                      </option>
                      <option value='0'>
                      ACx4q3wks&#8594;paclitaxel q 3wks
                      </option>
                      <option value='1'>
                      ACx4dd&#8594;weekly paclitaxel x12
                      </option>
                      <option value='2'>
                      dd ACx4&#8594;dd paclitaxel x4
                      </option>
                      <option value='3'>
                      ACx4
                      </option>
                      <option value='4'>
                      TCx4
                      </option>
                      <option value='5'>
                      CMFx6
                      </option>
                      <option value='6'>
                      FACx6
                      </option>
                      <option value='7'>
                      Capecitabine
                      </option>
                      <option value='8'>
                      Other
                      </option>
                  </Input>             
                  {typeofadjuvantchemo === '8' && (
                  <div>
                  <Label htmlFor="othertypeofadjuvantchemo">ระบุสูตรเคมีบำบัดอื่น:</Label>
                  <Input
                    id="othertypeofadjuvantchemo"
                    name="othertypeofadjuvantchemo"
                    type="text"
                    value={othertypeofadjuvantchemo}
                    onChange={e => setOthertypeofadjuvantchemo(e.target.value)}
                  />
                  </div>
    )}
            </Col>            
  </FormGroup>
  <FormGroup row>
            <Label className="label"
                    for="adjchemostartdate"
                    sm={2}
                  >
                     Date start adjuvant Chemotherapy :
            </Label>
                <Col sm={4}>
                <Input
                id='adjchemostartdate'
                type="date"
                value={adjchemostartdate}
                onChange={(e) => {                    
                  setAdjchemostartdate(e.target.value);
                }}
                />
                </Col>  
            <Label className="label"
                    for="dateendneo"
                    sm={2}
                  >
                     Date last adjuvant Chemotherapy :
            </Label>
                <Col sm={4}>
                <Input
                id='adjchemoenddate'
                type="date"
                value={adjchemoenddate}
                onChange={(e) => {                    
                  setAdjchemoenddate(e.target.value);
                }}
                />
                </Col>  
</FormGroup>
  <FormGroup row> 
  <Label style={{borderColor:'#2980b9',color:'blue'}}
          for="adjuvantchemo"
          sm={2}
        >
          adjuvant antiHer2:
        </Label>
  <Col sm={4}>
            <Input
                id='adjuvantHer2'
                type="select"
                value={adjuvantHer2}
                onChange={(e) => {                    
                  setAdjuvantHer2(e.target.value);
                }}> 
                      <option value=''>
                      {''}
                      </option>
                      <option value='0'>
                        No

                      </option>
                      <option value='1'>
                        yes
                      </option>
            </Input>
            </Col>
          <Label className="label"
            for="typeadjuvantHer2"
            sm={2}
            >
            ยาพุ่งเป้าหลังผ่าตัด adjuvant antiHer2 :
            </Label>
            <Col sm={4}>
                  <Input
                  id="typeadjuvantHer2"style={{borderColor:'#2980b9'}}
                  name="typeadjuvantHer2"
                  type="select"
                  value={typeadjuvantHer2}
                  onChange={(e)=>setTypeAdjuvantHer2(e.target.value)}
                  >
                      <option value=''>
                      {''}
                      </option>
                      <option value='0'>
                      Trastuzumab
                      </option>
                      <option value='1'>
                      Pertuzumab
                      </option>                      
                      <option value='2'>
                      Other
                      </option>
                  </Input>                  
                  
                  {typeadjuvantHer2 === '2' && (
                  <div>
                  <Label htmlFor="othertypeofadjuvantHer2">ระบุยาอื่น:</Label>
                  <Input
                    id="othertypeofadjuvantHer2"
                    name="othertypeofadjuvantHer2"
                    type="text"
                    value={othertypeofadjuvantHer2}
                    onChange={e => setOthertypeofadjuvantHer2(e.target.value)}
                  />
                  </div>
    )}
            </Col>        
            </FormGroup>
            <FormGroup row>
            <Label className="label"
                    for="adjHer2startdate"
                    sm={2}
                  >
                     Date start adjuvant antiHer2 :
            </Label>
                <Col sm={4}>
                <Input
                id='adjHer2startdate'
                type="date"
                value={adjHer2startdate}
                onChange={(e) => {                    
                  setAdjHer2startdate(e.target.value);
                }}
                />
                </Col>  
            <Label className="label"
                    for="adjHer2enddate"
                    sm={2}
                  >
                     Date last adjuvant antiHer2 :
            </Label>
                <Col sm={4}>
                <Input
                id='adjHer2enddate'
                type="date"
                value={adjHer2enddate}
                onChange={(e) => {                    
                  setAdjHer2enddate(e.target.value);
                }}
                />
                </Col>  
</FormGroup>
<FormGroup row> 
<Label style={{borderColor:'#2980b9',color:'blue'}}
          for="adjuvantchemo"
          sm={2}
        >
          adjuvant antiHormonal:
        </Label>
  <Col sm={4}>
            <Input
                id='adjhormone'
                type="select"
                value={adjhormone}
                onChange={(e) => {                    
                  setAdjhormone(e.target.value);
                }}> 
                      <option value=''>
                      {''}
                      </option>
                      <option value='0'>
                        No

                      </option>
                      <option value='1'>
                        yes
                      </option>
            </Input>
            </Col>
          <Label className="label"
            for="typeofadjhormone"
            sm={2}
            >
            ยาต้านฮอร์โมน adjuvant antiHormonal :
            </Label>
            <Col sm={4}>
                  <Input
                  id="typeofadjhormone"style={{borderColor:'#2980b9'}}
                  name="typeofadjhormone"
                  type="select"
                  value={typeofadjhormone}
                  onChange={(e)=>setTypeofadjhormone(e.target.value)}
                  >
                      <option value=''>
                      {''}
                      </option>
                      <option value='0'>
                      Tamoxifen
                      </option>
                      <option value='1'>
                      Letrozole
                      </option> 
                      <option value='2'>
                      Anastrozole
                      </option>                        
                      <option value='3'>
                      Other
                      </option>
                  </Input>                  
                  
                  {typeofadjhormone === '2' && (
                  <div>
                  <Label htmlFor="othertypeofadjhormone">ระบุยาอื่น:</Label>
                  <Input
                    id="othertypeofadjhormone"
                    name="othertypeofadjhormone"
                    type="text"
                    value={othertypeofadjhormone}
                    onChange={e => setOthertypeofadjhormone(e.target.value)}
                  />
                  </div>
    )}
            </Col>        
            </FormGroup>
            <FormGroup row>
            <Label className="label"
                    for="adjhormonestart"
                    sm={2}
                  >
                     Date start adjuvant antiHormonal :
            </Label>
                <Col sm={4}>
                <Input
                id='adjhormonestart'
                type="date"
                value={adjhormonestart}
                onChange={(e) => {                    
                  setAdjhormonestart(e.target.value);
                }}
                />
                </Col>  
            <Label className="label"
                    for="adjhormoneend"
                    sm={2}
                  >
                     Date last adjuvant Hormonal :
            </Label>
                <Col sm={4}>
                <Input
                id='adjhormoneend'
                type="date"
                value={adjhormoneend}
                onChange={(e) => {                    
                  setAdjhormoneend(e.target.value);
                }}
                />
                </Col>  
</FormGroup>
            <FormGroup row>
            <Col
            sm={{
              offset: 9,
              size: 3
            }}
            >
            <Button  onClick={()=>navigate(`/patient/${patientId}`)} style={{marginRight: '10px'}}  >
                ย้อนกลับ
                </Button>
                <Button className="deleteButton" onClick={showDeleteConfirmation} style={{marginRight: '10px'}}>ลบ</Button>    
            <Button onClick={onSaveNeoadjuvantClicked} disabled={!canSave} color='primary'>
              บันทึก
            </Button>
            </Col>
            </FormGroup>
    </Form>     
    </div>
    )
    }
    

export default EditNeoadjuvant