import React from 'react'
import { Link } from 'react-router-dom'
export default function Error() {
  return (
      <div style={{height:'100%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
          <h4>OOPs !!</h4>
          <h6>Either you are not authenticated or the route does not exists...</h6>
          <Link to="/">Go Back</Link>
        
    </div>
  )
}
