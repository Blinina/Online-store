import React, { useState } from 'react';
import {Modal, Form} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from './SignUp';

//вход
type ModalProps = {
    open:boolean,
    setOpenModal:(value:boolean)=>void;
    setOpenSignUP: (value: boolean) => void,

}

export default function SignIn({open, setOpenModal, setOpenSignUP}: ModalProps) {
    const handleSignUP = () =>{
        setOpenSignUP(true);
        setOpenModal(false);
    }
    const handleSubmit = async () =>{
      let user = {
          'email': 'John12359900',
          'password': 'Smith1'
        };
     let kek = await fetch(`/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(user)
        });
     let result = await kek.json();
     console.log('вход')
     console.log(result.message);

  }
  
    return (
      <>
        <Modal show={open} onHide={()=>setOpenModal(false)}>
          <Modal.Header>
          <button type="button" className="btn-close" aria-label="Close" onClick={()=>setOpenModal(false)}></button>
            <div><h3>Sign in</h3></div>
            <div><p className='form-decription'>Sign in to your account using email and password provided during registration.</p></div>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Your working email"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="password"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <button className='M-btn btn-green' onClick={handleSubmit}>
              Sign in
            </button>
            <div><p>Don't have an account? <span className="go-modal" onClick={handleSignUP}>Sign up</span></p></div>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  

