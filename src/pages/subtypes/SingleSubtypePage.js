import SubtypePatient from "./SubtypePatient";
import TimeAgo from "./TimeAgo";

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useGetSubtypesQuery } from "./subtypeSlice";
import { getThai } from "../../utility/getThai";
import { useGetCstagesQuery } from "../cstages/cstagesSlice";
import { Button, Col, Row } from "reactstrap";
import { getRecommend } from "../../utility/getRecommend";
import { useGetPatientsQuery } from "../patients/patientsSlice";
import CarboplatinCalculator from "../../components/AUCcal";
import { useEffect, useState } from "react";



const SingleSubtypePage = () => {
    const { subtypeId } = useParams();
    const [showCalculator, setShowCalculator] = useState(false);
    const [showOFS, setShowOFS] = useState(false);
    const [showZol, setShowZol] = useState(false);
    const [showEndocrine, setShowEndocrine] = useState(false);
    const [showZoledronic, setShowZoledronic] = useState(false);
    const [calculatorResult, setCalculatorResult] = useState(null);
    const { data: cstages, isLoading: isLoadingCstage, isSuccess, isError, error } = useGetCstagesQuery('getCstages');
    const { subtype, isLoading } = useGetSubtypesQuery('getSubtypes', {        
    selectFromResult: ({ data, isLoading }) => ({
        subtype: data?.entities[subtypeId],
        isLoading
    }),
});
    const { patient: brca } = useGetPatientsQuery('getPatients', {
    selectFromResult: ({ data, isLoading }) => ({
      patient: data?.entities[subtype?.patientId], // Fetch patient data based on subtype.patientId
      isLoading,
    }),
  });

  useEffect(() => {
    // Do any additional processing or side effects based on calculatorResult
    // This block will run every time calculatorResult changes
    console.log('Calculator Result:', calculatorResult);
  }, [calculatorResult]);
if (isLoading) return <p>Loading...</p>;

if (!subtype) {
    return (
        <section>
            <h2>Subtype not found!</h2>
        </section>
    );
}

let content;
let clinicalStage;
let tumorsize;
let TNM;
let grade;
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
if (isLoadingCstage) {
    content = <p>Loading...</p>;
} else if (isSuccess) {
    const cstagesentities = cstages?.entities || {};
    const allCstageIds = cstages?.ids || [];
    let filteredCstageIds = allCstageIds;

    // Filter by subtype.cstageId 
    if (subtype.cstageId) {
        filteredCstageIds = allCstageIds?.filter(cstageId => {
            const cstage = cstagesentities[cstageId];
            return cstage && String(cstage?.id) === subtype.cstageId;
        });
    } 
    
    const cstageId = filteredCstageIds[0];
    const cstage = cstagesentities[cstageId];
    clinicalStage = cstage?.stage;
    tumorsize=cstage?.ctsize;
    grade=cstage?.grade;
    TNM=`${cstage?.cT} ${cstage?.cN} ${cstage?.M}`
    content = filteredCstageIds?.map((cstageId) => {
        const cstage = cstagesentities[cstageId];
        
        return (
            <div key={cstageId}>
                <div style={{color:'green'}}>{brca.agedx<46?'แนะนำตรวจยีน BRCA1/2':''}</div>
               <div> {getRecommend(subtype.stype,brca.agedx,cstage.stage,cstage.cT,cstage.cN,cstage.ctsize,cstage.M,cstage.grade)} </div>               
            </div>
        );
    });
} else if (isError) {
    content = <p>{error}</p>;
}
const handleToggleOFS = () => {
    setShowOFS(!showOFS)   
  };
  const handleToggleZol = () => {
    setShowZol(!showZol)   
  };
  const handleToggleZoledronic = () => {
    setShowZoledronic(!showZoledronic)   
  };
  const handleToggleEndocrine = () => {
    setShowEndocrine(!showEndocrine)   
  };
const handleToggleCalculator = () => {
    setShowCalculator(!showCalculator)
    setCalculatorResult(null);
  };
  const handleCalculatorResultChange = ({ GFR, carbodose, BMI }) => {
    // Limit the number of digits after the dot to two
    const formattedGFR = GFR.toFixed(2);
    const formattedCarbodose = carbodose.toFixed(2);
    const formattedBMI = BMI.toFixed(2);

    console.log('Received GFR:', formattedGFR);
    console.log('Received Carboplatin Dose:', formattedCarbodose);
    console.log('Received BMI:', formattedBMI);

    setCalculatorResult({ GFR: formattedGFR, carbodose: formattedCarbodose, BMI: formattedBMI });
  };
// Render your content here...

    return (
        <article>
            <Row>
                <Col>
             <p>วันที่รายงานผล :{getThai(subtype.dateihcdx)}</p>
             <p>วินิจฉัยเมื่ออายุ : {brca.agedx} ปี</p>
             <p>Clinical stage : {clinicalStage} &#40;{TNM}&#41;</p>
             <p>Grade : {grade}</p>
             <p>ก้อนขนาด : {tumorsize} มิลลิเมตร</p>
            <p className="excerpt" style={{color:`${fcolor(subtype.stype)}`}}>Subtype:{subtype.stype}</p>
            <p>ER {subtype.er}&#40;{subtype.ernum} % &#41; PgR {subtype.pgr}&#40;{subtype.pgrnum}% &#41;Her2:{subtype.her2} Ki67: {subtype.ki67num}%</p>
            <p className="postCredit">
                <Link to={`/subtype/edit/${subtype.id}`}>Edit subtype</Link>
                <SubtypePatient patientId={subtype.patientId} />                        
                <TimeAgo timestamp={subtype.date} />           
                
            </p>
            {subtype.stype==='Triple Negative'&&<img src='/assets/LeadTeam2566.png'
            style={{ width: '100%', height: 'auto' }}
             alt="TNBC" />}
            {subtype.stype==='Triple Negative'&&<><img src='/assets/TNBC.png'
            style={{ width: '100%', height: 'auto' }}
             alt="TNBC2" /><img src='/assets/HRnegchemo.png'
             style={{ width: '100%', height: 'auto' }}
              alt="TNBC2" /></> }  
             {subtype.stype==='Luminal B negative'&&<img src='/assets/cdk46.png'
            style={{ width: '100%', height: 'auto' }}
             alt="Luminal B negative" /> }  
             {subtype.stype==='Luminal B negative'&&<img src='/assets/HRpos.png'
            style={{ width: '100%', height: 'auto' }}
             alt="Luminal B negative1" /> } 
                {subtype.stype==='Luminal B negative'&&<img src='/assets/HR.png'
            style={{ width: '100%', height: 'auto' }}
             alt="Luminal B negative1" /> } 
             {(subtype.stype==='Luminal B negative'||subtype.stype==='Luminal B positive'||subtype.stype==='Luminal A')&&<img src='/assets/luminalchemo.png'
            style={{ width: '100%', height: 'auto' }}
             alt="Luminal B negative1" /> } 
             
            </Col>
            <Col>
            <div > {content}</div>
            {subtype.stype==='Triple Negative'&&(<> <Button style={{marginTop:'10px'}} onClick={handleToggleCalculator}>คำนวณ Carboplatin dose</Button>
{showCalculator && <CarboplatinCalculator onResultChange={handleCalculatorResultChange}/>}
</>)}
<div>
            {showCalculator&&calculatorResult !== null && (
              <div>
                <h3>Calculated GFR:</h3>
                <p>{calculatorResult.GFR}</p>
                <h3>Calculated Carboplatin Dose:</h3>
                <p>{calculatorResult.carbodose}</p>
                <h3>BMI(kg/m²):</h3>
                <p>{calculatorResult.BMI}</p>
              </div>
            )}
          </div>
          <div>{subtype.stype==='Her2-enriched'&&<img src='/assets/HRnegchemo.png'
            style={{ width: '100%', height: 'auto' }}
             alt="Luminal B positive" />}</div>
          <div>{subtype.stype==='Luminal B positive'&&<><img src='/assets/her2algo.png'
            style={{ width: '100%', height: 'auto' }}
             alt="Luminal B positive" /><img src='/assets/herceptin.png'
            style={{ width: '100%', height: 'auto' }}
             alt="Luminal B positive" /><img src='/assets/hercs.png'
             style={{ width: '100%', height: 'auto' }}
              alt="Luminal B positive" /></> }  </div>
            <div>{subtype.stype==='Luminal B negative'&&brca.agedx<46&&<img src='/assets/premensOFS.png'
            style={{ width: '100%', height: 'auto' }}
             alt="Luminal B negative" /> }  </div>
             {(subtype.stype==='Luminal B negative'||subtype.stype==='Luminal B positive')&&brca.agedx<60&&<><Button style={{marginTop:'10px',width: '100%'}} onClick={handleToggleOFS}>เกี่ยวกับ OFS</Button>
          {showOFS&&<p>OFS เป็นยาที่ใช้เฉพาะในผู้ป่วยวัยก่อนหมดประเดือน ยากลุ่มนี้เรียกว่ายายับยั้งการทำงานของรังไข่ (Ovarian Suppression) 
ควรให้ในผู้ป่วยรายใด? จำเป็นแค่ไหน? 🤔😕❤
หลักการของยานี้คือ การทำให้ร่างกายมีระดับฮอร์โมนเพศหญิง (เอสโตรเจน/โปรเจสเตอโรน) ลดลงโดยไปยับยั้งการทำงานของรังไข่ ✋🙅‍♂️🙅‍♀️
ยากลุ่มนี้ออกฤทธิ์โดยทำลายหรือยับยั้งการแบ่งตัวของเซลล์มะเร็งเต้านมที่มีตัวรับฮอร์โมน เฉพาะในผู้ป่วยที่ยังอยู่ในวัยก่อนหมดประจำเดือน หรือผู้ป่วยอายุน้อยที่รังไข่ยังทำงานอยู่ ยากลุ่มนี้จะไม่มีประโยชน์ในผู้ป่วยวัยหมดประจำเดือน🚶‍♀️🧍‍♀️🧎‍♀️
การยับยั้งการทำงานของรังไข่ ทำได้ 3 วิธีการ ได้แก่ 
1. การฉายรังสีที่รังไข่ (ปัจจุบันไม่แะนำ เนื่องจากประสิทธิภาพไม่แน่นอน และมีผลข้างเคียงได้)
2. การผ่าตัดรังไข่ออกทั้งหมดสองข้าง (Bilateral oophorectomy) เป็นวิธีการที่ได้ผลแน่นอน แต่ผู้ป่วยต้องรับการผ่าตัด และเป็นผลถาวร กลับคืนไม่ได้ ซึ่งอาจทำให้มีผลข้างเคียงมากในผู้ป่วยบางราย
3. การให้ยากดการทำงานของรังไข่ (LHRH Agonist) มีข้อดีคือ ประสิทธิภาพสูง แต่ไม่ถาวร เมื่อหยุดให้ยา รังไข่จะกลับมาทำงานได้👩‍⚕️🧑‍⚕️👩‍⚕️
ในที่นี้จะกล่าวถึงเฉพาะการให้ยากดการทำงานของรังไข่ ยากลุ่มนี้ได้แก่ ยา Goserelin (Zoladex ฉีดเข้าใต้ผิวหนัง) และยา Leuprolide (Lupron ฉีดเข้ากล้าม) การให้ยากลุ่มนี้ ให้ทุก 12 สัปดาห์ 
โดยให้ร่วมกับยา Tamoxifen  หรือยา Aromatase inhibitor  มีเฉพาะรายเท่านั้นที่ให้ยากดรังไข่เพียงตัวเดียว เช่นในรายที่แพ้ยา Tamoxifen 💗💓💗
การให้ยากลุ่มนี้ จะพิจารณาให้ในผู้ป่วยมะเร็งเต้านมประเภทที่มีตัวรับฮอร์โมนเพศ ที่มีความเสี่ยงที่โรคมะเร็งกลับมาสูง ได้แก่ ก้อนมะเร็งขนาดใหญ่ มีการแพร่กระจายไปต่อมน้ำเหลืองที่รักแร้ เป็นมะเร็งประเภทแบ่งตัวเร็ว 😈😡😥
การให้ยากดรังไข่ จะให้ควบคู่กับยา Tamoxifen หรือ Aromatase inhibitor เป็นระยะเวลาอย่างน้อย 2-3 ปี โดยมีเหตุผลว่า เป็นการเพิ่มประสิทธิภาพในการควบคุมโรคช่วง 2-3 ปี จากนั้นจึงให้ยา Tamoxifen ต่อไปอีก 5-10 ปี ⌛🌈🌝
อีกกรณีคือ ภายหลังการได้รับเคมีบำบัดในผู้ป่วยอายุน้อย อาจยังมีประจำเดือนอยู่ หรือรังไข่ยังทำงานอยู่ (จากการตรวจระดับฮอร์โมนในเลือด) มีงานวิจัยที่แสดงประสิทธิภาพในการควบคุมและป้องกันโรคกลับเป็นซ้ำถ้าให้ยากดการทำงานรังไข่ร่วมกับยา Tamoxifen ภายหลังที่ผู้ป่วยรับยาเคมีบำบัดครบแล้ว 🌺🌻🌷
ผลข้างเคียงหลักๆ คือ ผลจากการขาดฮอร์โมน ได้แก่ อาการวัยทอง ภาวะกระดูกพรุน ซึ่งมีแนวทางและวิธีการในการป้องกัน หรือลดผลข้างเคียงเหล่านี้ได้ 🙏🙏🙏</p>}</>}
{(subtype.stype==='Luminal B negative'||subtype.stype==='Luminal B positive')&&<><Button style={{marginTop:'10px',width: '100%'}} onClick={handleToggleZol}>เกี่ยวกับ Bisphosphonates</Button>
{showZol&&<p>ผู้ป่วยมะเร็งเต้านมที่อยู่ในวัยหมดประจำเดือนหรือได้รับยาระงับการทำงานรังไข่ การให้ยาเสริมสร้างมวลกระดูกกลุ่ม Bisphosphonates ทั้งแบบรับประทานและแบบฉีดเข้าเส้นเลือด สามารถลดโอกาสมะเร็งกลับเป็นซ้ำ และเพิ่มโอกาสหายจากโรคได้ 🥰🙂😊
แต่เดิมยาที่ให้เพื่อช่วยในการเสริมสร้างมวลกระดูก (bone-modifying agents) เป็นกลุ่มของยา Bisphosphonates ที่ให้เพื่อรักษาภาวะกระดูกพรุนและเพื่อเสริมการรักษาภาวะมะเร็งชนิดต่างๆที่แพร่กระจายไปกระดูกรวมทั้งมะเร็งเต้านมระยะแพร่กระจายด้วย 😞
ในการศึกษากลไกการออกฤทธิ์ของยากลุ่ม Bisphosphonates พบว่ายากลุ่มนี้สามารถเสริมสร้างมวลกระดูกโดยการยับยั้งการทำงานของเซลล์ที่ย่อยสลายมวลกระดูก (Osteoclast) และเมื่อทดสอบในเซลล์มะเร็งในห้องทดลองพบว่าออกฤทธิ์ทำลายเซลล์มะเร็งโดยทำให้เซลล์มะเร็งตายด้วยกลไกต่างๆเช่น Apoptosis ยาในกลุ่มนี้ได้แก่ยารับประทานชื่อ Clodronate และ Ibandronate ส่วนยาแบบฉีดเข้าเส้นเลือดชื่อ Zoledronic acid โดยยา Zoledronic acid เป็นยามีประสิทธิภาพสูงที่สุดเป็นร้อยเท่าเมื่อเทียบกับยาที่เป็นแบบรับประทาน 🎀😊😃
ต่อมาได้มีหลายงานวิจัยที่ให้ยากลุ่มนี้เป็นการรักษาเสริม (เพิ่มจากการรักษาหลักที่ได้รับ) ในผู้ป่วยมะเร็งเต้านมระยะเริ่มแรกที่ยังไม่มีการแพร่กระจาย จากข้อมูลหลายงานวิจัยที่นำมาวิเคราะห์ทำให้ได้ข้อสรุปเป็นคำแนะนำจากสมาคมมะเร็งวิทยาของสหรัฐอเมริกา แคนาดา สหราชอาณาจักรและประเทศทางยุโรปในปี พ.ศ. 2564 ว่า การให้ยาหนึ่งในสามตัวนี้ในผู้ป่วยมะเร็งเต้านมวัยหมดประจำเดือนหรือได้รับยากดการทำงานของรังไข่ จะสามารถป้องกันการกลับมาเป็นซ้ำของมะเร็งเต้านม และทำให้มีอัตราการรอดชีวิตสูงขึ้น ที่น่าสนใจมากคือการให้ยากลุ่มนี้เสริมจากการรักษาที่ได้รับ ได้ผลในมะเร็งเต้านมทุกชนิดทั้งชนิดมีตัวรับฮอร์โมน ชนิดเฮอร์ทู และชนิดทริปเปิลเนกาตีฟ 👍👨‍⚕️❤
ผมขอสรุปคำแนะนำสำหรับผู้ป่วยมะเร็งเต้านมระยะที่ 1-3 ในการให้ยากลุ่มนี้ดังต่อไปนี้
ควรแนะนำให้ยานี้เสริมในผู้ป่วยมะเร็งเต้านมทุกชนิดที่อยู่ในวัยหมดประจำเดือนทั้งตามธรรมชาติหรือรังไข่หยุดทำงานจากการรักษา
⏰ควรเริ่มให้ยาภายใน 3 เดือนหลังการผ่าตัดหรือภายใน 2 เดือนหลังยาเคมีบำบัดครบคอร์ส⏰
ยาที่ให้พิจารณาจากวิธีการรับยา ผลข้างเคียง โรคร่วม ความสะดวกในการบริหารยา และค่าใช้จ่าย โดยให้เลือกจากหนึ่งในสามตัวยาดังนี้ 1) ยา Clodronate รับประทาน 1600 มก.ต่อวัน (800 มก.x 2 แคปซูล) เป็นเวลา 2-3 ปี 2) ยา Ibandronate รับประทาน 50 มก.ต่อวันเป็นเวลา 3 ปี 3) ยา Zoledronic acid ฉีดเข้าเส้น 4 มก.ต่อครั้ง ทุก 3 เดือนเป็นเวลา 2 ปี หรือทุก 6 เดือนเป็นเวลา 3 ปี
โดยสรุป แม้ในประเทศไทยยังไม่มีการกำหนดให้ยากลุ่มนี้เป็นการรักษาเสริมสำหรับผู้ป่วยมะเร็งเต้านม แต่เนื่องจากประสิทธิภาพและประโยชน์ในการรักษาโรคดังกล่าวมา ผู้ป่วยมะเร็งเต้านมที่อยู่ในเกณฑ์ควรปรึกษาแพทย์ที่ดูแล เพื่อพิจารณาการให้ยาซึ่งนอกจากสามารถเสริมสร้างมวลกระดูก ป้องกันภาวะกระดูกพรุน ที่สำคัญคือ สามารถเพิ่มโอกาสในการหายจากโรคร้ายนี้ได้ครับ 🙏🙏🙏
อ้างอิงจาก https://ascopubs.org/doi/10.1200/JCO.21.02647</p>}</>}
{(subtype.stype==='Luminal B negative'||subtype.stype==='Luminal B positive')&&<><Button style={{marginTop:'10px',width: '100%'}} onClick={handleToggleZoledronic}>เกี่ยวกับ Zoledronic acid</Button>
{showZoledronic&&<p>Zoledronic acid เป็นยา bisphosphonate ที่มักใช้ในการจัดการ bone-related conditions ในผู้หญิง postmenopausal ที่มี breast cancer เช่น การป้องกัน skeletal-related events ในผู้ที่มี bone metastases หรือเป็น adjuvant therapy เพื่อลดความเสี่ยงของมะเร็งกลับเป็นซ้ำ ในบางกรณี 

ในประเทศไทย แนวทางการใช้ zoledronic acid ในผู้ป่วย postmenopausal breast cancer โดยทั่วไปจะสอดคล้องกับมาตรฐานสากล โดยคำนึงถึงสภาพของผู้ป่วยโดยเฉพาะ การมีอยู่ของ bone metastases และแผนการรักษาโดยรวม

**ข้อบ่งชี้สำหรับการใช้งานใน breast cancer:
1. การป้องกัน skeletal-related events (SREs) ในคนไข้ bone metastases ที่มี Osteolytic lesion จาก X-ray หรือ CT scan
2. การบำบัดแบบเสริมในสตรี postmenopausal ที่มี breast cancer ในระยะเริ่มแรก เพื่อปรับปรุงผลลัพธ์ของโรค โดยเฉพาะอย่างยิ่งในผู้ที่มีความเสี่ยงสูงต่อการกลับเป็นซ้ำ💗💓💗

**ข้อห้าม:**✋🙅‍♂️🙅‍♀️
1. ภาวะแคลเซียมในเลือดต่ำ: ผู้ป่วยต้องแก้ไขระดับ calcium ก่อนเริ่มการรักษา
2. การด้อยค่าของไต: แนะนำให้ใช้ความระมัดระวังในผู้ป่วยที่มี creatinine clearance &lt; 35 มล./นาที และห้ามใช้ในผู้ที่มี renal impairment รุนแรง เนื่องจากมีความเสี่ยงต่อ renal toxicity
3. การตั้งครรภ์: ห้ามใช้กรด Zoledronic ในหญิงตั้งครรภ์เนื่องจากอาจเป็นอันตรายต่อทารกในครรภ์
4. รู้จัก hypersensitivity ถึง zoledronic acid หรือ bisphosphonates อื่นๆ

🔯**ปริมาณ:**🔯 🙅‍♂️🙅‍♀️
สำหรับการป้องกัน skeletal-related events คือในผู้ป่วยที่มีการแพร่กระจายไปกระดูกจะเกิดอาการแทรกซ้อนจากมะเร็งทำลายกระดูกได้หลายประการเช่นกระดูกหักเองโดยไม่ได้กระแทกอะไรแรง ถ้าเป็นกระดูกสันหลังก็อาจทับไขสันหลังเป็นอัมพาตครึ่งท่อนล่าง ปวดกระดูกมากจนต้องไปฉายแสง ภาวะแคลเซี่ยมสูงจากการที่มะเร็งย่อยสลายกระดูก ซึ่งจะทำให้มีอาการซึม สับสน และไตทำงานผืดปกติ ขนาดยา โดยทั่วไปคือ 4 มก. บริหารโดยฉีดเข้าหลอดเลือดดำในเวลาไม่น้อยกว่า 15 นาที ทุกๆ 4 สัปดาห์หรือ 12 สัปดาห์ก็ได้(งานวิจัยใหม่)

ในการรักษาแบบเสริมสำหรับมะเร็งเต้านมระยะเริ่มต้น  ขนาดยา อาจแตกต่างกันไป เกณฑ์วิธีบางอย่างแนะนำ 4 มก. ฉีดเข้าหลอดเลือดทุก 6 เดือนเป็นเวลาสูงสุด 3-5 ปี (nccn guide line)ขึ้นอยู่กับการทดลองทางคลินิกหรือแนวทางปฏิบัติที่กำลังปฏิบัติตาม อย่างเช่น ASCO ก็ลดเหลือ 2 ปี ทุก 3 เดือนหรือ 3 ปี ทุก 6 เดือน

🔯**ระยะเวลา:**🔯😊
ระยะเวลาของการบำบัดอาจแตกต่างกันไปขึ้นอยู่กับว่าผู้ป่วยเป็นระยะใด กล่าวคือ:
1. สำหรับผู้ที่มีมะเร็งแพร่กระจายไปกระดูก โดยทั่วไปการรักษาจะดำเนินต่อไปตราบใดที่ผู้ป่วยได้รับประโยชน์และทนต่อการรักษาได้ดี การให้ยาอาจฉีดทุก 3-4 สัปดาห์หรือทุก 12 สัปดาห์(3 เดือน)ก็ได้ แพทย์พิจารณาตามความพร้อมของผู้ป่วยแต่ละราย หวังผลไม่ให้เกิดกระดูกหักอันเนื่องมาจากมะเร็งที่แพร่กระจายไปกระดูก
2. ถ้าเป็นการให้เพื่อลดโอกาสกลับเป็นซ้ำ ระยะเวลาการรักษาใน nccn  ให้ 3-5 ปี แต่มีข้อมูลล่าสุดของการวิจัยชื่อ SUCCESS ให้แค่ 2 ปี ก็พอ โดยฉีดแบบทุก 3 เดือน ซึ่ง ASCO guideline  ก็อ้างถึงการวิจัยนี้ บางการวิจัยก็ให้ทุก 6 เดือน เป็นเวลา 3 ปี

🌠สิ่งสำคัญคือต้องติดตามผู้ป่วยเพื่อดูผลข้างเคียง ได้แก่ osteonecrosis ของ jaw (ONJ)กระดูกกรามตาย, การทำงานของไต และ สมดุลเกลือแร่ ผู้ป่วยควรได้รับการเสริม แคลเซียมและ วิตามินดี  เพื่อป้องกันภาวะแคลเซี่ยมในเลือดต่ำ

ถ้ามีภาวะกระดูกพรุน ตรวจ DEXA  axial bone แล้ว ก็เป็นการให้เพื่อรักษากระดูกพรุนไปด้วยเลย
พบทันตแพทย์ตรวจรักษาให้เรียบร้อยก่อนเริ่มยาเพื่อลดการเกิดภาวะแทรกซ้อนกระดูกกรามตาย(ONJ=osteonecrosis of jaw)
ตรวจการทำงานของไต ไม่ต่ำ และตรวจติดตามทุกครั้งก่อนรับยา เพราะมีผลข้างเคียงเกิดไตวายเฉียบพลัน ได้ 

โปรดทราบว่าคำแนะนำเฉพาะสำหรับการใช้ zoledronic acid อาจแตกต่างกันไปขึ้นอยู่กับการวิจัยล่าสุด แนวทางปฏิบัติ และสถานะสุขภาพของผู้ป่วยแต่ละราย
</p>}</>}
{(subtype.stype==='Luminal B negative'||subtype.stype==='Luminal B positive')&&<><Button style={{marginTop:'10px',width: '100%'}} onClick={handleToggleEndocrine}>เกี่ยวกับ Hormonal treatment</Button>
{showEndocrine&&<p>ผู้ป่วยมะเร็งเต้านมที่เป็นมะเร็งชนิดมีตัวรับฮอร์โมนเป็นบวก (Luminal Subtype) มีประมาณ 80 % การได้รับยาต้านฮอร์โมนในรูปแบบของยาทาม๊อกซิเฟน (Tamoxifen) หรือยาต้านอะโรมาเตส (Letrozole, Anastrazole, Exemestane) บางรายให้ร่วมกับยายับยั้งการทำงานรังไข่(Goserelin, Leuprorelin) และยามุ่งเป้า CDK4/6 inhibitor จึงเป็นสิ่งจำเป็นและมีประโยชน์เพราะช่วยลดโอกาสโรคกลับเป็นซ้ำได้กว่า 30% และลดอัตราการเสียชีวิตจากมะเร็งได้กว่า 40%
ในผู้ป่วยวัยหมดประจำเดือน (อายุมากกว่า 60 ปี หรือ อายุน้อยกว่า 60 ปีที่ไม่มีประจำเดือนมาติดต่อกันอย่างน้อย 1 ปีโดยที่ไม่เคยหรือไม่อยู่ระหว่างรับยาเคมีบำบัดและยาต้านฮอร์โมนโดยต้องมีการตรวจเลือดเพื่อหาระดับฮอร์โมนเพศในการยืนยัน หรือ ได้รับการผ่าตัดรังไข่ออกทั้งสองข้าง) ยาฮอร์โมนบำบัดที่ควรให้คือยาต้านอะโรมาเตส (Letrozole, Anastrazole, Exemestane) เนื่องจากเป็นยาที่มีประสิทธิภาพเหนือกว่ายาทาม๊อกซิเฟน ยกเว้นแต่กรณีที่แพ้หรือมีผลข้างเคียงจากยาต้านอะโรมาเตสมาก ได้แก่อาการปวดข้อนิ้วมือ ข้อติดเป็นนิ้วล้อกมากๆ ซึ่งถ้าได้ทำกายภาพบำบัดหรือรับการรักษาเต็มที่แล้วไม่ดีขึ้นจึงพิจารณาเปลี่ยนเป็นยาทาม๊อกซิเฟน
ในผู้ป่วยวัยก่อนหมดประจำเดือน (อายุน้อยกว่า 60 ปีที่ยังมีประจำเดือนมา หรือไม่มีประจำเดือนติดต่อกัน 1 ปีแต่การตรวจเลือดเพื่อหาระดับฮอร์โมนเพศยังอยู่ในเกณฑ์ที่แสดงว่ารังไข่ยังทำงานอยู่) ยาฮอร์โมนบำบัดที่ควรให้คือ ยาทาม๊อกซิเฟน (Tamoxifen)โดยในผู้ป่วยที่มีความเสี่ยงของโรคกลับมาเป็นซ้ำสูง ควรได้รับยาฉีดเพื่อระงับการทำงานรังไข่ร่วมด้วยพร้อมกับยาทาม๊อกซิเฟน หรือยาต้านอะโรมาเตส เพื่อลดการกลับเป็นซ้ำและเพิ่มโอกาสหายขาดจากโรค
แต่เดิมระยะเวลาของการได้รับยาต้านฮอร์โมนตามมาตรฐานคือ 5 ปี แต่การวิจัยหลายงานที่พบว่าพบว่าในผู้ป่วยที่มีความเสี่ยงสูงที่โรคจะกลับมา การให้ยานานกว่านั้น โดยให้เป็น 7-10 ปีสามารถเพิ่มโอกาสหายจากโรคได้มากขึ้น แนวทางมาตรฐานสากลที่มีประสิทธิภาพสูงสุดมีดังนี้
🔯😊มะเร็งเต้านมระยะที่ 0 (in situ) ถ้ารับการรักษาแบบผ่าตัดสงวนเต้านม ให้ยาทาม๊อกซิเฟน (Tamoxifen) 5 ปี แต่ถ้าผ่าตัดเต้านมออกทั้งหมด ไม่ต้องทานยา
🔯😊มะเร็งเต้านมระยะที่ 1 ในวัยก่อนหมดประจำเดือน ให้ยาทาม๊อกซิเฟน 5 ปี
🔯😊มะเร็งเต้านมระยะที่ 1 ในวัยหมดประจำเดือน ให้ยาต้านอะโรมาเตส (Letrozole, Anastrazole, Exemestane) 5 ปี
🔯😊มะเร็งเต้านมระยะที่ 2 ในวัยก่อนหมดประจำเดือนในกลุ่มความเสี่ยงไม่สูง ให้เริ่มด้วยทานยาทาม๊อกซิเฟน หลังจากได้ยาทาม๊อกซิเฟนครบ 2-3 ปีให้ประเมินว่าเป็นวัยหมดประจำเดือนหรือไม่(จากเกณฑ์ข้างบน) ถ้ายังไม่เป็นวัยหมดประจำเดือน ให้ทานยาทาม๊อกซิเฟนต่อจนครบ 5 ปี แล้วประเมินว่าเป็นวัยหมดประจำเดือนหรือไม่ ถ้ายังไม่เป็นวัยหมดประจำเดือน ให้ทานยาทาม๊อกซิเฟนอีก 5 ปี แต่ถ้าเป็นวัยหมดประจำเดือนแล้ว ให้ทานยาต้านอะโรมาเตสอีก 5 ปี (รวมทานยาต้านฮอร์โมนทั้งหมด 7-10 ปี)
🔯😊มะเร็งเต้านมระยะที่ 2 ในวัยก่อนหมดประจำเดือนที่อยู่ในกลุ่มเสี่ยงสูง ให้ฉีดยาระงับรังไข่ร่วมด้วย 2-3 ปีแรกและทานยาทาม๊อกซิเฟนหรือยาต้านอะโรมาเตสร่วมด้วย โดยบางรายที่มีความเสี่ยงสูงมากให้ร่วมกับการทานยามุ่งเป้า CDK4/6 inhibitor (Amebaciclib) 2 ปี(เฉพาะรายที่ Her2 negative) หลังจากได้ยาครบ 2-3 ปีให้ประเมินว่าเป็นวัยหมดประจำเดือนหรือไม่ ถ้ายังไม่เป็นวัยหมดประจำเดือน ให้ทานยาทาม๊อกซิเฟนต่อจนครบ 5 ปี ่ถ้าเป็นวัยหมดประจำเดือนแล้ว ให้ทานยาต้านอะโรมาเตสอีก 7 ปี ในผู้ที่ทานยาทาม๊อกซิเฟนครบ 5 ปีแล้ว ให้ประเมินว่าเป็นวัยหมดประจำเดือนหรือไม่ ถ้ายังไม่เป็นวันหมดประจำเดือน ให้ทานยาทาม๊อกซิเฟนต่ออีก 5 ปี ถ้าเป็นวัยหมดประจำเดือนแล้วให้ทานยาต้านอะโรมาเตสต่ออีก 5 ปี (รวมทานยาต้านฮอร์โมนทั้งหมด 10 ปี)
🔯😊มะเร็งเต้านมระยะที่ 2 ในวัยหลังหมดประจำเดือน ให้ยาต้านอะโรมาเตส (Letrozole, Anastrazole, Exemestane) 5 ปี ในกรณีที่ไม่กระจายเข้าต่อมน้ำเหลือง และ 7 ปีถ้ามีการกระจายเข้าต่อมน้ำเหลือง
🔯😊มะเร็งเต้านมระยะที่ 3 ในวัยก่อนหมดประจำเดือน ให้ฉีดยาระงับรังไข่ร่วมด้วย 2-3 ปีแรกและทานยาต้านอะโรมาเตสและทานยามุ่งเป้า CDK4/6 inhibitor(Amebaciclib) 2 ปี(เฉพาะรายที่ Her2 negative) หลังจากได้ยาครบ 2-3 ปีให้ประเมินว่าเป็นวัยหมดประจำเดือนหรือไม่ ถ้ายังไม่เป็นวัยหมดประจำเดือน ให้ทานยาทาม๊อกซิเฟนต่อจนครบ 5 ปี ่ถ้าเป็นวัยหมดประจำเดือนแล้ว ให้ทานยาต้านอะโรมาเตสอีก 7 ปี ในผู้ที่ทานยาทาม๊อกซิเฟนครบ 5 ปีแล้ว ให้ประเมินว่าเป็นวัยหมดประจำเดือนหรือไม่ ถ้ายังไม่เป็นวันหมดประจำเดือน ให้ทานยาทาม๊อกซิเฟนต่ออีก 5 ปี ถ้าเป็นวัยหมดประจำเดือนแล้วให้ทานยาต้านอะโรมาเตสต่ออีก 5 ปี (รวมทานยาต้านฮอร์โมนทั้งหมด 10 ปี)
🔯😊มะเร็งเต้านมระยะที่ 3 ในวัยหลังหมดประจำเดือน ให้ทานยาต้านอะโรมาเตส (Letrozole, Anastrazole, Exemestane) 7 ปี

เนื่องจากการรับยาต้านฮอร์โมนติดต่อกันเป็นระยะเวลานาน แพทย์จำเป็นต้องประเมินผลข้างเคียงและวางแนวทางในการป้องกันและรักษาภาวะแทรกซ้อนที่เกิดขึ้นอย่างสม่ำเสมอเพื่อให้ผู้ป่วยสามารถรับยาได้ครบเพื่อให้มีโอกาสหายขาดจากโรคร้ายนี้ได้มากที่สุด รวมถึงการให้คำแนะนำเกี่ยวกับ Drug interaction ระหว่างยา เช่นยาทาม๊อกซิเฟนกับยารักษาโรคซิมเศร้าบางกลุ่ม🙏🙏🙏
ข้อมูลอ้างอิงจาก https://pubmed.ncbi.nlm.nih.gov/35623026/
</p>}</>}
            </Col>
            </Row>
            
        </article>
    )
}

export default SingleSubtypePage