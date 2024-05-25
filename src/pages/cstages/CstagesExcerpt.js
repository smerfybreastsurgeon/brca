import CstagePatient from "./CstagePatient";
import TimeAgo from "./TimeAgo";
import { useNavigate } from "react-router";
import { getThai } from "../../utility/getThai";
import { Button } from "reactstrap";
import { useGetCstagesQuery } from "./cstagesSlice";

const CstagesExcerpt = ({ cstageId }) => {
const navigate=useNavigate()
    const { cstage } = useGetCstagesQuery('getCstages', {
        selectFromResult: ({ data }) => ({
            cstage: data?.entities[cstageId]
        }),
    })
  
    return (
        <article>
        <p>วันที่พบแพทย์ครั้งแรก :{getThai(cstage.datefirstvst)}</p>
            <p>วันที่เก็บชิ้นเนื้อ :{getThai(cstage.datecdx)}</p>
            <p>วิธีการเก็บชิ้นเนื้อ : {cstage.methodbx === 'EXC'
  ? 'Excisional biopsy'
  : cstage.methodbx === 'CNB'
  ? 'Core needle biopsy'
  : cstage.methodbx === 'INC'
  ? 'Incisional biopsy'
  : cstage.methodbx === 'FNAC'
  ? 'Fine needle aspiration cytology'
  : cstage.otherMethod}
</p>
            <p>วันที่แพทย์แจ้งผล:{getThai(cstage.datedoctorrpt)}</p>
            <p>ผลพยาธิวิทยา : {cstage.htype}</p>
            <p>{cstage.grade}</p>
            <p>{cstage.side==='Lt'?'ข้างซ้าย':cstage.side==='Rt'?'ข้างขวา':''}</p>
            <p className="excerpt"><strong style={{color:'#FF0000'}}>Clinical Stage: {cstage.stage}</strong> {cstage.cT}{cstage.ctsize&& `(${cstage.ctsize} mm )`}{' '}{cstage.cN}{' '}{cstage.M}{' ('}{cstage.M==='cM1'?cstage.sitemetas:''}{' )'}</p>
            <p className="postCredit">
            <Button className="btn-custom" onClick={() => navigate(`/cstage/view/${cstageId}`)}>แก้ไข</Button>{' '}
                <CstagePatient patientId={cstage.patientId} />
                <TimeAgo timestamp={cstage.date} />
            </p>
            
        </article>
    )
}

export default CstagesExcerpt