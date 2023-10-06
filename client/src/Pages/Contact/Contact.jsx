import DropDown from '../../Components/DropDown/DropDown'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import './Contact.css'

function Contact({ toggle, isOpen }) {
  return (
    <div className='contact'>
        <Navbar toggle={toggle} />
        <DropDown isOpen={isOpen} toggle={toggle} />
        <div className="contact-container">
        Contact
        </div>
        <Footer />
    </div>
  )
}

export default Contact