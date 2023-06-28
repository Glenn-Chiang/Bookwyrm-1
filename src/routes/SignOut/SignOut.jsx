/* eslint-disable react/prop-types */
import styles from './SignOut.module.css'
import { signOutUser } from "../../auth/authFunctions";
import { Form, redirect } from "react-router-dom";

export default function SignOut() {
  return (
    <Form method='post' className={styles.form}>
      Hope to see you soon!
      <button>
        Sign Out
      </button>
    </Form>
  )
}

export async function action() {
  await signOutUser();
  return redirect('/signIn');
}