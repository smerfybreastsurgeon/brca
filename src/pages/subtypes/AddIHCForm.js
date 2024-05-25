import React,{useState,useEffect} from 'react'
import {Form,FormGroup,Label,Col,Button,Input,
   } from 'reactstrap'
import { getSubtype } from '../../utility/getSubtype';
import { useAddNewSubtypeMutation } from "./subtypeSlice";
import SubtypePatient from './SubtypePatient';
import { useNavigate } from "react-router-dom";
import { useGetCstagesQuery } from '../cstages/cstagesSlice'; 
import {getThai} from '../../utility/getThai'



const AddIHCForm = () => {
    const [addNewSubtype, { isLoading }] = useAddNewSubtypeMutation()    
    const urlParams = new URLSearchParams(window.location.search);
    const patientId = urlParams.get('patientId');
    const navigate = useNavigate()
    
  const { data: cstages, isLoading:isLoadingCstage,isSuccess,isError,error } = useGetCstagesQuery('getCstages');
 
    
  let content;
  if (isLoading) {
      content = <p>"Loading..."</p>;
  } else if (isSuccess) {
      const cstagesentities = cstages?.entities || {};
  const allCstageIds = cstages?.ids || [];
  let filteredCstageIds = allCstageIds;

      // Filter by patientId if it is provided in the URL params
      if (patientId ) {
          filteredCstageIds = allCstageIds?.filter(cstageId => {
              const cstage = cstagesentities[cstageId];
              return cstage && cstage?.patientId === patientId ;
          });
      }           
      content = filteredCstageIds?.map((cstageId) => {
        const cstage = cstagesentities[cstageId];      
        return (
          <option key={cstageId} value={cstageId}>
            {`cstageId:${cstageId} - Biopsy date: ${getThai(cstage.datecdx)}`}
          </option>
        );
      });
  } else if (isError) {
      content = <p>{error}</p>;
  }   
  const [cstageId,setCstageId]=useState('');
    const [er,setEr]=useState('');
    const [pgr,setPgr]=useState('')
    const [ernum,setErnum]=useState(0);
    const [pgrnum,setPgrnum]=useState(0)
    const [her2,setHer2]=useState('')
    const [ki67,setKi67]=useState('')
    const [ki67num,setKi67num]=useState(0)
    const [fish,setFish]=useState('')
    const [stype,setStype]=useState('')
    const [dateihcdx,setDateihcdx]=useState('')
     

  const canSave = [er,pgr,ernum,pgrnum,her2,dateihcdx].every(Boolean) && !isLoading;
  

  const onSaveIHCClicked = async () => {
    if (canSave) {
        try {
            await addNewSubtype({ er,pgr,ernum,pgrnum,stype,her2,ki67,ki67num,fish,patientId,dateihcdx,cstageId }).unwrap()
            setDateihcdx('')
            setEr('')
            setPgr('')
           setErnum('')
            setPgrnum('')
            setStype('')
            setHer2('')
            setKi67('')
            setKi67num('')
            setFish('')
            navigate(`/patient/${patientId}`);
        } catch (err) {
            console.error('Failed to save the post', err)
        }
    }
}

const maxLengthCheck = (e) => {
    if (e.target.value.length > e.target.maxLength) {
     e.target.value = e.target.value.slice(0, e.target.maxLength)
      }else if((e.target.value-e.target.max)>0){
        e.target.value=e.target.max
      }
    }
const erCheck = (e)=>{
  if (e.target.value=== 'negative') {
    setErnum(0)
     }
}
const ernumCheck = (e)=>{
  if (e.target.value=== '0') {
    setEr('negative')
     }else if(e.target.value>0){
      setEr('positive')
     }
}
const pgrCheck = (e)=>{
  if (e.target.value=== 'negative') {
    setPgrnum(0)
     }
}
const pgrnumCheck = (e)=>{
  if (e.target.value=== '0') {
    setPgr('negative')
     }else if(e.target.value>0){
      setPgr('positive')
     }
}
const fcolor=(subtype)=>{
  if(subtype==='Luminal A'){
    return '#1a53ff'
  }else if(subtype==='Luminal B negative'){
    return '#00cc66'
  }else if(subtype==='Luminal B positive'){
    return '#ff4000'
  }else if(subtype==='Triple Negative'){
    return '#ff00bf'
  }else if(subtype==='Her2-enriched'){
    return '#ff0000'
  } return ' '
    }


useEffect(() => {
    const subtype=getSubtype(er,ernum,pgr,pgrnum,her2,fish,ki67,ki67num)
    setStype(subtype);
}, [er,ernum,pgr,pgrnum,her2,fish,ki67,ki67num]);  

 
  return (
    <div className="container my-5 flex">
    <Form>
    <FormGroup row>
      <h2 sm={12}> เพิ่มบันทึก ImmunoHistoChemistry  <SubtypePatient patientId={patientId} /></h2>   
    </FormGroup>
    <FormGroup row>
    <label>
        Select cstageId:
        <Input id="cstageId" style={{borderColor:'#2980b9'}}
          name="cstageId"
          type="select"
          value={cstageId}
          onChange={(e)=>setCstageId(e.target.value)}>
          {isLoadingCstage ? (
            <option>Loading Cstages...</option>
          ) :(
            <>
              <option value="">{" "}</option>
              {content}
            </>
          )}
        </Input>
      </label>
    </FormGroup>
    <FormGroup row>
      <Label className="label"
        for="er"
        sm={2}
      >
        Estrogen Receptor
      </Label>
      <Col sm={4}>
        <Input 
          id="er" style={{borderColor:'#2980b9'}}
          name="er"
          type="select"
          value={er}
          onChange={(e)=>{setEr(e.target.value);erCheck(e)}}
        >
              <option value=''>
                {""}
              </option>
              <option value='positive'>
                positive
              </option>
              <option value='negative'>
              negative
              </option>
 
        </Input>
      </Col>
      <Label className="label"
          for="ernum"
          sm={2}
        >
 % Estrogen Receptor
</Label>
<Col sm={4}>
<Input
  id="ernum" style={{borderColor:'#2980b9'}}
  name="ernum"
  type="number" 
  min='0'
  max='100'
  maxLength = "3" onInput={(e)=>maxLengthCheck(e)}
  value={ernum||''}
  onChange={(e)=>{setErnum(e.target.value);ernumCheck(e)}}
/>
</Col>
</FormGroup>
<FormGroup row>
<Label className="label"
  for="pgr"
  sm={2}
>
  Progesterone Receptor
</Label>
<Col sm={4}>
<Input
  id="pgr"style={{borderColor:'#2980b9'}}
  name="pgr"
  type="select"
  value={pgr}
  onChange={(e)=>{setPgr(e.target.value);pgrCheck(e)}}
>
  <option value=''>
    {""}
  </option>
  <option value='positive'>
    positive
  </option>
  <option value='negative'>
   negative
  </option>
 
</Input>
</Col>
<Label className="label"
  for="pgrnum"
  sm={2}
>
  % Progesterone Receptor
</Label>
<Col sm={4}>
<Input
  id="pgrnum"style={{borderColor:'#2980b9'}}
  name="pgrnum"
  type="number"
  min='0'
  max='100'
  maxLength = "3" onInput={(e)=>maxLengthCheck(e)}
  value={pgrnum||''}
  onChange={(e)=>{setPgrnum(e.target.value);pgrnumCheck(e)}}
/>
</Col>
</FormGroup>
<FormGroup row>
<Label className="label"
  for="her2"
  sm={2}
>
  Her2 Receptor
</Label>
<Col sm={4}>
<Input
  id="her2"style={{borderColor:'#2980b9'}}
  name="her2"
  type="select"
  value={her2}
  onChange={(e)=>setHer2(e.target.value)}
>
  <option value=''>
{''}
</option>
  <option value='0'>
    0
  </option>
  <option value='1+'>
   1+
  </option>
  <option value='2+'>
   2+
  </option>
  <option value='3+'>
   3+
  </option>
 
</Input>
</Col>
<Label className="label"
  for="fish"
  sm={2}
>
  FISH/DISH
</Label>
<Col sm={4}>
 <Input
  id="fish"style={{borderColor:'#2980b9'}}
  name="fish"
  type="select"
  value={fish}
  onChange={(e)=>setFish(e.target.value)}
 
> <option>
{""}
</option>
<option value='not done'>
   not done
  </option>
  <option value='positive'>
    positive
  </option>
  <option value='negative'>
   negative
  </option>     
</Input>
</Col>
</FormGroup>
<FormGroup row>
<Label className="label"
  for="ki67num"
  sm={2}
>
 % Ki67
</Label>
<Col sm={4}>
<Input
  id="ki67num"style={{borderColor:'#2980b9'}}
  name="ki67num"
  type="number"
  min='0'
  max='100'
  maxLength = "3" onInput={(e)=>maxLengthCheck(e)}
  value={ki67num||''}
  onChange={(e)=>setKi67num(e.target.value)}
/>
 
</Col>
<Label className="label"
  for="ki67"
  sm={2}
>
  Ki67
</Label>
<Col sm={4}>
 <Input
  id="ki67" style={{borderColor:'#2980b9'}}
  name="ki67"
  type="select"
  value={ki67}
  onChange={(e)=>setKi67(e.target.value)}
> <option value=''>
{""}
</option>
  <option value='positive'>
    positive
  </option>
  <option value='negative'>
   negative
  </option>     
</Input>
</Col>
</FormGroup>
<FormGroup row
> 
<Label className="label" sm={2}>Subtype:</Label>   
<Col sm={4}>
<Input
  value={stype||''}
  type='text' disabled
  style={{borderColor:'#2980b9',color:`${fcolor(stype)}`,fontWeight:'bold'}}
  />
</Col>

    <Label className="label"
      for="dateihcdx"
      sm={2}
    >
      Date IHC Diagnosis
    </Label>
    <Col sm={4}>
    <Input
    id='dateihcdx'
    type="date"
    value={dateihcdx}
    onChange={(e) => {
        
        setDateihcdx(e.target.value);
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
  <Button color='primary' onClick={onSaveIHCClicked} disabled={!canSave}>
    บันทึก
  </Button>
</Col>
</FormGroup>
</Form>     
</div>
)
}


export default AddIHCForm