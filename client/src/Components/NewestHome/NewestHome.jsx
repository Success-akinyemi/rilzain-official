import { Link } from 'react-router-dom'
import { newestHome } from '../../data/newestHome'
import './NewestHome.css'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '../Helpers/Button/Button';
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react';

function NewestHome() {

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

  return (
    <div className='newestHome'>
        <div className="container">
            <h1 data-aos='fade-right' className='title'> View Our Newest Homes</h1>
            <div className="content">
                {
                    newestHome.map((item) => (
                        <div data-aos='zoom-in' className="card" key={item._id}>
                            <img src={item.image} alt='home'/>
                            <p>{item.desc}</p>
                            <Link to={`${item.path}/${item._id}`} className='btn link' >
                                View Details <ArrowForwardIcon className='icon' />
                            </Link>
                        </div>
                    ))
                }
            </div>
            <div className="more">
                <Button 
                    bg={true}
                    text={'View More Homes'}
                    to={'/home'}
                />
            </div>
        </div>
    </div>
  )
}

export default NewestHome