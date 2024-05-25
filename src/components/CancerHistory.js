import React, { useState,useEffect } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import { GrEdit } from "react-icons/gr";
import { Badge } from 'reactstrap';

const cancersList = [
    'มะเร็งเต้านม',
    'มะเร็งรังไข่',
    'มะเร็งลำไส้ใหญ่',
    'มะเร็งปอด',
    'มะเร็งธัยรอยด์', 
    'Other'
];

const CancerHistory = ({ defaultCancers, onSelected, othercan, onOtherCanChange }) => {
    const [cancers, setCancers] = useState(defaultCancers || []);
    const [otherCan, setOtherCan] = useState(othercan||"");
    const [show,setShow]=useState(false)
    const checkedCancers = cancers.filter((cancer) => cancers.includes(cancer))||'';
    let numCheckedCancers = checkedCancers.length;
    if (otherCan.trim() !== "" && cancers.includes("Other")) {
      numCheckedCancers += 0;
    }
    if (otherCan.trim() === "" && cancers.includes("Other")) {
      numCheckedCancers -=1;
    }
 
    
    const handleCancerChange = (event) => {
      const { value } = event.target;
      const index = cancers.indexOf(value);
      if (index > -1) {
        setCancers(cancers.filter((cancer) => cancer !== value));
        if (value === "Other") {
          setOtherCan("");
        }
      } else {
        setCancers([...cancers, value]);
      }
      onSelected(cancers);
    };
  
const handleOtherCanChange = (event) => {
      setOtherCan(event.target.value);
    }; 
  
useEffect(() => {
      onSelected(cancers);
      onOtherCanChange(otherCan)
}, [cancers, onSelected,otherCan,onOtherCanChange]);

  
    return (
      <FormGroup>
        <Label for="symptoms"><GrEdit onClick={()=>setShow(!show)}/> ประวัติมะเร็ง <Badge color="secondary">{numCheckedCancers}</Badge></Label>
        {show&&cancersList.map((cancer) => (
          <FormGroup check key={cancer}>
            <Label check>
              <Input
                type="checkbox"
                name="cancers"
                value={cancer}
                checked={cancers.includes(cancer)}
                onChange={handleCancerChange}
              />{' '}
              {cancer}
            </Label>
          </FormGroup>
        ))}
        {show&&cancers.includes('Other') && (
          <FormGroup>
            <Label for="otherCan">Other Cancer</Label>
            <Input
             type="text"
             id="otherCan"
             name="otherCan"
             value={otherCan}
             onChange={handleOtherCanChange}
            />
          </FormGroup>
        )}
      </FormGroup>
    );
  };
export default CancerHistory  
  