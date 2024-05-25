import React, { useState,useEffect } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import { GrEdit } from "react-icons/gr";
import { Badge } from 'reactstrap';

const symptomsList = [
  'Liver',
  'Lung',
  'Brain',
  'Bone',
  'Skin', 
  'Other'
];

const SitemetasForm = ({ defaultSitemetas, onSelected, othermet, onOtherMetChange }) => {
    const [symptoms, setSymptoms] = useState(defaultSitemetas || []);
    const [otherMetValue, setOtherMetValue] = useState(othermet||"");
    const [show,setShow]=useState(false)
    const checkedSymptoms = symptoms.filter((symptom) => symptoms.includes(symptom))||'';
    let numCheckedSymptoms = checkedSymptoms.length;
    if (otherMetValue.trim() !== "" && symptoms.includes("Other")) {
      numCheckedSymptoms += 0;
    }
    if (otherMetValue.trim() === "" && symptoms.includes("Other")) {
      numCheckedSymptoms -=1;
    }
    

    
    
    const handleSymptomChange = (event) => {
      const { value } = event.target;
      const index = symptoms.indexOf(value);
      if (index > -1) {
        setSymptoms(symptoms.filter((symptom) => symptom !== value));
        if (value === "Other") {
          setOtherMetValue("");
        }
      } else {
        setSymptoms([...symptoms, value]);
      }
      onSelected(symptoms);
    };
  
    const handleOtherMetChange = (event) => {
      setOtherMetValue(event.target.value);
    }; 
   
  
    useEffect(() => {
      onSelected(symptoms);
      onOtherMetChange(otherMetValue)
    }, [symptoms, onSelected,otherMetValue,onOtherMetChange]);
  
    return (
      <FormGroup>
        <Label for="symptoms"><GrEdit onClick={()=>setShow(!show)}/> Site metastasis <Badge color="secondary">{numCheckedSymptoms}</Badge></Label>
        {show&&symptomsList.map((symptom) => (
          <FormGroup check key={symptom}>
            <Label check>
              <Input
                type="checkbox"
                name="symptoms"
                value={symptom}
                checked={symptoms.includes(symptom)}
                onChange={handleSymptomChange}
              />{' '}
              {symptom}
            </Label>
          </FormGroup>
        ))}
        {show&&symptoms.includes('Other') && (
          <FormGroup>
            <Label for="othermet">Other symptom</Label>
            <Input
             type="text"
             id="othermet"
             name="othermet"
             value={otherMetValue}
             onChange={handleOtherMetChange}
            />
          </FormGroup>
        )}
      </FormGroup>
    );
  };
export default SitemetasForm  