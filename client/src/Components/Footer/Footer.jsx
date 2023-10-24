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
                <a target='_blank' href='https://www.instagram.com/rilzainsolutions' className='link'><InstagramIcon className='icon' /></a>
                <a target='_blank' className='link'><FacebookOutlinedIcon className='icon' /></a>
                <a className='link' href='https://wa.me/+2347025073509?text=Hello,' ><WhatsAppIcon className='icon' /></a>
                <a className='link' href="tel:+2348115397098" ><PhoneIcon className='icon' /></a>    
            </div>
        </div>
        <div className="right">
            <div className="card">
                <div className="one">
                    <Link className='title link'>Contact Us</Link>
                    <Link className='link'>FAQ</Link>
                    <Link className='link'>Support</Link>
                    <Link className='link' to='/home'>Homes</Link>
                </div>
                <div className="two">
                    <span className='title link'>Office</span>
                    <span className='link'>165, Herbert Macaulay Way, Adekunle, Besides Zenith bank opposite paga, Adekunle ebute-metta yaba</span>
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