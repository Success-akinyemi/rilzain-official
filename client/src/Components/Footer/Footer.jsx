import './Footer.css'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import { Link } from 'react-router-dom';
import Button from '../Helpers/Button/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Footer() {
  return (
    <div className='footer'>
        <div className="left">
            <h1>
                Let's find your Perfect Home
            </h1>

            <div className="links">
                <Link className='link'><InstagramIcon className='icon' /></Link>
                <Link className='link'><FacebookOutlinedIcon className='icon' /></Link>
                <Link className='link'><WhatsAppIcon className='icon' /></Link>
                <Link className='link'><PhoneIcon className='icon' /></Link>    
            </div>
        </div>
        <div className="right">
            <div className="card">
                <div className="one">
                    <Link className='title link'>Contact Us</Link>
                    <Link className='link'>FAQ</Link>
                    <Link className='link'>Support</Link>
                    <Link className='link'>Homes</Link>
                </div>
                <div className="two">
                    <span className='title link'>Office</span>
                    <span className='link'>Herbert Macaurly Way,</span>
                    <span className='link'>Lagos,</span>
                    <span className='link'>Nigeria.</span>
                </div>
            </div>

            <div className="chat">
                <Button 
                    to={'https://google.com'}
                    text={<div className='text'>
                        Let's Chat <ArrowForwardIcon />
                    </div>}

                />
            </div>
        </div>
    </div>
  )
}

export default Footer