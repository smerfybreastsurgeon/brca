import React, { useState } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

const symptomsList = [
  'Breast mass',
  'Asymptomatic with abnormal imaging/screening',
  'Axillary mass/nodes',
  'Nipple discharge/lesion',
  'Skin lesion/ulcer',
  'Mastalgia without palpable mass',
 
];

const CheckboxList = ({ value, onSelected }) => {
  const [checkedItems, setCheckedItems] = useState(value);
  const [otherSymptom, setOtherSymptom] = useState('');

  const handleChange = (event) => {
    const { name, checked } = event.target;
    const newCheckedItems = { ...checkedItems, [name]: checked };
    setCheckedItems(newCheckedItems);
    onSelected(Object.entries(newCheckedItems).filter(([_, value]) => value).map(([key]) => key));
  };

  const handleOtherSymptomChange = (event) => {
    setOtherSymptom(event.target.value);
    onSelected([...Object.keys(checkedItems), event.target.value]);
  };

  return (
    <FormGroup>
      
      {symptomsList.map((symptom) => (
        <FormGroup check key={symptom}>
          <Label check>
            <Input
              type="checkbox"
              name={symptom}
              checked={checkedItems[symptom]}
              onChange={handleChange}
            />
            {symptom}
          </Label>
        </FormGroup>
      ))}
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            name="Other"
            checked={checkedItems.Other}
            onChange={handleChange}
          />
          อื่น ๆ
        </Label>
        <Input
          type="text"
          name="otherSymptom"
          value={otherSymptom}
          onChange={handleOtherSymptomChange}
          disabled={!checkedItems.Other}
        />
      </FormGroup>
      <div>
        <h4>Selected Symptoms:</h4>
        <ul>
          {Object.entries(checkedItems)
            .filter(([_, value]) => value)
            .map(([key]) => (
              <li key={key}>{key}</li>
            ))}
        </ul>
      </div>
    </FormGroup>
  );
};

export default CheckboxList;
