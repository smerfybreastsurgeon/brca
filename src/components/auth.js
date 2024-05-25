import { Button, Card, CardBody, Col, Input } from 'reactstrap'
import {auth,googleProvider} from '../configs/firebase'
import { createUserWithEmailAndPassword,signInWithPopup,signOut } from 'firebase/auth'
import { useState } from 'react'

export const Auth=()=>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const signIn =async ()=>{
        try{
        await createUserWithEmailAndPassword(auth,email,password)
        }catch(err){
            console.error(err)
        }
    }

    const signInWithGoogle =async ()=>{
        try{
        await signInWithPopup(auth,googleProvider)
        }catch(err){
            console.error(err)
        }
    }
    const logout=async ()=>{
        try{
        await signOut(auth)
        }catch(err){
            console.error(err)
        }
    }
    return <>
    <Col md={{
        offset: 4,
        size: 8
      }}
      sm="12">
    <Card className="my-2" style={{
    width: '24rem'
  }}>
     <CardBody>
            <Input
            type='email'
            value={email}
            placeholder='Email'
            onChange={(e)=>setEmail(e.target.value)}/>
            <Input
            type='password'
            value={password}
            placeholder='password'
            onChange={(e)=>setPassword(e.target.value)}/>
    <Button color='success' onClick={signIn}>Sign In</Button>{' '}
    <Button color='primary' onClick={signInWithGoogle}>Sign In with Google</Button>{' '}
    <Button color='warning' onClick={logout}>log out</Button>
    </CardBody>
    </Card>
    </Col>
    </>
}