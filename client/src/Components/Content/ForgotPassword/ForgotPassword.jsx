import { useState } from 'react'
import LoadingBtn from '../../Helpers/LoadingBtn/LoadingBtn'
import './ForgotPassword.css'
import { forgotPassword } from '../../../helpers/apis'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false
    )

  const handleRecovery = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      console.log(email)
      const errorMsg = await forgotPassword({ email })

      if(errorMsg){
        setSuccess(errorMsg)
        setTimeout(() => {
          setSuccess('')
        }, 5000);
      }
    } catch (error) {
      setError(error)
      setTimeout(() => {
        setError('')
      }, 5000);
    } finally{

    }
  }
  return (
    <div className='recovery' >
      <div className="container">
        <div className="box">
        <form className={`recovery-form`}  id='login' onSubmit={handleRecovery}>
            <div className="top-header">
              <h3>Recover Account</h3>
              <b>Rilzain Solutions</b>
            </div>

            <div className="input-group">
              <div className="input-field">
                <input type="text" id="logEmail" className="input-box" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="logEmail" className='reg-label'>Email Registered Address</label>
              </div>

              {error && <p className='error'>{error}</p>}
              {success && <p className='success'>{success}</p>}
              
              <div className="input-field">
                {
                  isLoading ? 
                  (<LoadingBtn btnText={'Please Wait...'} />)
                  :
                  (<input type="submit" className="input-submit" value='Submit' />)
                }
              </div>

            </div>
        </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword