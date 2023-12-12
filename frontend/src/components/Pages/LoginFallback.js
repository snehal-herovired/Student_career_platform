import React from 'react'
import { Link } from 'react-router-dom'
export default function LoginFallback() {
  return (
      <div>
          <div>You are not Authenticated...</div>
          <Link to="/">Login</Link>
    </div>
  )
}
