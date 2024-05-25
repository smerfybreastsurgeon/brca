import PstagePatient from "./PstagePatient";
import TimeAgo from "./TimeAgo";
import { useGetPstagesQuery } from "./pstagesSlice";
import { Button } from "reactstrap";
import { useNavigate } from "react-router";
import { getThai } from "../../utility/getThai";

const PstagesExcerpt = ({ pstageId }) => {
    const navigate=useNavigate()
    const { pstage } = useGetPstagesQuery('getPstages', {
        selectFromResult: ({ data }) => ({
            pstage: data?.entities[pstageId]
        }),
    })
   const sumposnode=Number(pstage?.slnbnumpos)+Number(pstage?.axlnnumpos)
   const totalnodes=Number(pstage?.slnbtot)+Number(pstage?.axlntot)
   
    return (
        <article>
            <p>วันที่ผ่าตัด :{getThai(pstage.datesent)}</p>
            <p>วันที่รายงานผล :{getThai(pstage.datereport)}</p>
            <p className="excerpt">Stage:{pstage.stage==='0'&&pstage.neo==='y'?'pathological Complete Response (pCR)':pstage.stage}</p>
            {' '}{pstage.neo==='y'?'y':''}{pstage.ptstage}&#40;{pstage.ptsize} mm. &#41; {pstage.neo==='y'?'y':''}{pstage.pnstage}&#40;{sumposnode}/{totalnodes} &#41; {pstage.mstage}
            
            <p className="postCredit">
               
                <Button className="btn-custom" onClick={() => navigate(`/pstage/view/${pstageId}`)}>ดูรายละเอียด</Button>{' '}
                <PstagePatient patientId={pstage.patientId} />
                <TimeAgo timestamp={pstage.date} />
            </p>
            
        </article>
    )
}

export default PstagesExcerpt