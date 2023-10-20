import './Hero.css'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import Button from '../Helpers/Button/Button';
import { useEffect, useRef, useState } from 'react';


function Hero({ data, info }) {
    const [current, setCurrent] = useState(0)
    const length = data.length
    const timeout = useRef(null)

    useEffect(() => {
        const nextSlide = () => {
            setCurrent(current => (current === length - 1 ? 0 : current + 1))
        }

        timeout.current = setTimeout(nextSlide, 3000)

        return function () {
            if(timeout.current){
                clearTimeout(timeout.current)
            }
        }
    },[current, length])

    const nextSlide = () => {
        if(timeout.current){
            clearTimeout(timeout.current)
        }
        setCurrent(current === length - 1 ? 0 : current + 1)
    }

    const prevSlide = () => {
        if(timeout.current){
            clearTimeout(timeout.current)
        }
        setCurrent(current === 0 ? length - 1 : current - 1)
    }

    if(!Array.isArray(data) || data.length <= 0){
        return null
    }


  return (
    <div className='hero'>
        <div className="wrapper">
            {
                data.map((item, idx) => {
                   return (
                    <div className="slide" key={idx}>
                        { idx === current && (
                            <div className="slider">
                                <img src={item.image} alt={item.alt} />
                                {
                                    info ? (
                                        <div className="slideContent">
                                            {/** 
                                             <h1>{item.title}</h1>
                                             <p>NGN {item.price}</p>
                                             
                                            <Button
                                                to={`/home/${item.id}`}
                                                text={<div className='text'>
                                                        {item.label}
                                                        <div className="arrow">
                                                            <ArrowForwardIcon className='icon' />
                                                        </div>
                                                        </div>
                                                    }
                                                big={false}
                                                width={'180px'}
                                            />
                                            */}
                                        </div>

                                    ) : 
                                    ''
                                }
                            </div>
                        )}
                    </div>
                   ) 
                })
            }
            <div className="sliderButtons">
                <div className="arrowbtn" onClick={prevSlide}><ArrowLeftIcon className='icon' /></div>
                <div className="arrowbtn" onClick={nextSlide}><ArrowRightIcon className='icon' /></div>                
            </div>
        </div>
    </div>
  )
}

export default Hero