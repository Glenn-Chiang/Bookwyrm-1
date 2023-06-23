/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from './SignOut.module.css'
import { signOutUser } from "../../auth/authFunctions";

export default function SignOut({ setView }) {
  const [signedIn, setSignedIn] = useState(true);

  const handleSubmit = event => {
    event.preventDefault();
    signOutUser();
    setSignedIn(false);
    setView('signIn');
  }

  if (!signedIn) {
    return (
      <p>You have signed out of your account</p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      Hope to see you soon!
      <button>
        Sign Out
      </button>
    </form>
  )
}