/* eslint-disable react/prop-types */
import { useState } from 'react'
import { signIn } from '../../auth/authFunctions'
import styles from './SignIn.module.css'

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className={styles.form} onSubmit={event => handleSubmit(event, email, password)}>
      <div>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' required onChange={event => setEmail(event.target.value)}/>
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' required onChange={event => setPassword(event.target.value)}/>
      </div>
      <button>Sign In</button>
      <p>Don&apos;t have an account? 
        <button>Sign Up</button>
      </p>
    </form>
  )
}

const handleSubmit = async (event, email, password) => {
  event.preventDefault();
  try {
    await signIn(email, password);

  } catch (error) {
    console.log('Error signing in:', error);
  }
}

