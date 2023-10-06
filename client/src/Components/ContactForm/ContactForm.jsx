import './ContactForm.css'
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SendIcon from '@mui/icons-material/Send';
function ContactForm() {
  return (
    <form>
        <h2 className='title'>Reach Out To Us Today</h2>
        <div className="input-group">
            <label for='name' className='c-label' ><PersonIcon className='icon' /> Your Name</label>
            <input type="text" id='name' />
        </div>

        <div className="input-group">
            <label for='number' className='c-label'><PhoneIcon className='icon' /> Phone No.</label>
            <input type="number" id='number' />
        </div>

        <div className="input-group">
            <label for='email' className='c-label'><EmailIcon className='icon' /> Email Address</label>
            <input type="email" id='email' />
        </div>

        <div className="input-group">
            <label for='message' className='c-label'><ChatBubbleIcon className='icon' /> Your Message</label>
            <textarea rows="8" id='message'></textarea>
        </div>
        <button className='btn' type="submit">Submit  <SendIcon className='icon' /></button>
    </form>
  )
}

export default ContactForm