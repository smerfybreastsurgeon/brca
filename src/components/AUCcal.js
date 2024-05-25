// CarboplatinCalculator.js

import React, {useState } from 'react';
import { Button, Input, Label } from 'reactstrap';

const CarboplatinCalculator = ({ onResultChange }) => {
  const [bw, setBw] = useState(0);
  const [ht, setHeight] = useState(0);
  const [cr, setCr] = useState(0);
  const [sex, setSex] = useState('');
  const [age, setAge] = useState(0);
  const [targetAUC, setTargetAUC] = useState(0);
 
  
  const calculateCarboDose = () => {
    let k = sex === 'F' ? 0.85 : 1;
    let BMI = bw / ((ht / 100) * (ht / 100));
    let idwF = 45.5 + 2.3 * ((ht - 150) / 2.5);
    let idwM = 50 + 2.3 * ((ht - 150) / 2.5);
    let idw = sex === 'F' ? idwF : idwM;
    let adjbw = idw + 0.4 * (bw - idw);
    let wt = BMI > 25 || BMI === 25 ? adjbw : bw;
    const GFR = ((140 - age) * wt / (72 * cr)) * k;
    const carbodose =  targetAUC * (GFR + 25) ;

    onResultChange({ GFR, carbodose,BMI });
  };
  
  

  return (
    <div>
      <Label>
        Body Weight (kg):
        <Input type="number" value={bw} onChange={(e) => setBw(e.target.value)} />
      </Label>


      <Label>
        Height (cm):
        <Input type="number" value={ht} onChange={(e) => setHeight(e.target.value)} />
      </Label>

      <Label>
        Creatinine (mg/dl):
        <Input type="number" value={cr} onChange={(e) => setCr(e.target.value)} />
      </Label>

      <Label>
        Sex:
        <Input type='select' value={sex} onChange={(e) => setSex(e.target.value)}>
          <option value="">Select</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </Input>
      </Label>

      <Label>
        Age (ปี):
        <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
      </Label>
      
      <Label>
        Target AUC:
        <Input type="number" value={targetAUC} onChange={(e) => setTargetAUC(e.target.value)} />
      </Label>

      <Button style={{marginLeft:'5px',marginTop:'10px'}} onClick={calculateCarboDose}>Calculate Carboplatin Dose</Button>

      
    </div>
  );
};

export default CarboplatinCalculator;
