import DropDown from '../../Components/DropDown/DropDown'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import './Contact.css'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import ContactForm from '../../Components/ContactForm/ContactForm';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

function Contact({ toggle, isOpen }) {
  return (
    <div className='contact'>
        <Navbar toggle={toggle} />
        <DropDown isOpen={isOpen} toggle={toggle} />
        <div className="contact-container">
          <h2>Contact Us</h2>
          <div className="content">
            <div className="card card-1">
              <h3>Our Office Address:</h3>
              <p>165, Herbert Macaulay Way, Adekunle, Besides Zenith bank opposite paga, Adekunle ebute-metta yaba
                <br />
                Lagos,
                <br />
                Nigeria.
              </p>
            </div>

            <div className="card card-2">
              <h3>Social Media Handles</h3>
              <div className="handles">
                <a target='_blank' href='https://www.instagram.com/rilzainsolutions' className='link'><InstagramIcon className='icon' /></a>
                <a target='_blank' className='link'><FacebookOutlinedIcon className='icon' /></a>
                <a className='link' href='https://wa.me/+2347025073509?text=Hello,' ><WhatsAppIcon className='icon' /></a>
              </div>
            </div>

            <div className="card card-3">
              <h3>Message or Call Us</h3>
                <div className="connect">
                  <span>
                    <p>Call Us: </p>
                    <a className='link' href="tel:+2348115397098" ><PhoneIcon className='icon' /> 08115397098</a> 
                  </span>
                  <span>
                    <p>Messages Us:</p>
                    <a className='link' href="tel:+2348115397098" ><ChatBubbleIcon className='icon' /> 08115397098</a> 
                  </span>
                </div>
            </div>
          </div>

          <div className="form">
            <ContactForm />
          </div>
        </div>
        <Footer />
    </div>
  )
}

export default Contact