const getRecommend = (subtype, agedx, stage, cT, cN, ctsize,M,grade) => {
  let recommendation = '';

  if (subtype === 'Triple Negative' && ctsize > 20 && (stage !== '4' )) {
    recommendation = `
    แนะนำให้ยาเคมีบำบัดนำก่อนการผ่าตัด \n 
    สูตรยาแนะนำจาก NCCN\n 
    ◊ ddACx4→ddpaclitaxel q 2 wks x4  \n 
      Doxorubicin 60 mg/m2 IV day 1\n
      Cyclophosphamide 600 mg/m2 IV day 1\n
      filgrastim 300 mg sc 24 hours post chemo for 5-7 days\n
      Cycled every 14 days for 4 cycles\n
      Followed by:\n
      Paclitaxel 175 mg/m2 by 3 h IV infusion day 1\n
      filgrastim 300 mg sc 24 hours post chemo for 5-7 days\n
       Cycled every 14 days for 4 cycles\n
    ◊ ddACx4→weekly paclitaxel x12  \n 
    Doxorubicin 60 mg/m2 IV day 1\n
      Cyclophosphamide 600 mg/m2 IV day 1\n
      filgrastim 300 mg sc 24 hours post chemo for 5-7 days\n
      Cycled every 14 days for 4 cycles\n
      Followed by:\n
      Paclitaxel 80 mg/m2 by 1 h IV infusion weekly for 12 weeks.\n         
   หลังผ่าตัดผลพยาธิวิทยามีเซลล์มะเร็งเหลืออยู่ ให้ยา  \n
   ◊ Capecitabine 1,000–1,250 mg/m2\n
      PO twice daily on days 1–14\n
      Cycled every 21 days for 6–8 cycles หรือ\n
      กรณีมี pathologic or likely pathologic variant of BRCA1/2\n
      Olaparib 300 mg PO twice daily \n
       Cycled every 28 days for 1 y\n
      ******************************\n
   ตามการวิจัย Keynote 522 \n     
    ◊ Pembrolizumab 200 mg IV Day 1  \n 
    ◊ Paclitaxel 80 mg/m2 IV Days 1, 8, 15  \n
    ◊ Carboplatin AUC 5 IV Day 1  Or \n 
    ◊ Carboplatin AUC 1.5 IV Days 1, 8, 15 \n
    Cycled every 21 days x 4 cycles (cycles 1–4) Followed by: \n 
    ◊ Pembrolizumab 200 mg IV Day 1 \n 
    ◊ Doxorubicin 60 mg/m2 IV Day 1 or Epirubicin 90 mg/m2 IV Day 1 \n 
    ◊ Cyclophosphamide 600 mg/m2 IV Day 1 \n 
    Cycled every 21 days x 4 cycles (cycles 5–8) \n 
    และตามด้วยการผ่าตัด \n 
    หลังผ่าตัดตามด้วย \n
    Adjuvant pembrolizumab 200 mg IV Day 1\n
   Cycled every 21 days x 9 cycles\n`;
  } else if (subtype === 'Her2-enriched' && ctsize > 20 && cN !== 'cN0'  && M==='0') {
    recommendation = `แนะนำให้ยาเคมีบำบัดนำก่อนการผ่าตัด \n 
    กรณีสิทธิ์กรมบัญชีกลาง ให้ \n 
    ACx4 →(Pertuzumab+Trastuzumab+Paclitaxel)x4 ตามด้วยการผ่าตัด \n 
    แล้วให้ Trastuzumab ต่ออีก 13 ครั้ง หรือ\n
    (Pertuzumab+Trastuzumab+Docetaxel)x4 ตามด้วยการผ่าตัด\n
    แล้วต่อด้วย (FEC+Trastuzumab) x3 ครั้ง\n
    แล้วให้ Trastuzumab ต่ออีก 10 ครั้ง `;
  } else if (subtype === 'Triple Negative' && (ctsize < 21&&ctsize>10) && cN === 'cN0'&& (stage !== '4' )) {
    recommendation = `แนะนำให้การผ่าตัดก่อนให้ยาเคมีบำบัดได้\n
    โดยหลังผ่าตัดถ้า pN0 พิจารณาให้ยาเคมีบำบัด\n
    ◊ TC\n
    Docetaxel 75 mg/m2 IV day 1\n
    Cyclophosphamide 600 mg/m2 IV day 1\n
     Cycled every 21 days for 4 cycles\n
    ก้า pN1 แนะนำ\n
    ◊ ACx4→weekly paclitaxel x12  \n 
      Doxorubicin 60 mg/m2 IV day 1\n
      Cyclophosphamide 600 mg/m2 IV day 1\n
      Cycled every 21 days for 4 cycles\n
      Followed by:\n
      Paclitaxel 80 mg/m2 by 1 h IV infusion weekly for 12 weeks.\n   
    `;
  }  else if (subtype === 'Luminal B negative'&& (ctsize > 20&&ctsize <51) && cN === 'cN0'&& grade==='Grade3') {
    recommendation = `อาจเลือกการผ่าตัดนำก่อน โดยต่อมน้ำเหลืองรักแร้ควรทำ Sentinel lymph node biopsy\n
    หลังผ่าตัดถ้าเป็นระยะ 2A pT2pN0M0 มีข้อบ่งชี้ใช้ Ribociclib ได้ ถ้าเข้าวัยหมดประจำเดือนแนะนำ Letrozole 7 ปี`;
  }  else if (subtype === 'Luminal B negative'&& (ctsize > 20&&ctsize <51) && cN === 'cN1') {
    recommendation = `ควรให้ยานำก่อนการผ่าตัด และถ้าต่อมน้ำเหลืองรักแร้ เปลี่ยนเป็น cN0 สามารถทำ Sentinel lymph node biopsy ได้\n
    พิจารณาทำ Frozen section เพราะถ้า node positive จะเป็นข้อบ่งชี้ในการทำ axillary dissection`;
  }else if (subtype === 'Luminal B negative'&& (ctsize > 20&&ctsize <51) && (cN === 'cN2'||cN === 'cN2'||cN === 'cN2a'||cN === 'cN2b'||cN === 'cN3'||cN === 'cN3a'||cN === 'cN3b'||cN === 'cN3c') && grade==='Grade3'&&agedx<46) {
    recommendation = `ควรให้ยานำก่อนการผ่าตัด และผ่าตัดต่อมน้ำเหลืองแบบ Axillary dissection  \n
     แนะนำใช้ Ovarian function suppression ฉีด 2-3 ปี \n
     โดยต้องยืนยันว่ารังไข่ยังทำงานอยู่คือยังมีประจำเดือนในช่วง 12 เดือนที่ผ่านมา หรือตรวจ FSH และ estradiole แล้วยังไม่เข้าเกณฑ์วัยหมดประจำเดือน\n
     และตรวจสอบระดับฮอร์โมน FSH>30,estradiole<10 เป็นระยะเพื่อยืนยันว่ายากดการทำงานรังไข่ได้มีประสิทธิภาพ จึงใช้ร่วมกับ Letrozole ได้\n
     ผู้ป่วยที่มีข้อห้ามใช้ Tamoxifen(thromboembolic disease or tamoxifen intolerance) และรังไข่ยังทำงานได้ก็เป็นข้อบ่งใช้ยากดการทำงานรังไข่ \n
      หรือแนะนำ Bilateral oophorectomy ในกรณีเข้าวัย pre-menopause ไม่ต้องการใช้รังไข่เพื่อการมีบุตร และสามารถทนต่อ menopausal side effectได้ \n
     ร่วมกับการใช้ Letrozole(2.5mg) 1x1 เป็นเวลา 10 ปี `;
  }else if (stage === '3a' || stage === '3b' || stage === '3c') {
    recommendation = 'แนะนำให้ยาเคมีบำบัดนำก่อนการผ่าตัด แล้วตามด้วยการผ่าตัด';
  } else if (stage === '3a' || stage === '3b' || stage === '3c') {
    recommendation = 'แนะนำให้ยาเคมีบำบัดนำก่อนการผ่าตัด แล้วตามด้วยการผ่าตัด';
  } else if (stage === '3a' || stage === '3b' || stage === '3c') {
    recommendation = 'แนะนำให้ยาเคมีบำบัดนำก่อนการผ่าตัด แล้วตามด้วยการผ่าตัด';
  } else if (subtype === 'Luminal B positive' && ctsize > 20 && cN !== 'cN0' && (stage !== '4' && (stage === '3a' || stage === '3b' || stage === '3c'))) {
    recommendation = 'แนะนำให้ยาเคมีบำบัดนำก่อนการผ่าตัด ';
  } else if (subtype === 'Luminal B negative' && ctsize > 20 && cN !== 'cN0' && (stage !== '4' && (stage === '3a' || stage === '3b' || stage === '3c'))) {
    recommendation = 'สามารถรักษาด้วยการผ่าตัดนำ ';
  }
  
  // Split the recommendation into lines
  const lines = recommendation.split('\n');

  // Map over the lines to create an array of JSX elements
  const jsxLines = lines.map((line, index) => (
    <div key={index} style={{ color: getColorForLine(line) }}>
      {line}
    </div>
  ));

  // Return the array of JSX elements
  return jsxLines;
};

// Define a function to determine the color for each line
const getColorForLine = (line) => {
  // Add your logic to determine the color based on the line content
  // For example, you can check if the line contains specific keywords
  const lowercaseLine = line.toLowerCase();

  if (line.includes('Capecitabine')||line.includes('TC')) {
    return 'red'; 
  }
  if (line.includes('filgrastim')) {
    return 'blue'; 
  }
  if (lowercaseLine.includes('ovarian')) {
    return 'blue'; 
  }
  if (line.includes('Olaparib')) {
    return 'green'; 
  }
  
  if (line.includes('ddACx4')) {
      return 'red'; 
    }
    if (lowercaseLine.includes('pembrolizumab')|| lowercaseLine.includes('paclitaxel') || lowercaseLine.includes('carboplatin')) {
      return 'red';
    }
    if(line.includes('Cyclophosphamide')||line.includes('Doxorubicin')||line.includes('Docetaxel')){
      return 'red';
    }

  // Default color if no specific condition is met
  return 'black';
};

export { getRecommend };
