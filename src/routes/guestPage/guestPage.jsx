import { useLoaderData } from "react-router-dom"

export default function GuestPage() {
  const page = useLoaderData();
  return (
    <p>Sign in to view your {page}</p>
  )
}