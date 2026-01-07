import React from 'react'
import { ImCheckmark } from 'react-icons/im'

function RedirectForm() {
  return (
    <div>
      
      <div className="registrationPop">
        <div className="registration">
          <div className="regIconFlex">
            <div className="regIcon">
            <ImCheckmark />
          </div>
          </div>
          
          <div className="regContent">
            <p>
              A verification link has been sent to your registered email address. Please check your inbox or spam and click on the link to verify your account.
            </p>
          </div>
        </div>
     </div>


    </div>
  )
}

export default RedirectForm
