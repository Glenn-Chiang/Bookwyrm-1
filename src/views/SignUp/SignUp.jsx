/* eslint-disable react/prop-types */
import { useState } from 'react'
import { signUp } from '../../auth/authFunctions'
import styles from './SignUp.module.css'

export default function SignUp({ setView }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className={styles.form} onSubmit={() => handleSubmit(email, password)}>
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
        <button onClick={() => setView('signIn')}>Sign In</button>
      </p>
    </form>
  )
}

const handleSubmit = async (email, password) => {
  try {
    await signUp(email, password);
  } catch (error) {
    console.log('Error signing up: ' + error);
  }
}