/* eslint-disable react/prop-types */
import { useState } from 'react'
import { signIn } from '../../auth/authFunctions'
import styles from './SignIn.module.css'
import { Form, Link, redirect } from 'react-router-dom';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Form className={styles.form} method='post' >
      <div>
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' id='email' required onChange={event => setEmail(event.target.value)}/>
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' id='password' required onChange={event => setPassword(event.target.value)}/>
      </div>
      <button>Sign In</button>

      <p>Don&apos;t have an account? 
        <Link to='/signUp'>Sign Up</Link>
      </p>
    </Form>
  )
}

export const action = async ({ request }) => {
  const data = await request.formData();
  const email = data.get('email');
  const password = data.get('password');

  try {
    await signIn(email, password);
    return redirect('/');
  } catch (error) {
    console.log('Error signing in', error);
  }
}


