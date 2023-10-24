import './ContactForm.css'
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SendIcon from '@mui/icons-material/Send';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

function ContactForm() {

    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_x6n2mfu', 'template_3ki2n7b', form.current, 'usy4tHyf_VtLx8ahc')
        .then((result) => {
            console.log(result.text);
            e.target.reset()
            toast.success('Message Sent Successful')
        }, (error) => {
            console.log(error.text);
            toast.error('Unable to send Messages')
        });
    };

  return (
    <form ref={form} onSubmit={sendEmail}>
        <h2 className='title'>Reach Out To Us Today</h2>
        <div className="input-group">
            <label for='name' className='c-label' ><PersonIcon className='icon' /> Your Name</label>
            <input type="text" id='name' name='user_name' />
        </div>

        <div className="input-group">
            <label for='number' className='c-label'><PhoneIcon className='icon' /> Phone No.</label>
            <input type="number" id='number' name='user_phone' />
        </div>

        <div className="input-group">
            <label for='email' className='c-label'><EmailIcon className='icon' /> Email Address</label>
            <input type="email" id='email' name='user_email' />
        </div>

        <div className="input-group">
            <label for='message' className='c-label'><ChatBubbleIcon className='icon' /> Your Message</label>
            <textarea rows="8" id='message' name='message'></textarea>
        </div>
        <button className='btn' type="submit">Submit  <SendIcon className='icon' /></button>
    </form>
  )
}

export default ContactForm