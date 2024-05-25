import PstagePatient from "./PstagePatient";
import TimeAgo from "./TimeAgo";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router";
import { useGetPstagesQuery } from "./pstagesSlice";
import { getThai } from "../../utility/getThai";
import { Button, Col, Row } from "reactstrap";
import { useGetPatientsQuery } from "../patients/patientsSlice";



const SinglePstagePage = () => {
    const { pstageId } = useParams()
    const navigate=useNavigate()
    
    const { pstage, isLoading } = useGetPstagesQuery('getPstages', {
        selectFromResult: ({ data, isLoading }) => ({
            pstage: data?.entities[pstageId],
            isLoading
        }),
    })
    const { patient: brca } = useGetPatientsQuery('getPatients', {
        selectFromResult: ({ data, isLoading }) => ({
          patient: data?.entities[pstage?.patientId], // Fetch patient data based on subtype.patientId
          isLoading,
        }),
      });
    if (isLoading) return <p>Loading...</p>

    if (!pstage) {
        return (
            <section>
                <h2>Pstage not found!</h2>
            </section>
        )
    }
    const sumposnode=Number(pstage?.slnbnumpos)+Number(pstage?.axlnnumpos)
    const totalnodes=Number(pstage?.slnbtot)+Number(pstage?.axlntot)
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
    return (
        <article>
          <Row>
            <Col>
            <p>วันที่ผ่าตัด :{getThai(pstage.datesent)}</p>
            <p>วันที่รายงานผล :{getThai(pstage.datereport)}</p>
            <p>อายุเมื่อวินิจฉัย {brca.agedx} ปี</p>
            <p className="excerpt">Stage:{pstage.stage==='0'&&pstage.neo==='y'?'pathological Complete Response (pCR)':pstage.stage}</p>
            <p>{pstage.neo==='y'?'y':''}{pstage.ptstage}&#40;{pstage.ptsize} mm. &#41; {pstage.neo==='y'?'y':''}{pstage.pnstage}&#40;{sumposnode}/{totalnodes} &#41; {pstage.mstage}</p>
            <p>Histopathology :{pstage.htype} </p><p>{pstage.grade}</p>
            <p>{pstage.side==='L'?'ข้างซ้าย':pstage.side==='R'?'ข้างขวา':''}</p>
            <p style={{color:`${fcolor(pstage.subtype)}`}}>Subtype : {pstage.subtype}</p>
            <p className="postCredit">
            <Button className="btn-custom"  onClick={() => navigate(`/pstage/edit/${pstageId}`)}>แก้ไข</Button>
             {' '}   <PstagePatient patientId={pstage.patientId} />
                <TimeAgo timestamp={pstage.date} />
            </p>
            {pstage.subtype==='Triple Negative'&&<img src='/assets/LeadTeam2566.png'
            style={{ width: '100%', height: 'auto' }}
             alt="TNBC" />}
            {pstage.subtype==='Triple Negative'&&<><img src='/assets/TNBC.png'
            style={{ width: '100%', height: 'auto' }}
             alt="TNBC2" /><img src='/assets/HRnegchemo.png'
             style={{ width: '100%', height: 'auto' }}
              alt="TNBC2" /></> }  
             {pstage.subtype==='Luminal B negative'&&<img src='/assets/cdk46.png'
            style={{ width: '100%', height: 'auto' }}
             alt="Luminal B negative" /> }  
           
            
            </Col>
            <Col>
            {(pstage.subtype==='Luminal B negative'||pstage.subtype==='Luminal B positive'||pstage.subtype==='Luminal A')&&<img src='/assets/luminalchemo.png'
            style={{ width: '100%', height: 'auto' }}
             alt="Luminal B negative1" /> } 
              {pstage.subtype==='Luminal B negative'&&<img src='/assets/HRpos.png'
            style={{ width: '100%', height: 'auto' }}
             alt="Luminal B negative1" /> } 
                {pstage.subtype==='Luminal B negative'&&<img src='/assets/HR.png'
            style={{ width: '100%', height: 'auto' }}
             alt="Luminal B negative1" /> } 
             {pstage.subtype==='Luminal B positive'&&<><img src='/assets/her2algo.png'
            style={{ width: '100%', height: 'auto' }}
             alt="Luminal B positive" /><img src='/assets/herceptin.png'
            style={{ width: '100%', height: 'auto' }}
             alt="Luminal B positive" /><img src='/assets/hercs.png'
             style={{ width: '100%', height: 'auto' }}
              alt="Luminal B positive" /></> }
            </Col>
            </Row>
        </article>
    )
}

export default SinglePstagePage