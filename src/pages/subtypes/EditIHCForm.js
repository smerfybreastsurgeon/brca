import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetSubtypesQuery } from './subtypeSlice';
import SubtypePatient from './SubtypePatient';
import { getSubtype } from '../../utility/getSubtype';
import { useUpdateSubtypeMutation,useDeleteSubtypeMutation } from './subtypeSlice';
import {Form,FormGroup,Label,Col,Button,Input,Modal
} from 'reactstrap'
import { useGetCstagesQuery } from '../cstages/cstagesSlice';
import { getThai } from '../../utility/getThai';

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

const EditIHCForm = () => {
    const { subtypeId } = useParams()
    const navigate = useNavigate()
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [updateSubtype, { isLoading }] = useUpdateSubtypeMutation()
    const [deleteSubtype] = useDeleteSubtypeMutation()

    const { subtype, isLoading: isLoadingSubtypes, isSuccess } = useGetSubtypesQuery('getSubtypes', {
        selectFromResult: ({ data, isLoading, isSuccess }) => ({
            subtype: data?.entities[subtypeId],
            isLoading,
            isSuccess
        }),
    })
    const { data: cstages, isLoading:isLoadingCstage,isSuccess:isSuccessCstage,isError,error } = useGetCstagesQuery('getCstages');
   
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
    const [patientId, setPatientId] = useState('')

    let content;
  if (isLoading) {
      content = <p>"Loading..."</p>;
  } else if (isSuccessCstage) {
      const cstagesentities = cstages?.entities || {};
  const allCstageIds = cstages?.ids || [];
  let filteredCstageIds = allCstageIds;
  

      // Filter by patientId if it is provided in the URL params
      if (subtype?.patientId ) {
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
        return 'seagreen'
      }else if(subtype==='Luminal B negative'){
        return 'yellowgreen'
      }else if(subtype==='Luminal B positive'){
        return 'orangered'
      }else if(subtype==='Triple Negative'){
        return 'hotpink'
      }else if(subtype==='Her2-enriched'){
        return 'red'
      } return ' '
        }
        useEffect(() => {
          const subtype=getSubtype(er,ernum,pgr,pgrnum,her2,fish,ki67,ki67num)
          setStype(subtype);
      }, [er,ernum,pgr,pgrnum,her2,fish,ki67,ki67num]);  

    useEffect(() => {
        if (isSuccess) {
            setDateihcdx(subtype.dateihcdx)
            setCstageId(subtype.cstageId)
            setEr(subtype.er)
            setPgr(subtype.pgr)
           setErnum(subtype.ernum)
            setPgrnum(subtype.pgrnum)
            setHer2(subtype.her2)
            setKi67(subtype.ki67)
            setKi67num(subtype.ki67num)
            setFish(subtype.fish)
            setStype(subtype.stype)
            setPatientId(subtype.patientId)
        }
    }, [isSuccess, subtype?.cstageId,subtype?.er,subtype?.pgr,subtype?.ernum,subtype?.pgrnum,subtype?.her2,subtype?.ki67,subtype?.stype,subtype?.ki67num,subtype?.fish,subtype?.dateihcdx,subtype.patientId])

    if (isLoadingSubtypes) return <p>Loading...</p>

    if (!subtype) {
        return (
            <section>
                <h2>Subtype not found!</h2>
            </section>
        )
    }
    
    const canSave = [er,pgr,her2,ki67num,dateihcdx,patientId].every(Boolean) && !isLoading;

    const onSaveIHCClicked = async () => {
        if (canSave) {
            try {
                await updateSubtype({id:subtype.id,cstageId, er,pgr,ernum,pgrnum,her2,ki67num,ki67,dateihcdx,fish,patientId,stype}).unwrap()
setCstageId('')
                setDateihcdx('')
                setEr('')
                setPgr('')
               setErnum('')
                setPgrnum('')
                setHer2('')
                setKi67('')
                setKi67num('')
                setFish('')
                setStype('')
                setPatientId('')
                navigate(`/patient/${patientId}`);
            } catch (err) {
                console.error('Failed to save the post', err)
            }
        }
    }

    

    const handleDelete = async () => {
        try {
            await deleteSubtype({ id: subtype?.id }).unwrap()
            setDateihcdx('')
            setEr('')
            setPgr('')
           setErnum('')
            setPgrnum('')
            setHer2('')
            setKi67('')
            setKi67num('')
            setFish('')
            setPatientId('')
            setCstageId('')
           
            navigate('/subtype')
        } catch (err) {
            console.error('Failed to delete the pstage', err)
        }
    }
    
    return (
        <div className="container my-5 flex">
    <Form>
    <FormGroup row>
      <h2 sm={12}> แก้ไข ImmunoHistoChemistry  <SubtypePatient patientId={patientId} /></h2> 
      
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
          ) :  (
            <>
              <option value="">{" "}</option>
              {content}
            </>
          )
          }
        </Input>
      </label>
    </FormGroup>
    <FormGroup row>
      <Label 
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
              <option value=' '>
                {" "}
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
  value={ernum||' '}
  onChange={(e)=>{setErnum(e.target.value);ernumCheck(e)}}
/>
</Col>
</FormGroup>
<FormGroup row>
<Label 
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
  <option value=' '>
    {" "}
  </option>
  <option value='positive'>
    positive
  </option>
  <option value='negative'>
   negative
  </option>
 
</Input>
</Col>
<Label 
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
  value={pgrnum||' '}
  onChange={(e)=>{setPgrnum(e.target.value);pgrnumCheck(e)}}
/>
</Col>
</FormGroup>
<FormGroup row>
<Label 
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
><option value=' '>
{' '}
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
<Label
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
{" "}
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
<Label 
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
  value={ki67num||' '}
  onChange={(e)=>setKi67num(e.target.value)}
/>
 
</Col>
<Label 
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
> <option value=' '>
{" "}
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
<Label  sm={2}>Subtype:</Label>   
<Col sm={4}>
<Input
  value={stype||' '}
  type='text' disabled
  style={{borderColor:'#2980b9',color:`${fcolor(stype)}`,fontWeight:'bold'}}
  />
</Col>
<Label 
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
    offset: 8,
    size: 4
  }}
>
  <Label></Label>
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
      <Button onClick={onSaveIHCClicked} style={{marginLeft: '10px'}} disabled={!canSave} color='primary'>
        บันทึก
      </Button>
</Col>
</FormGroup>
</Form>     
</div>
)
}

export default EditIHCForm