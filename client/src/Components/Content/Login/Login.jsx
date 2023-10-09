import './Login.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../../helpers/apis';
import LoadingBtn from '../../Helpers/LoadingBtn/LoadingBtn';

function Login({isActive, toggle}) {
  const [emailOrphoneNumber, setEmailOrphoneNumber] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const myLogPassword = () => {
    setPasswordVisible((prev) => !prev)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const errorMsg = await loginUser({emailOrphoneNumber, password})

      if(errorMsg){
        setError(errorMsg)
        setTimeout(() => {
          setError('')
        }, 3000)
      } else{
        navigate('/home')
        //toggle()
      }
    } catch (error) {

    } finally{
      setIsLoading(false)
    }
  }

  return (
    <form className={`box-login ${isActive ? 'show' : 'hide'}`} id='login' onSubmit={handleLogin}>
        <div className="top-header">
          <h3>Hello, Again</h3>
          <b>Rilzain Solutions</b>
        </div>

        <div className="input-group">
          <div className="input-field">
            <input type="text" id="logEmail" className="input-box" required value={emailOrphoneNumber} onChange={(e) => setEmailOrphoneNumber(e.target.value)}/>
            <label htmlFor="logEmail" className='reg-label'>Email Address or Phone Number</label>
          </div>

          <div className="input-field">
            <input id="logPassword" className="input-box" required value={password} onChange={handlePasswordChange} type={passwordVisible ? 'text' : 'password' } />
            <label htmlFor="logPassword" className='reg-label'>Password</label>
            <div className="eye-area">
              <div className="eye-box" onClick={myLogPassword}>
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
            {/* 
            <div className="remember">
              <input type="checkbox" id="formCheck-2" className='check' />
              <label htmlFor="formCheck-2">Remember Me</label>
            </div>
            */}

          {error && <p className='error'>{error}</p>}
          
          <div className="input-field">
            {
              isLoading ? 
              (<LoadingBtn btnText={'Checking...'} />)
              :
              (<input type="submit" className="input-submit" value='Submit' />)
            }
          </div>
          <div className="forgot">
            <Link className='link' to='/forgotPassword'>Forgot Password</Link>
          </div>
        </div>
    </form>
  )
}

export default Login