import { Link } from 'react-router-dom'
import { newestHome } from '../../data/newestHome'
import './NewestHome.css'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '../Helpers/Button/Button';
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react';
import { useFetchHouses } from '../../hooks/fetch.hooks';
import Spinner from '../Helpers/Spinner/Spinner';

function NewestHome() {
    const { isLoadingHouseData, apiHouseData, houseStatus, houseServerError } = useFetchHouses()
    const newHouse = apiHouseData?.data.houses

    const sortedHouses =  newHouse ? newHouse.slice().sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)) : []
    const newestHouse = sortedHouses.slice(0, 2);

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])


  return (
    <div className='newestHome'>
        <div className="container">
            <h1 data-aos='fade-right' className='title'> View Our Newest Homes</h1>
            <div className="content">
                {
                    houseServerError && (
                        <div className='server-error'>Please Check Your Internet Connection</div>
                    )
                }
                {
                    isLoadingHouseData ? (
                        <div style={{marginTop: '15px', marginBottom: '15px'}}>
                            <Spinner />
                            <p style={{textAlign: 'center'}}>Getting Our Latest Homes</p>
                        </div>
                    ) : (
                        newestHouse.map((item) => (
                            <div data-aos='zoom-in' className="card" key={item._id}>
                                <img src={item.image} alt='home'/>
                                <p>{item.title}</p>
                                <Link to={`home/${item._id}`} className='btn link' >
                                    View Details <ArrowForwardIcon className='icon' />
                                </Link>
                            </div>
                        ))
                    )
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