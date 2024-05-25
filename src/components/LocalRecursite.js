import React, { useState,useEffect } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import { GrEdit } from "react-icons/gr";
import { Badge } from 'reactstrap';

const localList = [
  'Chest wall',
  'Tram flap',
  'Breast conserved',
  'Axilla',
  'Another breast/second primary', 
  'Supraclavicular nodes',
  'Other'
];

const LocalRecursite= ({ defaultSitelocal, onSelected, otherlocalsite, onOtherLocalChange }) => {
    const [symptoms, setSymptoms] = useState(defaultSitelocal || []);
    const [otherLocalValue, setOtherLocalValue] = useState(otherlocalsite||"");
    const [show,setShow]=useState(false)
    const checkedSymptoms = symptoms.filter((symptom) => symptoms.includes(symptom))||'';
    let numCheckedSymptoms = checkedSymptoms.length;
    if (String(otherLocalValue).trim() !== "" && symptoms.includes("Other")) {
      numCheckedSymptoms += 0;
    }
    if (String(otherLocalValue).trim() === "" && symptoms.includes("Other")) {
      numCheckedSymptoms -=1;
    }
    
    
    
    const handleSymptomChange = (event) => {
      const { value } = event.target;
      const index = symptoms.indexOf(value);
      if (index > -1) {
        setSymptoms(symptoms.filter((symptom) => symptom !== value));
        if (value === "Other") {
          setOtherLocalValue("");
        }
      } else {
        setSymptoms([...symptoms, value]);
      }
      onSelected(symptoms);
    };
  
    const handleOtherLocalChange = (event) => {
      setOtherLocalValue(event.target.value);
    }; 
   
  
    useEffect(() => {
      onSelected(symptoms);
      onOtherLocalChange(otherLocalValue)
    }, [symptoms, onSelected,otherLocalValue,onOtherLocalChange]);
  
    return (
      <FormGroup>
        <Label for="symptoms"><GrEdit onClick={()=>setShow(!show)}/> Site local recurrence <Badge color="secondary">{numCheckedSymptoms}</Badge></Label>
        {show&&localList.map((symptom) => (
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
            <Label for="otherlocal">Other Sites :</Label>
            <Input
             type="text"
             id="otherlocal"
             name="otherlocal"
             value={otherLocalValue}
             onChange={handleOtherLocalChange}
            />
          </FormGroup>
        )}
      </FormGroup>
    );
  };
export default LocalRecursite 