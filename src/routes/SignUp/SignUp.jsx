/* eslint-disable react/prop-types */
import { useState } from 'react'
import { signUp } from '../../auth/authFunctions'
import styles from './SignUp.module.css'
import { Form, Link, redirect } from 'react-router-dom';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Form className={styles.form} >
      <div>
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' id='email' required onChange={event => setEmail(event.target.value)}/>
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' id='password' required onChange={event => setPassword(event.target.value)}/>
      </div>
      <button>Sign Up</button>
      <p>Already have an account? 
        <Link to='/signIn'>Sign In</Link>
      </p>
    </Form>
  )
}


export const action = async ({ request }) => {
  try {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');

    await signUp(email, password);
    alert('Signed up successfully!');
    return redirect('/signIn');
  
  } catch (error) {
    console.log('Error signing up: ' + error);
  }
}