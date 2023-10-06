import ContactForm from '../ContactForm/ContactForm'
import Button from '../Helpers/Button/Button'
import './Contact.css'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react';

function Contact({ heading, paragraphOne, paragraphTwo, label, path}) {
  
  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, [])
  return (
    <div className='contact'>
        <div className="layer">
          <div className="card" data-aos='fade-up'>
          <ContactForm  />
          </div>
        </div>
        <div className="top"></div>
        <div className="middle">
            <div data-aos='fade-right' className="left">
                <h1>{heading}</h1>
                <p>{paragraphOne}</p>
                <p>{paragraphTwo}</p>
                <Button 
                    text={label}
                    to={path}
                    big={true}
                    bg={true}
                />
            </div>

            <div className="right">
              <div className="form" data-aos='fade-up' >
                <ContactForm />
              </div>
            </div>
        </div>
        <div className="bottom"></div>
    </div>
  )
}

export default Contact