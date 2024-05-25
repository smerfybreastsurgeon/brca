import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Input } from 'reactstrap';
import { AuthContext } from './Auth';
import { auth} from '../../utils/firebase'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithGooglePopup ,createUserDocumentFromAuth} from '../../utils/firebase';


 
const LogIn = () => { 
  
  const navigate=useNavigate()

const logGoogleUser=async ()=>{
    const {user} =await signInWithGooglePopup()
        const userDocRef=await createUserDocumentFromAuth(user)
  }

 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    errorMsg:'',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const validate=()=>{
    let result=true
    if (formData.email === null || formData.email === '') {
      result = false;
     toast.warning('Please enter valid username')
    }    
    if (formData.password === null || formData.password === '') {
      result = false;
     toast.warning('Please enter valid password')
    }   
    return result
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
        try {
            // Call the signIn function with the credentials from the component state
            await signInWithEmailAndPassword(auth, formData.email, formData.password);

            toast.success('log in success');

            // Navigate to the home page or the dashboard
            navigate('/home');
        } catch (error) {
            // If the sign in is unsuccessful, show an error message
            toast.error(error.message);
        }
    }
};

  
const {currentUser}=useContext(AuthContext)
if(currentUser){
  navigate('/home')
}
  return (
    <div>
      <Col md={{
        offset: 4,
        size: 8
      }}
      sm="12">
    <Card className="my-2" style={{
    width: '28rem'
  }}>
     <CardHeader>
      <h2 style={{marginBottom: 0}}>เข้าสู่ระบบ</h2>
      </CardHeader>
      <form onSubmit={handleSubmit}>
      <CardBody>
        <label>
          Email:<span className="errmsg">*</span>
          <Input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        </CardBody>
        <br />
        <CardFooter  >
        <Button color='primary'type="submit" style={{marginBottom: 0}}>เข้าสู่ระบบ</Button>{' '}
        <Button onClick={logGoogleUser} style={{marginBottom: 0,backgroundColor:'#1a75ff'}}>Sign In with Google</Button>{' '}
        <Button color='success'onClick={()=>navigate('/signup')} style={{marginBottom: 0}}>ลงทะเบียนใช้งาน</Button>
        </CardFooter>
      </form>      
      </Card>
      </Col>
    </div>
  );
};

export default LogIn;
