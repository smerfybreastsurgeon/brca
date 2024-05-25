import React, { useState,useEffect } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import { GrEdit } from "react-icons/gr";
import { Badge } from 'reactstrap';

const typeadjsList = [
  'Chemotherapy',
  'Immunotherapy',
  'Anti-Her2',
  'Hormonal therapy', 
  'Radiation',
  'Other'
];

const TypeadjuvantForm = ({ defaultTypeofadjuvant, onSelected, othertypeofadjuvant, onOthertypeofadjuvantChange }) => {
    const [typeadjs, setTypeadjs] = useState(defaultTypeofadjuvant || []);
    const [othertypeadjValue, setOthertypeadjValue] = useState(othertypeofadjuvant||"");    
    const [show,setShow]=useState(false)
    const checkedtypeadjs = typeadjs.filter((typeadj) => typeadjs.includes(typeadj))||'';
    let numCheckedtypeadjs = checkedtypeadjs.length;
    if (othertypeadjValue.trim() !== "" && typeadjs.includes("Other")) {
      numCheckedtypeadjs += 0;
    }
    if (othertypeadjValue.trim() === "" && typeadjs.includes("Other")) {
      numCheckedtypeadjs -=1;
    }   
   
    const handleTypeadjChange = (event) => {
      const { value } = event.target;
      const index = typeadjs.indexOf(value);
      if (index > -1) {
        setTypeadjs(typeadjs.filter((typeadj) => typeadj !== value));
        if (value === "Other") {
            setOthertypeadjValue("");
        }
      } else {
        setTypeadjs([...typeadjs, value]);
      }
      onSelected(typeadjs);
    };
  
    const handleOthertypeadjValueChange = (event) => {
        setOthertypeadjValue(event.target.value);
    }; 
   
  
    useEffect(() => {
      onSelected(typeadjs);
      onOthertypeofadjuvantChange(othertypeadjValue)
    }, [typeadjs, onSelected,othertypeadjValue,onOthertypeofadjuvantChange]);
  
    return (
      <FormGroup>
        <Label for="typeadjs"><GrEdit onClick={()=>setShow(!show)}/> Type of Neoadjuvant <Badge color="secondary">{numCheckedtypeadjs}</Badge></Label>
        {show&&typeadjsList.map((typeadj) => (
          <FormGroup check key={typeadj}>
            <Label check>
              <Input
                type="checkbox"
                name="typeadjs"
                value={typeadj}
                checked={typeadjs.includes(typeadj)}
                onChange={handleTypeadjChange}
              />{' '}
              {typeadj}
            </Label>
          </FormGroup>
        ))}
        {show&&typeadjs.includes('Other') && (
          <FormGroup>
            <Label for="othertypeadjValue">Other </Label>
            <Input
             type="text"
             id="othertypeadjValue"
             name="othertypeadjValue"
             value={othertypeadjValue}
             onChange={handleOthertypeadjValueChange}
            />
          </FormGroup>
        )}
      </FormGroup>
    );
  };
export default TypeadjuvantForm  