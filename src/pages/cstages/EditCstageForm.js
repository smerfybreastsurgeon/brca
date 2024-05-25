import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetCstagesQuery } from './cstagesSlice';
import { useUpdateCstageMutation,useDeleteCstageMutation } from './cstagesSlice';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {Form,FormGroup,Label,Col,Button,Modal,
    ModalBody,Input,
    ModalFooter,ListGroup,ListGroupItem} from 'reactstrap'
import CstagePatient from './CstagePatient';
import SymptomForm from '../../components/CheckboxList1';
import SitemetasForm from '../../components/Sitemetas';
import { getStage } from '../../utility/getClinicalStage';

const EditCstageForm = () => {
    const { cstageId } = useParams()
    const navigate = useNavigate()

    const [updateCstage, { isLoading }] = useUpdateCstageMutation()
    const [deleteCstage] = useDeleteCstageMutation()

    const { cstage, isLoading: isLoadingCstages, isSuccess } = useGetCstagesQuery('getCstages', {
        selectFromResult: ({ data, isLoading, isSuccess }) => ({
            cstage: data?.entities[cstageId],
            isLoading,
            isSuccess
        }),
    })    

    const [side, setSide] = useState('')
    const [stage, setStage] = useState('')
    const [cT, setCT] = useState('')
    const [ctsize, setCtsize] = useState(0)
    const [cN, setCN] = useState('')
    const [M, setM] = useState('')
    const [sitemetas,setSitemetas]=useState([])
    const [othermet,setOthermet]=useState('')
    const [birads,setBirads]=useState('')
    const [datecdx,setDatecdx]=useState('')
    const [datefirstvst,setDatefirstvst]=useState('')
    const [presentsym, setPresentsym] = useState(cstage.presentsym||[]);
    const [othersym,setOthersym]=useState('')
    const [datedoctorrpt,setDatedoctorrpt]=useState('')
    const [datemmg,setDatemmg]=useState('')
    const [methodbx,setMethodbx]=useState('')
    const [otherMethod,setOtherMethod]=useState('')
    const [htype,setHtype]=useState('Histopathology type');
    const [grade,setGrade]=useState('G');
    const [cnote,setCnote]=useState('')
    const [patientId, setPatientId] = useState('')

    const [open, setOpen] = useState(false);
    const [selectedt, setSelectedt] = useState(null);   
    const [nopen, setNOpen] = useState(false);
    const [selectedn, setSelectedn] = useState(null);    
    const [mopen, setMOpen] = useState(false);
    const [selectedm, setSelectedm] = useState(null);
    const [sideopen, setSideOpen] = useState(false);
    const [selectedside, setSelectedside] = useState(null);
    const [hopen, setHOpen] = useState(false);
    const [selectedh, setSelectedh] = useState(null);
    const [gopen, setGOpen] = useState(false);
    const [selectedg, setSelectedg] = useState(null);
    const [biradsopen, setBiradsOpen] = useState(false);
    const [selectedbirads, setSelectedbirads] = useState(null);
    useEffect(() => {
      const newStage = getStage(cT, cN, M);
      setStage(newStage);
    }, [cT, cN, M]);  
  
    useEffect(() => {
        if (isSuccess) {
            setDatecdx(cstage.datecdx)
            setDatemmg(cstage.datemmg)
            setDatefirstvst(cstage.datefirstvst)
            setDatedoctorrpt(cstage.datedoctorrpt)
            setPresentsym(cstage.presentsym)
            setOthersym(cstage.othersym)
            setSitemetas(cstage.sitemetas)
            setOthermet(cstage.othermet)
            setMethodbx(cstage.methodbx)
            setOtherMethod(cstage.othermethod)
            setCT(cstage.cT)
            setCtsize(cstage.ctsize)
            setCN(cstage.cN)
            setM(cstage.M)            
            setHtype(cstage.htype)
            setGrade(cstage.grade)
            setCnote(cstage.cnote)
            setBirads(cstage.birads)
            setSide(cstage.side)
            setStage(cstage.stage)
                setPatientId(cstage.patientId)
        }
    }, [isSuccess,cstage?.cnote,cstage?.othersym,cstage?.sitemetas,cstage?.othermet,cstage?.ctsize,cstage?.datecdx, cstage?.datedoctorrpt, cstage?.datemmg, cstage?.datefirstvst, cstage?.grade, cstage?.htype, cstage?.methodbx, cstage?.othermethod,cstage?.presentsym, cstage?.stage, cstage?.cT, cstage?.cN,cstage?.M,cstage?.birads,cstage?.side,cstage.patientId])

    if (isLoadingCstages) return <p>Loading...</p>
    if (!cstage) {
        return (
            <section>
                <h2>Cstage not found!</h2>
            </section>
        )
    }
    const ttoggle = () => setOpen(!open);
    const handleSelectT=(event)=>{ setSelectedt(event.target.innerText.split(' ')[0]);setCT(event.target.innerText.split(' ')[0]);ttoggle()}
    const ntoggle = () => setNOpen(!nopen);
    const handleSelectN=(event)=>{ setSelectedn(event.target.innerText.split(' ')[0]);setCN(event.target.innerText.split(' ')[0]);ntoggle()}
    const mtoggle = () => setMOpen(!mopen);
    const handleSelectM=(event)=>{ setSelectedm(event.target.innerText.split(' ')[0]);setM(event.target.innerText.split(' ')[0]);mtoggle()}
    const sidetoggle = () => setSideOpen(!sideopen);
    const handleSelectSide=(event)=>{ setSelectedside(event.target.innerText.split(' ')[0]);setSide(event.target.innerText.split(' ')[0]);sidetoggle()}
    const biradstoggle = () => setBiradsOpen(!biradsopen);
    const handleSelectBirads=(event)=>{ setSelectedbirads(event.target.innerText.split(' ').slice(0, 2).join(" "));setBirads(event.target.innerText.split(' ').slice(0, 2).join(" "));biradstoggle()}
    const gtoggle = () => setGOpen(!gopen);
    const htoggle = () => setHOpen(!hopen);
    const handleSelectG=(event)=>{ setSelectedg(event.target.innerText);setGrade(event.target.innerText);gtoggle()}
    const handleSelectH=(event)=>{ setSelectedh(event.target.innerText);setHtype(event.target.innerText);htoggle()}
    const handleSelected = (selectedSymptoms) => {
      setPresentsym(selectedSymptoms);
    };
    const handleSelectedsitemetas = (selectedSitemetas) => {
      setSitemetas(selectedSitemetas);
    };
   const handleOnOthersymChange=(othersym)=>{
      setOthersym(othersym)
    }
    const handleOnOthermetChange=(othermet)=>{
      setOthermet(othermet)
    }
    function handleKeyDown(event) {
      if (event.target.value.length >= 3) {
        event.preventDefault();
      }
    }     
    const canSave = [stage,cT,cN,M,birads,side,datecdx,datefirstvst,datemmg,methodbx].every(Boolean) && !isLoading;

    

const onSaveCstageClicked = async () => {
        if (canSave) {
            try {
                await updateCstage({id:cstage.id,datecdx,datemmg,othersym,othermet,datefirstvst,datedoctorrpt,presentsym,sitemetas,methodbx,otherMethod,htype,grade,cnote,stage,cT,ctsize,cN,M,birads,side,patientId }).unwrap()
                setDatecdx('')
                setDatemmg('')
                setDatefirstvst('')
                setDatedoctorrpt('')
                setPresentsym([])
                setSitemetas([])
                setOthersym('')
                setOthermet('')
                setMethodbx('')
                setOtherMethod('')
                setCT('cT')
                setCtsize(0)
                setCN('cN')
                setM('M')
                setHtype('Histopathology type')
                setGrade('G')
                setCnote('')
                setBirads('BIRADS')
                setSide('Side')
                setStage('STAGE')
                setPatientId('')
                navigate(`/patient/${patientId}`);
                window.location.reload();
            } catch (err) {
                console.error('Failed to save the post', err)
            }
        }    }

   
const showDeleteConfirmation = () => {
          confirmAlert({
            title: 'ยืนยันลบข้อมูล',
            message: 'คุณต้องการลบข้อมูลนี้หรือ?',
            buttons: [
              { 
                label: 'ใช่',
                onClick: async () => {
                  try {
                    await deleteCstage({ id: cstage?.id }).unwrap();
                    setDatecdx('');
                    setDatemmg('');
                    setDatefirstvst('');
                    setDatedoctorrpt('');
                    setPresentsym([]);
                    setSitemetas([]);
                    setOthersym('');
                    setOthermet('');
                    setMethodbx('');
                    setOtherMethod('');
                    setCT('cT');
                    setCtsize(0)
                    setCnote('')
                    setCN('cN');
                    setM('M');
                    setHtype('Histopathology type');
                    setGrade('G');
                    setBirads('BIRADS');
                    setSide('Side');
                    setStage('STAGE');
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
        <section>
          <Form>
  <FormGroup row>
  <h4 sm={12}> แก้ไขบันทึก Clinical Diagnostic  <CstagePatient patientId={patientId} /></h4>   
  </FormGroup>
        <FormGroup row>
              <Label style={{borderColor:'#2980b9',color:'blue'}} for="datefirstvst"  sm={2}>
                  1<sup>st</sup> visit OPD date &#40;วันที่พบแพทย์ครั้งแรก&#41;
              </Label>
              <Col sm={4}>
                  <Input
                  id='datefirstvst'
                  type="date"
                  value={datefirstvst}
                  onChange={(e) => {
                      const date = new Date(e.target.value);
                      const formattedDate = date.toISOString().slice(0, 10);                
                      setDatefirstvst(formattedDate);
                  }} />
                  
              </Col>
              <Label style={{borderColor:'#2980b9',color:'blue'}} for="presentsym" sm={2}>
                Presenting symptoms
              </Label>
              <Col sm={4}>    
              <SymptomForm defaultSymptoms={cstage.presentsym} othersym={cstage.othersym} onOtherSymChange={handleOnOthersymChange}  onSelected={handleSelected} />       
              </Col>
        </FormGroup>
  <FormGroup row>
    <Label style={{borderColor:'#2980b9',color:'blue'}}  for="ctstage" sm={2} >
      Primary Tumor
    </Label>
    <Col sm={2}>
      <Button  block onClick={ttoggle}
        id="ctstage"
        name="ctstage"
        >{cT||'T'}</Button>
    </Col>
    <Label className="label"style={{borderColor:'#2980b9',color:'blue'}}
          for="ctsize"
          sm={1}
        >
          Tumor size&#40;mm&#41;
        </Label>
        <Col sm={1}>
          <Input  
            id="ctsize"
            name="ctsize" value={ctsize} onChange={e=>setCtsize(e.target.value)}
            type='number' onKeyDown={handleKeyDown}
            />
        </Col>
    <Label style={{borderColor:'#2980b9',color:'blue'}}
      for="datecdx"
      sm={2}
    >
      Biopsy Date&#40;วันที่เจาะชิ้นเนื้อ&#41;
    </Label>
    <Col sm={4}>
    <Input
    id='datecdx'
    type="date"
    value={datecdx}
    onChange={(e) => {
        const date = new Date(e.target.value);
        const formattedDate = date.toISOString().slice(0, 10);
        setDatecdx(formattedDate);
    }}
/>
  </Col>
  </FormGroup>
    <FormGroup row>
    <Label 
      for="cnstage"
      sm={2} style={{borderColor:'#2980b9',color:'blue'}}
    >
      Regional Nodes metastasis
    </Label>
    <Col sm={4}>
      <Button block onClick={ntoggle}
        id="cnstage"
        name="cnstage"
      >{cN||'N'}</Button>
    </Col>
    <Col sm={2}>   <Label style={{borderColor:'#2980b9',color:'blue'}}>Method biopsy</Label></Col>
          <Col sm={4}>
          <Input
          id='methodbx' name='methodbx'
          type="select"
          value={methodbx}
          onChange={e=>setMethodbx(e.target.value)}
          >
              <option value=' '>
                  {' '}
              </option>
              <option value='FNAC'>
              Fine needle aspiration
              </option>
              <option value='CNB'>
              Core needle biopsy
              </option>
              <option value='EXC'>
              excisional Biopsy
              </option>
              <option value='INC'>
              incisional Biopsy
              </option>
              <option value='other'>
              Other
              </option>
          </Input>

          {methodbx === 'other' && (
  <div>
  <Label htmlFor="otherMethod">ระบุวิธีการอื่น:</Label>
  <Input
    id="otherMethod"
    name="otherMethod"
    type="text"
    value={otherMethod}
    onChange={e => setOtherMethod(e.target.value)}
  />
  </div>
)}
</Col>
    </FormGroup >
    
  <FormGroup row>
    <Label style={{borderColor:'#2980b9',color:'blue'}}   for="mstage"  sm={2}    >
      Distant metastasis
    </Label>
    <Col sm={4}>
      <Button block onClick={mtoggle}
        id="mstage"
        name="mstage"
      >{M||'M'}</Button>
    </Col>
    <Label style={{borderColor:'#2980b9',color:'blue'}}
      for="datecdx"
      sm={2}
    >
      Diagnostic date&#40;วันที่แพทย์แจ้งผลชิ้นเนื้อ&#41;
    </Label>
    <Col sm={4}>
    <Input
    id='datedoctorrpt'
    type="date"
    value={datedoctorrpt}
    onChange={(e) => {
        const date = new Date(e.target.value);
        const formattedDate = date.toISOString().slice(0, 10);
        setDatedoctorrpt(formattedDate);
    }}
/>
  </Col>
  </FormGroup> 
  
<FormGroup row>
<Label className="label" sm={2} style={{borderColor:'#2980b9',color:'blue'}}>Clinical Stage:</Label>   
    <Col sm={4}>
    <Input
      value={getStage(cT,cN,M)||'STAGE'} 
      type='text' readOnly
      style={{borderColor:'#2980b9',color:'blue',fontWeight:'bold',textAlign:'center'}}
      />
    </Col>
    <Label 
      for="datemmg"
      sm={2} style={{borderColor:'#2980b9',color:'blue'}}
    >
      MMG+u/s  Date&#40;วันที่ตรวจแมมโมแกรม/อัลตร้าซาวด์นม&#41;
    </Label>
    <Col sm={4}>
    <Input
    id='datemmg'
    type="date"
    value={datemmg}
    onChange={(e) => {
        const date = new Date(e.target.value);
        const formattedDate = date.toISOString().slice(0, 10);
        setDatemmg(formattedDate);
    }}
/>
    </Col>
  </FormGroup> 
  {M==='cM1'&&<FormGroup row>
  <Label 
      for="sitemetas"style={{borderColor:'#2980b9',color:'blue'}}
      sm={2}
    >
      อวัยวะที่มีการแพร่กระจาย
    </Label>    
  <Col sm={4}>    
  <SitemetasForm defaultSitemetas={cstage.sitemetas} othermet={cstage.othermet} onOtherMetChange={handleOnOthermetChange}  onSelected={handleSelectedsitemetas} />       
              </Col>
  </FormGroup>}
  <FormGroup row>
  <Label 
      for="birads"style={{borderColor:'#2980b9',color:'blue'}}
      sm={2}
    >
      BIRADS
    </Label>    
    <Col sm={4}>
      <Button block onClick={biradstoggle}
        id="birads"
        name="birads"
      >{birads||'BIRADS'}</Button>
    </Col>
    <Label style={{borderColor:'#2980b9',color:'blue'}}
      for="side"
      sm={2}
    >
      SIDE
    </Label>
    <Col sm={4}>
      <Button block onClick={sidetoggle}
        id="side"
        name="side"
      >{side==='Lt'?'ข้างซ้าย':side==='Rt'?'ข้างขวา':'SIDE'}</Button>
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
<FormGroup>
<Label style={{color:'blue'}}>Clinical note :</Label>
<Input
  value={cnote}
  type='textarea'
  onChange={(e)=>setCnote(e.target.value)}/>
</FormGroup>      
<FormGroup  row >
    <Col  sm={{offset: 9, size:3 }} >
    <Button className="deleteButton" onClick={showDeleteConfirmation} style={{marginRight: '10px'}}>ลบ</Button>  
      <Button  onClick={()=>navigate(`/patient/${patientId}`)}   >
       ย้อนกลับ
      </Button>      

      <Button  onClick={onSaveCstageClicked} color='primary' style={{marginLeft: '10px'}}  disabled={!canSave}>
        บันทึก
      </Button>

    </Col>
</FormGroup>

<Modal  isOpen={open??false} toggle={ttoggle} fullscreen>
        <ModalBody>
        <ListGroup>
            <Label style={{fontSize:24}} className="text-center bg-primary  text-white">Primary Tumor</Label>
  <ListGroupItem active={selectedt === 'cT1'} onClick={handleSelectT}>
  <b>cT1</b> Tumor &ge;1 mm but &le; 20 mm. in greatest dimension
  </ListGroupItem>
  <ListGroupItem active={selectedt === 'cT1mi'} onClick={handleSelectT}>
  <b>cT1mi</b> Tumor &le;1 mm  in greatest dimension
  </ListGroupItem>
  <ListGroupItem active={selectedt === 'cT1a'} onClick={handleSelectT}>
  <b>cT1a</b> Tumor &gt;1 mm but &le; 5 mm. in greatest dimension
  </ListGroupItem>
  <ListGroupItem active={selectedt === 'cT1b'} onClick={handleSelectT}>
  <b>cT1b</b> Tumor &gt;5 mm but &le; 10 mm. in greatest dimension
  </ListGroupItem>
  <ListGroupItem active={selectedt === 'cT1c'} onClick={handleSelectT}>
  <b>cT1c</b> Tumor &gt;10 mm but &le; 20 mm. in greatest dimension
  </ListGroupItem>
  <ListGroupItem active={selectedt === 'cT2'} onClick={handleSelectT}>
  <b>cT2</b> Tumor &gt;20 mm but &le; 50 mm. in greatest dimension
  </ListGroupItem>
  <ListGroupItem active={selectedt === 'cT3'} onClick={handleSelectT}>
  <b>cT3</b> Tumor &gt;50 mm  in greatest dimension
  </ListGroupItem>
  <ListGroupItem active={selectedt === 'cT4a'} onClick={handleSelectT}>
  <b>cT4a</b> Extension to the chest wall&#40;invasion or adherence to pectoralis muscle in the abscence of invasion of chest wall structures does not qualified as T4&#41;
  </ListGroupItem>
  <ListGroupItem active={selectedt === 'cT4b'} onClick={handleSelectT}>
  <b>cT4b</b> Ulceration and/or ipsilateral macroscopic satellite nodules and/or edema  &#40;including peau d'orange&#41;of the skin that does not meet the criteria of inflammatory carcinoma
  </ListGroupItem>
  <ListGroupItem active={selectedt === 'cT4c'} onClick={handleSelectT}>
  <b>cT4c</b> Both T4a and T4b are present
  </ListGroupItem>
  <ListGroupItem active={selectedt === 'cT4d'} onClick={handleSelectT}>
  <b>cT4d</b> Inflammatory carcinoma
  </ListGroupItem>
</ListGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={ttoggle}>
            Close
          </Button>
        </ModalFooter>
</Modal>
<Modal  isOpen={nopen??false} toggle={ntoggle} fullscreen>
        <ModalBody>
        <ListGroup>
            <Label style={{fontSize:24}} className="text-center bg-primary  text-white">Regional Nodes Metastasis</Label>
            <ListGroupItem active={selectedn === 'cN0'} onClick={handleSelectN}>
            <b>cN0</b> No regional lymph node metastases(by imaging or clinical examination)
            </ListGroupItem>
            <ListGroupItem active={selectedn === 'cN1'} onClick={handleSelectN}>
            <b>cN1</b> Metastases to movable ipsilateral Level I,II axillary lymph node(s)
            </ListGroupItem>
            <ListGroupItem active={selectedn === 'cN1mi'} onClick={handleSelectN}>
            <b>cN1mi</b> Micrometastases(approximately 200 cells,larger than 0.2 mm,but none larger than 2.0 mm)
            </ListGroupItem>
            <ListGroupItem active={selectedn === 'cN2'} onClick={handleSelectN}>
            <b>cN2</b> Metastases in ipsilateral Level I,II axillary lymph node(s) that are clinically fixed or matted or in ipsilateral internal mammary nodes in the abscence of axillary node metastases
            </ListGroupItem>
            <ListGroupItem active={selectedn === 'cN2a'} onClick={handleSelectN}>
            <b>cN2a</b> Metastases in ipsilateral Level I,II axillary lymph node(s) that are clinically fixed or matted
            </ListGroupItem>
            <ListGroupItem active={selectedn === 'cN2b'} onClick={handleSelectN}>
            <b>cN2b</b> Metastases in ipsilateral internal mammary nodes in the abscence of axillary node metastases
            </ListGroupItem>
            <ListGroupItem active={selectedn === 'cN3'} onClick={handleSelectN}>
            <b>cN3</b> Metastases in ipsilateral infraclavicular(Level III axillary) lymph node(s) with or without Level I,II axillary lymph node involvement or metastases in ipsilateral internal mammary nodes with Level I,II axillary node metastases or metastases in ipsilateral supraclavicular lymph node(s) with or without axillary or internal mammary lymph node involvement
            </ListGroupItem>
            <ListGroupItem active={selectedn === 'cN3a'} onClick={handleSelectN}>
            <b>cN3a</b> Metastases in ipsilateral infraclavicular(Level III axillary) lymph node(s)
            </ListGroupItem>
            <ListGroupItem active={selectedn === 'cN3b'} onClick={handleSelectN}>
            <b>cN3b</b> Metastases in ipsilateral internal mammary nodes with Level I,II axillary node metastases
            </ListGroupItem>
            <ListGroupItem active={selectedn === 'cN3c'} onClick={handleSelectN}>
            <b>cN3c</b> Metastases in supraclavicular lymph node(s)
            </ListGroupItem>  
        </ListGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={ntoggle}>
            Close
          </Button>
        </ModalFooter>
</Modal>
<Modal  isOpen={mopen??false} toggle={mtoggle} fullscreen>
        <ModalBody>
        <ListGroup>
            <Label style={{fontSize:24}} className="text-center bg-primary  text-white">Distant Metastasis</Label>
            <ListGroupItem active={selectedm === 'M0'} onClick={handleSelectM}>
            <b>M0</b> No clinical or radiographic evidence of distant metastases
            </ListGroupItem>
            <ListGroupItem active={selectedm === 'cM1'} onClick={handleSelectM}>
            <b>cM1</b> Distant metastases detected by clinical and radiographic means
            </ListGroupItem>
        </ListGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={mtoggle}>
            Close
          </Button>
        </ModalFooter>
</Modal>
<Modal  isOpen={biradsopen??false} toggle={biradstoggle} fullscreen>
        <ModalBody>
        <ListGroup>
            <Label style={{fontSize:24}} className="text-center bg-primary  text-white">BIRADS</Label>
            <ListGroupItem active={selectedbirads === 'BIRADS0'} onClick={handleSelectBirads}>
            <b>BIRADS 0</b> Need additional imaging evaluation
            </ListGroupItem>
            <ListGroupItem active={selectedbirads === 'BIRADS1'} onClick={handleSelectBirads}>
            <b>BIRADS 1</b> Normal
            </ListGroupItem>
            <ListGroupItem active={selectedbirads === 'BIRADS2'} onClick={handleSelectBirads}>
            <b>BIRADS 2</b> Benign
            </ListGroupItem>
            <ListGroupItem active={selectedbirads === 'BIRADS3'} onClick={handleSelectBirads}>
            <b>BIRADS 3</b> Probably benign
            </ListGroupItem>
            <ListGroupItem active={selectedbirads === 'BIRADS4a'} onClick={handleSelectBirads}>
            <b>BIRADS 4a</b> 2-10% risk of malignancy
            </ListGroupItem>
            <ListGroupItem active={selectedbirads === 'BIRADS4b'} onClick={handleSelectBirads}>
            <b>BIRADS 4b</b> 11-50% risk of malignancy
            </ListGroupItem>
            <ListGroupItem active={selectedbirads === 'BIRADS4c'} onClick={handleSelectBirads}>
            <b>BIRADS 4c</b> 51-94% risk of malignancy
            </ListGroupItem>
            <ListGroupItem active={selectedbirads === 'BIRADS5'} onClick={handleSelectBirads}>
            <b>BIRADS 5</b> &ge;95% risk of malignancy
            </ListGroupItem>
            <ListGroupItem active={selectedbirads === 'BIRADS6'} onClick={handleSelectBirads}>
            <b>BIRADS 6</b> 100% malignancy
            </ListGroupItem>
        </ListGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={biradstoggle}>
            Close
          </Button>
        </ModalFooter>
</Modal>
<Modal  isOpen={sideopen??false} toggle={sidetoggle} fullscreen>
        <ModalBody>
        <ListGroup>
            <Label style={{fontSize:24}} className="text-center bg-primary  text-white">Side</Label>
            <ListGroupItem active={selectedside === 'Lt'} onClick={handleSelectSide}>
            <b>Lt</b> Left side
            </ListGroupItem>
            <ListGroupItem active={selectedside === 'Rt'} onClick={handleSelectSide}>
            <b>Rt</b> Right side
            </ListGroupItem>
        </ListGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={sidetoggle}>
            Close
          </Button>
        </ModalFooter>
</Modal>
<Modal  isOpen={hopen} toggle={htoggle} fullscreen>
    <ModalBody>
    <ListGroup>
        <Label style={{fontSize:24}} className="text-center bg-primary  text-white">Histopathological cell type</Label>
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
<ListGroupItem active={selectedh === 'Encapsulated papillary carcinoma'} onClick={handleSelectH}>
<b>Encapsulated papillary carcinoma</b> 
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
</Form>
</section>
    )
}

export default EditCstageForm