import React, {  useState } from "react";
import Select from "react-select";
import { Input, Button, Row, Col, Form } from "reactstrap";


const options = [
  { value: "name", label: "ชื่อ-นามสกุล" },
  { value: "hn", label: "HN" },
  { value: "pid", label: "PID" },
  { value: "agedx", label: "อายุแรกวินิจฉัย≤" },
];

function SearchForm({setField,onSelect}) {
  const [selected, setSelected] = useState(null);
  const [input, setInput] = useState(""); 
  const handleInput = (event) => {
    setInput(event.target.value);
  };
  const handleChange = (option) => {
    setSelected(option);
      
  };
  const handleSearch = (e) => {  
    e.preventDefault()  
    onSelect({ value: selected.value, label: input });
    setInput('');
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
       onSelect({ value: selected.value, label: input });
       setInput('');
    }
  };
  return (
    <div>
      <Form>
        <Row>
          <Col sm={4}>
            <Select
              value={selected}
              onChange={handleChange}
              options={options}
              placeholder="ค้นหาโดย"
            />
          </Col>
         {selected ? (
            <Col sm={4}>
              <Input
                value={input}
                onChange={handleInput}
                placeholder={`ระบุ ${selected?.value==='name'?'ชื่อ-นามสกุล':selected?.value==='hn'?'HN':selected?.value==='pid'?'PID':selected?.value==='agedx'?'อายุแรกวินิจฉัย':' '}`}
                onKeyDown={handleKeyPress}
              />
            </Col>
          ) : null}
              <Col sm={2}>
                <Button color="primary" onClick={handleSearch} disabled={!selected}>
                    ค้นหา
                </Button>
              </Col>
        </Row>
      </Form>
    </div>
  );
}
export default SearchForm;

