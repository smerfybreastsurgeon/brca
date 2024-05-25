import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Input, Label } from 'reactstrap';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from '../../utils/firebase';



const SignUp = () => {
    const navigate=useNavigate()
    const [currentUser,setCurrentUser]=useState(null)
    const [formData, setFormData] = useState({
      displayName: '',
      email: '',
      password: '',
    });
    const [errorMessage,setErrorMessage]=useState('')   
  const {displayName,email,password,confirmedpassword}=formData
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };  
    const handleCancel = () => {
      // Clear the form fields
      setFormData({
        displayName: '',
        email: '',
        password: '',
        confirmedpassword: '',
      });
      // Navigate to the desired location (you can adjust this based on your needs)
      navigate('/home'); // Navigate to the home page in this example
    };

    const IsValidate = () => {
      let isproceed = true;
      let errormessage = 'Please enter valid values for';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (displayName === null || displayName === '') {
        isproceed = false;
        errormessage += ' displayName';
      }    
      
      if (email === null || email === '' || emailRegex.test(email) === false) {
        isproceed = false;
        errormessage += ' Email'
      }
    
      if (password === null || password === '') {
        isproceed = false;
        errormessage += ' Password';
      }
      
      
      if (!isproceed) {
        toast.warning(errormessage);
      }
    
      return isproceed;
    };
    if(!IsValidate){
      return
    }
const resetForm=()=>{
  setFormData({
    displayName: '',
    email: '',
    password: '',
  })
}
const handleSubmit = async (e) => {
      e.preventDefault(); 
      if (password !== confirmedpassword ) {      
        alert('password not match')
        return
      }
      try {
         const {user}=await createAuthUserWithEmailAndPassword(email,password) 
         await createUserDocumentFromAuth(user,{displayName}) ;        
         setCurrentUser(true)
         resetForm()
     //redirect to dashboard  
       } catch (error) {
        if(error.code==='auth/email-already-in-use'){
          alert('Can not create user,email already in use')
        }else{
          console.log('user creation encounter an error',error)
        }
        setErrorMessage(error.message)
        navigate('/home');
      }}

 if(currentUser){
   navigate('/home'); }

  return (
    <div>
      <Col md={{
        offset: 4,
        size: 8
      }}
      sm="12">
    <Card className="my-2" style={{
    width: '24rem'
  }}>
    <CardHeader>
    <h4>ยังไม่มีบัญชีผู้ใช้?</h4>
    </CardHeader>
     <CardBody>          
      <span>ลงทะเบียนใช้งาน</span>
       <br/>
      <form onSubmit={handleSubmit}>
        <Label>
          Username:
          <Input
            type="text"
          required
            name="displayName"
            value={displayName}
            onChange={handleChange}
           
          />
        </Label>
       
        <Label>
          Email:
          <Input
            type="email" required
            name="email"
            value={email}
            onChange={handleChange}            
          />
        </Label>
      
        <Label>
          Password:
          <Input
            type="password" required
            name="password"
            value={password}
            onChange={handleChange}            
          />
        </Label>
      
        <Label>
          Confirmed Password:
          <Input
            type="password"required
            name="confirmedpassword"
            value={confirmedpassword}
            onChange={handleChange}            
          />
        </Label>
       
        <Button color='primary' type="submit" >
          Register
        </Button>
        <Button color="secondary" onClick={handleCancel}>
                Cancel
              </Button>
      </form>
      </CardBody>
      </Card>
      </Col>
      {errorMessage&&toast.error('User with this email already exists')}
    </div>
  );
};

export default SignUp;
