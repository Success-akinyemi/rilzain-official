import { useEffect } from 'react'
import Button from '../Helpers/Button/Button'
import './InfoSection.css'
import Aos from 'aos'
import 'aos/dist/aos.css'

function InfoSection({ heading, paragraphOne, paragraphTwo, label, reverse, image, path }) {
  
    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    return (
    <div className='infoSection'>
        <div className="container">
            <div data-aos='fade-up' className={`left ${ reverse ? 'order' : ''}`} >
                <h1>{heading}</h1>
                <p>{paragraphOne}</p>
                <p>{paragraphTwo}</p>
                <Button 
                    to={path}
                    text={label}
                />
            </div>

            <div data-aos='zoom-out' className={`right ${ reverse ? 'order' : ''}`} reverse={reverse}>
                <img  src={image} alt='home'/>
            </div>
        </div>
    </div>
  )
}

export default InfoSection