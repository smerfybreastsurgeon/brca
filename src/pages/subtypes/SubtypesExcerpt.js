import SubtypePatient from "./SubtypePatient";
import TimeAgo from "./TimeAgo";
import { useNavigate } from 'react-router';
import { useGetSubtypesQuery } from "./subtypeSlice";
import { getThai } from "../../utility/getThai";
import { Button } from "reactstrap";

const SubtypesExcerpt = ({ subtypeId }) => {
  const navigate=useNavigate()
    const { subtype } = useGetSubtypesQuery('getSubtypes', {
        selectFromResult: ({ data }) => ({
            subtype: data?.entities[subtypeId]
        }),
    })
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
            
            <p>วันที่รายงานผล :{getThai(subtype.dateihcdx)}</p>
            <p className="excerpt" >Subtype:<h4 style={{color:`${fcolor(subtype.stype)}`}}>{subtype.stype}</h4></p>
            <p>ER {subtype.er}&#40;{subtype.ernum} % &#41;PgR {subtype.pgr}&#40;{subtype.pgrnum}% &#41; Her2:{subtype.her2} Ki67:{subtype.ki67num}%</p>
            <p className="postCredit">
                
                <Button className="btn-custom" onClick={() => navigate(`/subtype/view/${subtypeId}`)}>ดูรายละเอียด</Button>{' '}
                <SubtypePatient patientId={subtype.patientId} />
                <TimeAgo timestamp={subtype.date} />
            </p>
          
        </article>
    )
}

export default SubtypesExcerpt