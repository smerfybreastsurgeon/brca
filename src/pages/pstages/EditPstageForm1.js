import { useState, useEffect } from 'react'
import {Form,FormGroup,Label,Col,Button,Modal,
    ModalBody,Input,
    ModalFooter,ListGroup,ListGroupItem} from 'reactstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetPstagesQuery } from './pstagesSlice';
import { useUpdatePstageMutation,useDeletePstageMutation } from './pstagesSlice';
import { getPStage } from '../../utility/getPStage';

import PstagePatient from './PstagePatient';

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

const EditPstageForm = () => {
    const { pstageId } = useParams()
    const navigate = useNavigate()
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [updatePstage, { isLoading }] = useUpdatePstageMutation()
    const [deletePstage] = useDeletePstageMutation()

    const { pstage, isLoading: isLoadingPstages, isSuccess } = useGetPstagesQuery('getPstages', {
        selectFromResult: ({ data, isLoading, isSuccess }) => ({
            pstage: data?.entities[pstageId],
            isLoading,
            isSuccess
        }),
    })

    
    const [datereport,setDatereport]=useState('');
    const [datesent,setDatesent]=useState('');
    const [htype,setHtype]=useState('Histological type');
    const [hopen, setHOpen] = useState(false);
    const [selectedh, setSelectedh] = useState(null);
    const [grade,setGrade]=useState('G');
    const [gopen, setGOpen] = useState(false);
    const [selectedg, setSelectedg] = useState(null);
    const [ptstage,setPtStage]=useState('T');
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [pnstage,setPnStage]=useState('N')
    const [slnbnumpos,setSlnbnumpos]=useState(0)
    const [slnbtot,setSlnbtot]=useState(0)
    const [axlnnumpos,setAxlnnumpos]=useState(0)
    const [axlntot,setAxlntot]=useState(0)
    const [nopen, setNOpen] = useState(false);
    const [selectedn, setSelectedn] = useState(null);
    const [mstage,setPmStage]=useState('M')
    const [mopen, setMOpen] = useState(false);
    const [selectedm, setSelectedm] = useState(null);
    const [stage, setStage] = useState('') 
    const [neo,setNeo]=useState('');
    const [ptsize,setPtsize]=useState('');
    const [side,setSide]=useState('');
    const [lvi,setLvi]=useState('')
    const [subtype,setSubtype]=useState('')
    const [patientId, setPatientId] = useState('')
    const symbol = neo === 'y' ? 'y' : '';

   useEffect(() => {
    const newStage = getPStage(ptstage,
      pnstage,
       mstage);
    setStage(newStage);
  }, [ptstage,
      pnstage,
       mstage]);  

    useEffect(() => {
        if (isSuccess&& pstage && pstage.stage) {
            setStage(pstage.stage)
            setDatereport(pstage.datereport)
            setDatesent(pstage.datesent)
            setHtype(pstage.htype)
            setGrade(pstage.grade)
            setPtStage(pstage.ptstage)
            setPtsize(pstage.ptsize)
            setSlnbtot(pstage.slnbtot)
            setSlnbnumpos(pstage.slnbnumpos)
            setAxlnnumpos(pstage.axlnnumpos)
            setAxlntot(pstage.axlntot)
            setPnStage(pstage.pnstage)
            setPmStage(pstage.mstage)
            setNeo(pstage.neo)
            setSide(pstage.side)
            setLvi(pstage.lvi)
            setSubtype(pstage.subtype)
            setPatientId(pstage.patientId)
        }
    }, [isSuccess,pstage, pstage.stage,
        pstage.datereport,
        pstage.datesent,
        pstage.htype,
        pstage.grade,
        pstage.ptstage,
        pstage.ptsize,
        pstage.pnstage,
        pstage.slnbtot,pstage.slnbnumpos,pstage.axlnnumpos,pstage.axlntot,
        pstage.mstage,
        pstage.neo,pstage.lvi,pstage.subtype,
        pstage.side,pstage.patientId])

    if (isLoadingPstages) return <p>Loading...</p>

    if (!pstage) {
        return (
            <section>
                <h2>Pstage not found!</h2>
            </section>
        )
    }
  const toggle = () => setOpen(!open);
  const handleSelect=(event)=>{ setSelected(event.target.innerText.split(' ')[0]);setPtStage(event.target.innerText.split(' ')[0]);toggle()}
  const ntoggle = () => setNOpen(!nopen);
  const handleSelectN=(event)=>{ setSelectedn(event.target.innerText.split(' ')[0]);setPnStage(event.target.innerText.split(' ')[0]);ntoggle()}
  const mtoggle = () => setMOpen(!mopen);
  const gtoggle = () => setGOpen(!gopen);
  const htoggle = () => setHOpen(!hopen);
  const handleSelectM=(event)=>{ setSelectedm(event.target.innerText.split(' ')[0]);setPmStage(event.target.innerText.split(' ')[0]);mtoggle()}
  const handleSelectG=(event)=>{ setSelectedg(event.target.innerText);setGrade(event.target.innerText);gtoggle()}
  const handleSelectH=(event)=>{ setSelectedh(event.target.innerText);setHtype(event.target.innerText);htoggle()}


    const canSave = [pstage,datereport,datesent,htype,grade,ptstage,ptsize, pnstage,mstage,neo,side,patientId].every(Boolean) && !isLoading;

    const onSavePstageClicked = async () => {
        if (canSave) {
            try {
                await updatePstage({id:pstage.id,stage,
                    datereport,
                    datesent,
                    htype,
                    grade,
                    ptstage,
                    ptsize,
                    pnstage,slnbnumpos,slnbtot,axlntot,axlnnumpos,                  
                    mstage,
                    neo,
                    side,lvi,subtype,
                    patientId }).unwrap()

                   setStage('')
                   setDatereport('')
                   setDatesent('')
                   setHtype('')
                   setGrade('')
                   setPtStage('')
                   setPtsize('')
                   setPnStage('')
                   setSlnbtot('')
                  setSlnbnumpos('')
                  setAxlnnumpos('')
                  setAxlntot('')
                   setPmStage('')
                   setNeo('')
                   setSide('')
                   setLvi('')
                   setSubtype('')
                setPatientId('')
                navigate(`/patient/${patientId}`);
             
            } catch (err) {
                console.error('Failed to save the post', err)
            }
        }
    }    

    const handleDelete = async () => {
        try {
            await deletePstage({ id: pstage?.id }).unwrap()
                    setStage('')
                    setDatereport('')
                    setDatesent('')
                    setHtype('')
                    setGrade('')
                    setPtStage('')
                    setPtsize('')
                    setPnStage('')
                    setPmStage('')
                    setNeo('')
                    setSide('')
                    setLvi('')
                    setSubtype('')
                    setPatientId('')
                    navigate('/')
        } catch (err) {
            console.error('Failed to delete the pstage', err)
        }
    }
   
   
       function handleKeyDown(event) {
              if (event.target.value.length >= 3) {
                event.preventDefault();
              }
            }

    return (
        <div className="container my-5">
        <Form>
        <FormGroup row>
      <h2 sm={12}> แก้ไขบันทึก Pathological Staging  <PstagePatient patientId={patientId} /></h2>   
      </FormGroup>
        <FormGroup row>
                            <Label className="label" sm={2}>Date take specimen</Label>
                            <Col sm={4}>
                            <Input
                                id='datesent'
                                type="date"
                                value={datesent}
                                onChange={(e) => {
                                    const date = new Date(e.target.value);
                                    const formattedDate = date.toISOString().slice(0, 10);
                                    setDatesent(formattedDate);
                                }}
                            />
    
                            </Col>
                       
                            <Label className="label" sm={2}>Date report to patient</Label>
                            <Col sm={4}>
                            <Input
                                id='datereport'
                                type="date"
                                value={datereport}
                                onChange={(e) => {
                                    const date = new Date(e.target.value);
                                    const formattedDate = date.toISOString().slice(0, 10);
                                    setDatereport(formattedDate);
                                }}
                            />
    
                            </Col>
                        </FormGroup>  
                        <FormGroup row>
    <Label className="label" for="htype"  sm={2} >
      Histological type
    </Label>
    <Col sm={4}>
      <Button  block onClick={htoggle}
        id="htype"
        name="htype"
        >{htype||'Histological type'}</Button>
    </Col>
    <Label className="label"  for="grade" sm={2}>
      Histology Grade
    </Label>
    <Col sm={4}>
      <Button  block onClick={gtoggle}
        id="grade"
        name="grade"
        >{grade||'G'}</Button>
    </Col>
    </FormGroup>        
    <FormGroup row>
    <Label className="label"
      for="ptsize"
      sm={2}
    >
      Tumor size&#40;mm&#41;
    </Label>
    <Col sm={4}>
      <Input  
        id="ptsize"
        name="ptsize" value={ptsize} onChange={e=>setPtsize(e.target.value)}
        type='number' onKeyDown={handleKeyDown}
        />
    </Col>
    <Label className="label"  for="ptstage"  sm={2}>
      Primary Tumor
    </Label>
    <Col sm={4}>
      <Button  block onClick={toggle}
        id="ptstage"
        name="ptstage"
        >{ptstage||'T'}</Button>
    </Col>
    </FormGroup>        
    <FormGroup row>
    <Label className="label"  for="slnbnumpos"  sm={2}>
      Sentinel Nodes positive
    </Label>
    <Col sm={1}>
      <Input 
        id="slnbnumpos"
        name="slnbnumpos" value={slnbnumpos} onChange={(e)=>setSlnbnumpos(e.target.value)}
        type='number'onKeyDown={handleKeyDown}
        />
    </Col>
    
    <Label className="label"
      for="slnbtot"
      sm={2}
    >
      Total Sentinel Nodes 
    </Label>
    <Col sm={1}>
      <Input 
        id="slnbtot"
        name="slnbtot" value={slnbtot} onChange={(e)=>setSlnbtot(e.target.value)}
        type='number'onKeyDown={handleKeyDown}
        />
    </Col>
    
    <Label className="label"
      for="pnstage"
      sm={2}
    >
      Regional lymph Nodes 
    </Label>
    <Col sm={4}>
      <Button block onClick={ntoggle}
        id="pnstage"
        name="pnstage"
      >{pnstage||'N'}</Button>
    </Col>
    </FormGroup>
    <FormGroup row>
    <Label className="label"
      for="axlnnumpos"
      sm={2}
    >
      Axillary Nodes positive
    </Label>
    <Col sm={1}>
      <Input 
        id="axlnnumpos" onChange={(e)=>setAxlnnumpos(e.target.value)}
        name="axlnnumpos" value={axlnnumpos}
        type='number'onKeyDown={handleKeyDown}
        />
    </Col>
    
    <Label className="label" 
      for="axlntot" 
      sm={2}>
      Total Axillary Nodes 
    </Label>
    <Col sm={1}>
      <Input 
        id="axlntot" value={axlntot}
        name="axlntot" onChange={(e)=>setAxlntot(e.target.value)}
        type='number'onKeyDown={handleKeyDown}
        />
    </Col>
    <Label className="label"
      for="mstage"
      sm={2}
    >  Distant metastasis
    </Label>
    <Col sm={4}>
      <Button block onClick={mtoggle}
        id="mstage"
        name="mstage"
      >{mstage||'M'}</Button>
    </Col>
    </FormGroup> 
    <FormGroup row>
    <Label className="label"
      for="side"
      sm={2}
    >
      Side
    </Label>
    <Col sm={1}>
      <Input 
        id="side"
        name="side"
        type='select' value={side} onChange={e=>setSide(e.target.value)}
        >
        <option>
      {' '}
    </option>
    <option value='R'>
      right
    </option>
    <option value='L'>
      left
    </option>
    
    </Input>
    </Col>
    
    <Label className="label"
      for="postneo"
      sm={2}
    >
      Post Systemic Rx
    </Label>
    <Col sm={1}>
      <Input 
        id="neo"
        name="neo" 
        type='select' onChange={e=>setNeo(e.target.value)}
        placeholder='Postneo ' value={neo}
      >
        <option value=''>{' '}</option>
        <option value='n'>No</option>
        <option value='y'>Yes</option>
    </Input>
    </Col>
    <Label className="label" sm={2}>Pathological Stage:</Label>   
    <Col sm={4}>
    <Input
      value={getPStage(ptstage,pnstage,mstage)||' '}
      type='text' disabled readOnly
      style={{borderColor:'#2980b9',color:'blue',fontWeight:'bold',textAlign:'center'}}
      />
    </Col>
    </FormGroup> 
    <FormGroup row >
    <Label className="label" sm={2}>Subtype :</Label>   
      <Col sm={4}>
      <Input
        value={subtype||' '} name='subtype'
        type='select' onChange={e=>setSubtype(e.target.value)}
        style={{borderColor:'#2980b9',color:'blue',fontWeight:'bold',textAlign:'center'}}
        >
           <option>
             {' '}
          </option>
          <option value='Luminal A'>
          Luminal A
          </option>
          <option value='Luminal B negative'>
          Luminal B negative
          </option>
          <option value='Luminal B positive'>
          Luminal B positive
          </option>
          <option value='Triple Negative'>
          Triple Negative
          </option>
          <option value='Her2-enriched'>
          Her2-enriched
          </option>
        </Input>
      </Col>
      
    <Label className="label" sm={2}>Summary details:</Label>   
    <Col sm={4}>
    <Input
      value={`Stage ${stage}:${symbol}${ptstage} ${symbol}${pnstage} ${mstage}`}
      type='text' disabled readOnly
      style={{borderColor:'#2980b9',color:'blue',fontWeight:'bold',textAlign:'center'}}
      />
    </Col>
    <Col
      sm={{offset: 3, size:3 }}
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
      <Button onClick={onSavePstageClicked} style={{marginLeft: '10px'}} disabled={!canSave} color='primary
      '>
        บันทึก
      </Button>
    </Col>
    </FormGroup>
    <Modal  isOpen={hopen} toggle={htoggle} fullscreen>
        <ModalBody>
        <ListGroup>
            <Label style={{fontSize:24}} className="text-center bg-primary  text-white">Histological type</Label>
            <ListGroupItem active={selectedh === 'Ductal Carcinoma in Situ'} onClick={handleSelectH}>
    <b>Ductal Carcinoma in Situ</b> 
    </ListGroupItem>
    <ListGroupItem active={selectedh === 'Lobular Carcinoma in Situ'} onClick={handleSelectH}>
    <b>Lobular Carcinoma in Situ</b> 
    </ListGroupItem>
    <ListGroupItem active={selectedh === 'Invasive ductal carcinoma of no special type'} onClick={handleSelectH}>
    <b>Invasive ductal carcinoma of no special type</b> 
    </ListGroupItem>
    <ListGroupItem active={selectedh === 'Tubular carcinoma'} onClick={handleSelectH}>
    <b>Tubular carcinoma</b> 
    </ListGroupItem>
    <ListGroupItem active={selectedh === 'Invasive lobular carcinoma'} onClick={handleSelectH}>
    <b>Invasive lobular carcinoma</b> 
    </ListGroupItem>
    <ListGroupItem active={selectedh === 'Invasive cribriform carcinoma'} onClick={handleSelectH}>
    <b>Invasive cribriform carcinoma</b> 
    </ListGroupItem>
    <ListGroupItem active={selectedh === 'Mucinous carcinoma'} onClick={handleSelectH}>
    <b>Mucinous carcinoma</b> 
    </ListGroupItem>
    <ListGroupItem active={selectedh === 'Medullary carcinoma '} onClick={handleSelectH}>
    <b>Medullary carcinoma </b> 
    </ListGroupItem>
    <ListGroupItem active={selectedh === 'Invasive papillary carcinoma'} onClick={handleSelectH}>
    <b>Invasive papillary carcinoma</b> 
    </ListGroupItem>
    <ListGroupItem active={selectedh === 'Invasive micropapillary carcinoma'} onClick={handleSelectH}>
    <b>Invasive micropapillary carcinoma</b> 
    </ListGroupItem>
    <ListGroupItem active={selectedh === 'Apocrine carcinoma'} onClick={handleSelectH}>
    <b>Apocrine carcinoma</b> 
    </ListGroupItem>
    <ListGroupItem active={selectedh === 'Neuroendocrine carcinoma'} onClick={handleSelectH}>
    <b>Neuroendocrine carcinoma</b> 
    </ListGroupItem>
    <ListGroupItem active={selectedh === 'Adenoid cystic carcinoma'} onClick={handleSelectH}>
    <b>Adenoid cystic carcinoma</b> 
    </ListGroupItem>
    <ListGroupItem active={selectedh === 'Metaplastic carcinoma'} onClick={handleSelectH}>
    <b>Metaplastic carcinoma</b> 
    </ListGroupItem>
    </ListGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={htoggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <Modal  isOpen={gopen} toggle={gtoggle} fullscreen>
        <ModalBody>
        <ListGroup>
            <Label style={{fontSize:24}} className="text-center bg-primary  text-white">Histology Grade</Label>
    <ListGroupItem active={selectedg === 'Grade1'} onClick={handleSelectG}>
    <b>Grade1</b> 
    </ListGroupItem>
    <ListGroupItem active={selectedg === 'Grade2'} onClick={handleSelectG}>
    <b>Grade2</b> 
    </ListGroupItem>
    <ListGroupItem active={selectedg === 'Grade3'} onClick={handleSelectG}>
    <b>Grade3</b> 
    </ListGroupItem>
    </ListGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={gtoggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    
    <Modal  isOpen={open} toggle={toggle} fullscreen>
        <ModalBody>
        <ListGroup>
            <Label style={{fontSize:24}} className="text-center bg-primary  text-white">Tumor size&#40;mm&#41;</Label>
    <ListGroupItem active={selected === 'pTis (DCIS)'} onClick={handleSelect}>
    <b>pTis&#40;DCIS&#41;</b> Ductal carcinoma in situ
    </ListGroupItem>
    <ListGroupItem active={selected === 'pT1'} onClick={handleSelect}>
    <b>pT1</b> Tumor &ge;1 mm but &le; 20 mm. in greatest dimension
    </ListGroupItem>
    <ListGroupItem active={selected === 'pT1mi'} onClick={handleSelect}>
    <b>pT1mi</b> Tumor &le;1 mm  in greatest dimension
    </ListGroupItem>
    <ListGroupItem active={selected === 'pT1a'} onClick={handleSelect}>
    <b>pT1a</b> Tumor &gt;1 mm but &le; 5 mm. in greatest dimension
    </ListGroupItem>
    <ListGroupItem active={selected === 'pT1b'} onClick={handleSelect}>
    <b>pT1b</b> Tumor &gt;5 mm but &le; 10 mm. in greatest dimension
    </ListGroupItem>
    <ListGroupItem active={selected === 'pT1c'} onClick={handleSelect}>
    <b>pT1c</b> Tumor &gt;10 mm but &le; 20 mm. in greatest dimension
    </ListGroupItem>
    <ListGroupItem active={selected === 'pT2'} onClick={handleSelect}>
    <b>pT2</b> Tumor &gt;20 mm but &le; 50 mm. in greatest dimension
    </ListGroupItem>
    <ListGroupItem active={selected === 'pT3'} onClick={handleSelect}>
    <b>pT3</b> Tumor &gt;50 mm  in greatest dimension
    </ListGroupItem>
    <ListGroupItem active={selected === 'pT4'} onClick={handleSelect}>
    <b>pT4</b> Tumor of any size with direct extension to the chest wall and/or to the skin &#40;ulceration or macroscopic nodules&#41;;invasion of the dermis alone does not qualify as T4
    </ListGroupItem>
    <ListGroupItem active={selected === 'pT4a'} onClick={handleSelect}>
    <b>pT4a</b> Extension to the chest wall&#40;invasion or adherence to pectoralis muscle in the abscence of invasion of chest wall structures does not qualified as T4&#41;
    </ListGroupItem>
    <ListGroupItem active={selected === 'pT4b'} onClick={handleSelect}>
    <b>pT4b</b> Ulceration and/or ipsilateral macroscopic satellite nodules and/or edema  &#40;including peau d'orange&#41;of the skin that does not meet the criteria of inflammatory carcinoma
    </ListGroupItem>
    <ListGroupItem active={selected === 'pT4c'} onClick={handleSelect}>
    <b>pT4c</b> Both T4a and T4b are present
    </ListGroupItem>
    <ListGroupItem active={selected === 'pT4d'} onClick={handleSelect}>
    <b>pT4d</b> Inflammatory carcinoma
    </ListGroupItem>
    </ListGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <Modal  isOpen={nopen} toggle={ntoggle} fullscreen>
        <ModalBody>
        <ListGroup>
            <Label style={{fontSize:24}} className="text-center bg-primary  text-white">Regional Nodes Metastasis</Label>
    <ListGroupItem active={selectedn === 'pN0'} onClick={handleSelectN}>
    <b>pN0</b> No regional lymph node metastasis identified or ITCs only
    </ListGroupItem>
    <ListGroupItem active={selectedn === 'pN1'} onClick={handleSelectN}>
    <b>pN1</b> Metastasis in 1-3 axillary lymph node(s)
    </ListGroupItem>
    <ListGroupItem active={selectedn === 'pN1mi'} onClick={handleSelectN}>
    <b>pN1mi</b> Micrometastasis&#40;approximately 200 cells,larger than 0.2 mm,but none larger than 2.0 mm&#41;
    </ListGroupItem>
    <ListGroupItem active={selectedn === 'pN1a'} onClick={handleSelectN}>
    <b>pN1a</b> Metastasis in 1-3 axillary lymph nodes,at least one metastasis larger than 2.0 mm
    </ListGroupItem>
    <ListGroupItem active={selectedn === 'pN1b'} onClick={handleSelectN}>
    <b>pN1b</b> Metastasis in ipsilateral internal mammary sentinel nodes,excluding ITCs
    </ListGroupItem>
    <ListGroupItem active={selectedn === 'pN1c'} onClick={handleSelectN}>
    <b>pN1c</b> pN1a and pN1b combined
    </ListGroupItem>
    <ListGroupItem active={selectedn === 'pN2'} onClick={handleSelectN}>
    <b>pN2</b> Metastasis in 4-9 axillary lymph nodes 
    </ListGroupItem>
    <ListGroupItem active={selectedn === 'pN2a'} onClick={handleSelectN}>
    <b>pN2a</b> Metastasis in 4-9 axillary lymph nodes &#40;at least one tumor deposit larger than 2.0 mm&#41;
    </ListGroupItem>
    <ListGroupItem active={selectedn === 'pN2b'} onClick={handleSelectN}>
    <b>pN2b</b> Metastases in clinically detected  internal mammary lymph nodes with or without microscopic confirmation; with pathological negative of axillary node metastases
    </ListGroupItem>
    <ListGroupItem active={selectedn === 'pN3'} onClick={handleSelectN}>
    <b>pN3</b> Metastasis in 10 or more axillary lymph nodes 
    </ListGroupItem>
    <ListGroupItem active={selectedn === 'pN3a'} onClick={handleSelectN}>
    <b>pN3a</b> Metastasis in 10 or more axillary lymph nodes&#40;at least one tumor deposit larger than 2.0 mm&#41;or metastasis to the infraclavicular&#40;Level III axillary lymph&#41;nodes
    </ListGroupItem>
    <ListGroupItem active={selectedn === 'pN3b'} onClick={handleSelectN}>
    <b>pN3b</b> pN1a or pN2a in the presence of cN2b&#40;positive internal mammary nodes by imaging&#41;; or pN2a in the presence of pN1b
    </ListGroupItem>
    <ListGroupItem active={selectedn === 'pN3c'} onClick={handleSelectN}>
    <b>pN3c</b> Metastases in ipsilateral supraclavicular lymph node(s)
    </ListGroupItem>
    
    </ListGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={ntoggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <Modal  isOpen={mopen} toggle={mtoggle} fullscreen>
        <ModalBody>
        <ListGroup>
            <Label style={{fontSize:24}} className="text-center bg-primary  text-white">Distant Metastasis</Label>
    <ListGroupItem active={selectedm === 'M0'} onClick={handleSelectM}>
    <b>M0</b> No clinical or radiographic evidence of distant metastases
    </ListGroupItem>
    <ListGroupItem active={selectedm === 'pM1'} onClick={handleSelectM}>
    <b>pM1</b> Distant metastases detected by clinical and radiographic means
    </ListGroupItem>
    </ListGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={mtoggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      </Form>
    </div>
    )
    }

export default EditPstageForm