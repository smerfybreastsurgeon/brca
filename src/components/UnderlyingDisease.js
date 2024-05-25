import React, { useState,useEffect } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import { GrEdit } from "react-icons/gr";
import { Badge } from 'reactstrap';

const diseasesList = [
    'DM',
    'Hypertension',
    'HIV disease',
    'SLE',
    'Rheumatoid arthritis', 
    'Other'
];

const UnderlyingDisease= ({ defaultDiseases, onSelected, otherdis, onOtherDisChange }) => {
    const [diseases, setDiseases] = useState(defaultDiseases || []);
    const [otherDis, setOtherDis] = useState(otherdis||"");
    const [show,setShow]=useState(false)
    const checkedDiseases = diseases.filter((disease) => diseases.includes(disease))||'';
    let numCheckedDiseases = checkedDiseases.length;
    if (otherDis.trim() !== "" && diseases.includes("Other")) {
      numCheckedDiseases += 0;
    }
    if (otherDis.trim() === "" && diseases.includes("Other")) {
      numCheckedDiseases -=1;
    }
 
    
    const handleDiseaseChange = (event) => {
      const { value } = event.target;
      const index = diseases.indexOf(value);
      if (index > -1) {
        setDiseases(diseases.filter((disease) => disease !== value));
        if (value === "Other") {
          setOtherDis("");
        }
      } else {
        setDiseases([...diseases, value]);
      }
      onSelected(diseases);
    };
  
const handleOtherDisChange = (event) => {
      setOtherDis(event.target.value);
    }; 
  
useEffect(() => {
      onSelected(diseases);
      onOtherDisChange(otherDis)
}, [diseases, onSelected,otherDis,onOtherDisChange]);

  
    return (
      <FormGroup>
        <Label for="diseases"><GrEdit onClick={()=>setShow(!show)}/> โรคประจำตัว <Badge color="secondary">{numCheckedDiseases}</Badge></Label>
        {show&&diseasesList.map((disease) => (
          <FormGroup check key={disease}>
            <Label check>
              <Input
                type="checkbox"
                name="diseases"
                value={disease}
                checked={diseases.includes(disease)}
                onChange={handleDiseaseChange}
              />{' '}
              {disease}
            </Label>
          </FormGroup>
        ))}
        {show&&diseases.includes('Other') && (
          <FormGroup>
            <Label for="otherDis">Other Disease</Label>
            <Input
             type="text"
             id="otherDis"
             name="otherDis"
             value={otherDis}
             onChange={handleOtherDisChange}
            />
          </FormGroup>
        )}
      </FormGroup>
    );
  };
export default UnderlyingDisease 