import React, { useState,useEffect } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import { GrEdit } from "react-icons/gr";
import { Badge } from 'reactstrap';

const symptomsList = [
  'Breast mass',
  'Asymptomatic with abnormal imaging/screening',
  'Axillary mass/nodes',
  'Nipple discharge/lesion',
  'Skin lesion or ulceration',
  'Breast pain',
  'Breast infection/mastitis',
  'Other'
];

const SymptomForm = ({ defaultSymptoms, onSelected, othersym, onOtherSymChange }) => {
    const [symptoms, setSymptoms] = useState(defaultSymptoms || []);
    const [otherSymValue, setOtherSymValue] = useState(othersym||"");
    const [show,setShow]=useState(false)
    const checkedSymptoms = symptoms.filter((symptom) => symptoms.includes(symptom))||'';
    let numCheckedSymptoms = checkedSymptoms.length;
    if (otherSymValue.trim() !== "" && symptoms.includes("Other")) {
      numCheckedSymptoms += 0;
    }
    if (otherSymValue.trim() === "" && symptoms.includes("Other")) {
      numCheckedSymptoms -=1;
    }
    

    
    
    const handleSymptomChange = (event) => {
      const { value } = event.target;
      const index = symptoms.indexOf(value);
      if (index > -1) {
        setSymptoms(symptoms.filter((symptom) => symptom !== value));
        if (value === "Other") {
          setOtherSymValue("");
        }
      } else {
        setSymptoms([...symptoms, value]);
      }
      onSelected(symptoms);
    };
  
    const handleOtherSymChange = (event) => {
      setOtherSymValue(event.target.value);
    }; 
   
  
    useEffect(() => {
      onSelected(symptoms);
      onOtherSymChange(otherSymValue)
    }, [symptoms, onSelected,otherSymValue,onOtherSymChange]);
  
    return (
      <FormGroup>
        <Label for="symptoms"><GrEdit onClick={()=>setShow(!show)}/> Symptoms <Badge color="secondary">{numCheckedSymptoms}</Badge></Label>
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
            <Label for="otherSymptom">Other symptom</Label>
            <Input
             type="text"
             id="othersym"
             name="othersym"
             value={otherSymValue}
             onChange={handleOtherSymChange}
            />
          </FormGroup>
        )}
      </FormGroup>
    );
  };
export default SymptomForm  
  