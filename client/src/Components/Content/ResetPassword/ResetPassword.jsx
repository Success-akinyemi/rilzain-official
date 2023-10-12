import { useLocation } from 'react-router-dom'
import LoadingBtn from '../../Helpers/LoadingBtn/LoadingBtn'
import './ResetPassword.css'
import { resetPassword } from '../../../helpers/apis'
import { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function ResetPassword() {
  const location = useLocation()
  const path = location.pathname.split('/')[2]
  const resetToken = path
  const [password, setPassword] = useState('')
  const [comfirmPassword, setComfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [passwordVisible, setPasswordVisible] = useState(false)
  const [comfirmPasswordVisible, setComfirmPasswordVisible] = useState(false)

  const handleReset = async (e) => {
    e.preventDefault()

    if(password !== comfirmPassword){
      setPassword('')
      setComfirmPassword('')
      setTimeout(() => {
        setError('')
      }, 3000)
      return setError('Passwords do not match')
    }

    try {
      setIsLoading(true)
      const errorMsg = await resetPassword({ resetToken, password })
      
      if(errorMsg){
        setError(errorMsg)
        setTimeout(() => {
          setError('')
        }, 3000)
      }
    } catch (error) {
      setTimeout(() => {
        setError('')
      }, 3000)
      return setError('An Error occurred. please try again.')
    } finally{
      setIsLoading(false)
    }
  }

  const myRegPassword = () => {
    setPasswordVisible((prev) => !prev)
  }

  const myRegComfirmPassword = () => {
    setComfirmPasswordVisible((prev) => !prev)
  }
  return (
    <div className='resetPassword'>
      <div className="container">
        <div className="box">
          <form className={`reset-form`} id='register' onSubmit={handleReset}>
            <div className="top-header">
              <h3>Reset Your Password</h3>
              <b>Rilzain Solutions</b>
            </div>

            <div className="input-group">
              <div className="input-field">
                <input type={passwordVisible ? 'text' : 'password'} id="regPassword" className="input-box" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                <label htmlFor="regPassword" className='reg-label'>Password</label>
                <div className="eye-area">
                  <div className="eye-box" onClick={myRegPassword}>
                  {passwordVisible ? (
                  <i id='eye-slash'>
                    <VisibilityOffIcon />
                  </i>
                ) : (
                  <i id='eye'>
                    <VisibilityIcon />
                  </i>
                )}
                  </div>
                </div>
              </div>

              <div className="input-field">
                <input type={comfirmPasswordVisible ? 'text' : 'password'} id="regConfirmPassword" className="input-box" required value={comfirmPassword} onChange={(e) => setComfirmPassword(e.target.value)}/>
                <label htmlFor="regPassword" className='reg-label'>Comfirm Password</label>
                <div className="eye-area">
                  <div className="eye-box" onClick={myRegComfirmPassword}>
                  {comfirmPasswordVisible ? (
                  <i id='eye-slash'>
                    <VisibilityOffIcon />
                  </i>
                ) : (
                  <i id='eye'>
                    <VisibilityIcon />
                  </i>
                )}
                  </div>
                </div>
              </div>

              {error && <p className='error'>{error}</p>}
              
              <div className="input-field">
              {
                      isLoading ? 
                      (<LoadingBtn btnText={'Updating...'} />)
                      :
                      (<input type="submit" className="input-submit" />)
                    }
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword