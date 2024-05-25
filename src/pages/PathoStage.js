import React,{useState,useEffect} from 'react'
import {Form,FormGroup,Label,Col,Button,Modal,
    ModalBody,Input,
    ModalFooter,ListGroup,ListGroupItem} from 'reactstrap'
import { getPStage } from '../utility/getPStage'

const PathoStage = () => {
    const [datereport,setDatereport]=useState(' ');
    const [datesent,setDatesent]=useState(' ');
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
    const [nopen, setNOpen] = useState(false);
    const [selectedn, setSelectedn] = useState(null);
    const [mstage,setPmStage]=useState('M')
    const [mopen, setMOpen] = useState(false);
    const [selectedm, setSelectedm] = useState(null);

  const toggle = () => setOpen(!open);
  const handleSelect=(event)=>{ setSelected(event.target.innerText.split(' ')[0]);}
  const ntoggle = () => setNOpen(!nopen);
  const handleSelectN=(event)=>{ setSelectedn(event.target.innerText.split(' ')[0]);}
  const mtoggle = () => setMOpen(!mopen);
  const gtoggle = () => setGOpen(!gopen);
  const htoggle = () => setHOpen(!hopen);
  const handleSelectM=(event)=>{ setSelectedm(event.target.innerText.split(' ')[0]);}
  const handleSelectG=(event)=>{ setSelectedg(event.target.innerText);}
  const handleSelectH=(event)=>{ setSelectedh(event.target.innerText);}

  useEffect(()=>{
    return ()=>{setHtype(selectedh)
      setHOpen(!hopen) }
    
  },[selectedh,hopen])   
  useEffect(()=>{
    return ()=>{setGrade(selectedg)
        setGOpen(!gopen)}
    
  },[selectedg,gopen])
  useEffect(()=>{
    return ()=>{setPtStage(selected)
        setOpen(!open)}
    
  },[selected,open])
  useEffect(()=>{
    return ()=>{setPnStage(selectedn)
        setNOpen(!nopen)}
    
  },[selectedn,nopen])
  useEffect(()=>{
    return ()=>{setPmStage(selectedm)
        setMOpen(!mopen)}
    
  },[selectedm,mopen])

    return (
    <div className="container my-5">
        <Form>
        <FormGroup row>
                            <Label className="label" sm={2}>Date take specimen</Label>
                            <Col sm={4}>
                            <Input
                            id='datesent'
                            type="date"
                            value={datesent}
                            onChange={(e)=>setDatesent(e.target.value)}
                            />
                            </Col>
                       
                            <Label className="label" sm={2}>Date report to patient</Label>
                            <Col sm={4}>
                            <Input
                            id='datereport'
                            type="date"
                            value={datereport}
                            onChange={(e)=>setDatereport(e.target.value)}
                            />
                            </Col>
                        </FormGroup>  
                        <FormGroup row>
    <Label className="label"
      for="htype"
      sm={2}
    >
      Histological type
    </Label>
    <Col sm={4}>
      <Button  block onClick={htoggle}
        id="htype"
        name="htype"
        >{htype||'Histological type'}</Button>
    </Col>
    <Label className="label"
      for="grade"
      sm={2}
    >
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
        name="ptsize"
        type='number'
        />
    </Col>
    <Label className="label"
      for="ptstage"
      sm={2}
    >
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
    <Label className="label"
      for="slnbnumpos"
      sm={2}
    >
      Sentinel Nodes positive
    </Label>
    <Col sm={1}>
      <Input 
        id="slnbnumpos"
        name="slnbnumpos"
        type='number'
        placeholder='pos'
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
        name="slnbtot"
        type='number'
        placeholder='Total '
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
        id="axlnnumpos"
        name="axlnnumpos"
        type='number'
        placeholder='pos'
      />
    </Col>
    
    <Label className="label"
      for="axlntot"
      sm={2}
    >
      Total Axillary Nodes 
    </Label>
    <Col sm={1}>
      <Input 
        id="axlntot"
        name="axlntot"
        type='number'
        placeholder='Total '
      />
    </Col>
    <Label className="label"
      for="mstage"
      sm={2}
    >
      Distant metastasis
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
        type='select'
        placeholder='pos'
      >
        <option>
      {' '}
    </option>
    <option>
      right
    </option>
    <option>
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
        id="postneo"
        name="postneo"
        type='select'
        placeholder='Postneo '
      ><option>
      {' '}
    </option>
    <option>
      No
    </option>
    <option>
      Yes
    </option>
    
  </Input>
    </Col>
    <Label className="label" sm={2}>Pathological Stage:</Label>   
    <Col sm={4}>
    <Input
      value={getPStage(ptstage,pnstage,mstage)||' '}
      type='text' disabled
      style={{borderColor:'#2980b9',color:'blue',fontWeight:'bold',textAlign:'center'}}
      />
    </Col>
  </FormGroup> 
  <FormGroup
    check
    row
  >
    <Col
      sm={{
        offset: 10,
        size: 2
      }}
    >
      
      <Button>
        Submit
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
<ListGroupItem active={selected === 'Tis(DCIS)'} onClick={handleSelect}>
  <b>Tis&#40;DCIS&#41;</b> Ductal carcinoma in situ
  </ListGroupItem>
  <ListGroupItem active={selected === 'T1'} onClick={handleSelect}>
  <b>T1</b> Tumor &ge;1 mm but &le; 20 mm. in greatest dimension
  </ListGroupItem>
  <ListGroupItem active={selected === 'T1mi'} onClick={handleSelect}>
  <b>T1mi</b> Tumor &le;1 mm  in greatest dimension
  </ListGroupItem>
  <ListGroupItem active={selected === 'T1a'} onClick={handleSelect}>
  <b>T1a</b> Tumor &gt;1 mm but &le; 5 mm. in greatest dimension
  </ListGroupItem>
  <ListGroupItem active={selected === 'T1b'} onClick={handleSelect}>
  <b>T1b</b> Tumor &gt;5 mm but &le; 10 mm. in greatest dimension
  </ListGroupItem>
  <ListGroupItem active={selected === 'T1c'} onClick={handleSelect}>
  <b>T1c</b> Tumor &gt;10 mm but &le; 20 mm. in greatest dimension
  </ListGroupItem>
  <ListGroupItem active={selected === 'T2'} onClick={handleSelect}>
  <b>T2</b> Tumor &gt;20 mm but &le; 50 mm. in greatest dimension
  </ListGroupItem>
  <ListGroupItem active={selected === 'T3'} onClick={handleSelect}>
  <b>T3</b> Tumor &gt;50 mm  in greatest dimension
  </ListGroupItem>
  <ListGroupItem active={selected === 'T4'} onClick={handleSelect}>
  <b>T4</b> Tumor of any size with direct extension to the chest wall and/or to the skin &#40;ulceration or macroscopic nodules&#41;;invasion of the dermis alone does not qualify as T4
  </ListGroupItem>
  <ListGroupItem active={selected === 'T4a'} onClick={handleSelect}>
  <b>T4a</b> Extension to the chest wall&#40;invasion or adherence to pectoralis muscle in the abscence of invasion of chest wall structures does not qualified as T4&#41;
  </ListGroupItem>
  <ListGroupItem active={selected === 'T4b'} onClick={handleSelect}>
  <b>T4b</b> Ulceration and/or ipsilateral macroscopic satellite nodules and/or edema  &#40;including peau d'orange&#41;of the skin that does not meet the criteria of inflammatory carcinoma
  </ListGroupItem>
  <ListGroupItem active={selected === 'T4c'} onClick={handleSelect}>
  <b>T4c</b> Both T4a and T4b are present
  </ListGroupItem>
  <ListGroupItem active={selected === 'T4d'} onClick={handleSelect}>
  <b>T4d</b> Inflammatory carcinoma
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

export default PathoStage
