/* eslint-disable react/prop-types */
import { useState } from 'react'
import { signUp } from '../../auth/authFunctions'
import styles from './SignUp.module.css'
import { Form, Link, redirect } from 'react-router-dom';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Form className={styles.form} onSubmit={event => handleSubmit(event, email, password)}>
      <div>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' required onChange={event => setEmail(event.target.value)}/>
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' required onChange={event => setPassword(event.target.value)}/>
      </div>
      <button>Sign Up</button>
      <p>Already have an account? 
        <Link to='/signIn'>Sign In</Link>
      </p>
    </Form>
  )
}

const handleSubmit = async (event, email, password) => {
  event.preventDefault();
  try {
    await signUp(email, password);
    console.log('Signed up');
    alert('Signed up successfully!');

  } catch (error) {
    console.log('Error signing up: ' + error);
  }
}

export function action() {
  return redirect('/signIn');
}