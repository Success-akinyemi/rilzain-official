import { useLocation } from 'react-router-dom'
import './Home.css'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import DropDown from '../../Components/DropDown/DropDown'
import { homeData } from '../../data/homeData'
import { useEffect, useRef, useState } from 'react'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import { useFetchHouses } from '../../hooks/fetch.hooks'
import Spinner from '../../Components/Helpers/Spinner/Spinner'

function Home({ toggle, isOpen, renderLikeIcon, handleLike, renderLikeText, handleAdd, handleDelete }) {
    const [current, setCurrent] = useState(0)
    const loc = useLocation()
    const pathName = loc.pathname.split('/')[2]

    //const { _id, address, desc, image, imageArray, location, price, title, } = homeData
    const { isLoadingHouseData, apiHouseData, houseServerError, houseStatus } = useFetchHouses(pathName)
    const { _id, address, desc, image, imageArray, location, price, title, } = apiHouseData?.data?.house || {}


    const length = imageArray?.length
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
    }, [current, length])

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

    if(!Array.isArray(imageArray) || imageArray.length <= 0){
        return null
    }
    return (

    <div className='home'>
        <Navbar toggle={toggle} />
        <DropDown isOpen={isOpen} toggle={toggle} />
            {
                isLoadingHouseData ? (
                    <Spinner />
                ) : (
                    <div className="content">
                    <h2>{title}</h2>
        
                    <img src={image} alt='home' className='img' />
                    
                    <div className="card">
                        <div className="left">
                            {
                                imageArray.map((item, idx) => {
                                    return(
                                        <div className="imgArray">
                                            {
                                                idx === current && (
                                                    <div className="images">
                                                        <img key={idx} src={item} alt='home images' />
                                                    </div>
                                                )
                                            }
                                            <div className="sliderButtons">
                                                <div className="arrowbtn" onClick={prevSlide}><ArrowLeftIcon className='icon' /></div>
                                                <div className="arrowbtn" onClick={nextSlide}><ArrowRightIcon className='icon' /></div>                
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
        
                        <div className="right">
                            <h2>Address: <p>{address}</p> </h2>
                            <h2>Location: <p>{location}</p> </h2>
                            <h2>Price: <p>{price}</p> </h2>
                            <h2>Description: <p>{desc}</p> </h2>
        
                            <div className="btn">
                                <button><a href="tel:+" className='link' ><PhoneIcon className='icon' /> Call Us</a></button>
                                <button><a href="" className='link'><WhatsAppIcon className='icon' /> Whatsapp Us</a></button>
                            </div>
                        </div>
                    </div>
                    </div>
                )
            }
        <Footer />
    </div>
  )
}

export default Home