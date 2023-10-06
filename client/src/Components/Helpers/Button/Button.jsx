import { Link } from 'react-router-dom'
import './Button.css'

function Button({text, to, big, width, bg}) {
    const buttonStyle = {
        padding: big ? '10px 30px' : '9px 16px',
        fontSize: big ? '25px' : '20px',
        width: width ? width : '',
        background: bg ? '#000d1a' : ''
    }
  return (
    <button 
        className='button'
        style={buttonStyle}
    >
        <Link to={to} className='link'>
            {text}
        </Link>
    </button>
  )
}

export default Button