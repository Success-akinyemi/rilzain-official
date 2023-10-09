import { ViewHomesData } from '../../data/ViewHomesData'
import './Homes.css'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import DropDown from '../../Components/DropDown/DropDown';
import Footer from '../../Components/Footer/Footer';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import { toast, Toaster } from 'react-hot-toast'
import SearchIcon from '@mui/icons-material/Search';
import { useFetch, useFetchHouses } from '../../hooks/fetch.hooks';
import { addHouseToFav, likeHouse } from '../../helpers/apis';

function Homes({ isOpen, toggle}) {
    const [likedHouses, setLikedHouses] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
   
    const isUser = localStorage.getItem('authToken')
    const { isLoading, apiData, serverError } = useFetch()
    const { isLoadingHouseData, apiHouseData, houseServerError, houseStatus } = useFetchHouses()
    
    const houseData = apiHouseData?.data.houses
    console.log('HOUSE DTA', houseData)
    const itemPerPage = 6
    //Handle Pagination
    const paginateData = (data, currentPage, itemPerPage) => {
        const startIndex = (currentPage - 1) * itemPerPage;
        const endIndex = startIndex + itemPerPage;
        return data?.slice(startIndex, endIndex);
    }

    const totalPages = Math.ceil(houseData?.length / itemPerPage)
    const displayData = paginateData(houseData, currentPage, itemPerPage)
    
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage)
    }
    // End of Pagination

    //Like House
    useEffect(() => {
        Aos.init({ duration: 2000 });
    
        // Retrieve liked house IDs from local storage
        const storedLikedHouses = localStorage.getItem('likedHouses');
        if (storedLikedHouses) {
            setLikedHouses(JSON.parse(storedLikedHouses));
        }
    }, []);

    const handleLike = async (houseId) => {
        const user = apiData?._id
        const house = houseId

        if(!isUser){
            toast.error('Please Login First')
        }else{
            try {
                const likeAHouse = await likeHouse({ house, user})
                
                //Update like House based on response
                const updateLikedHouse = [...likedHouses];
                if(likedHouses.includes(house)){
                    updateLikedHouse.splice(updateLikedHouse.indexOf(houseId), 1);
                } else {
                    // user liked house
                    updateLikedHouse.push(house);
                }
                setLikedHouses(updateLikedHouse)
                localStorage.setItem('likedHouses', JSON.stringify(updateLikedHouse));
            } catch (error) {
                toast.error('Failed to Like House')
            }
        }
    }

    const renderLikeIcon = (houseId) => {
        return likedHouses.includes(houseId) ? (
          <FavoriteIcon className='icon icon-1 red' />
        ) : (
          <FavoriteBorderIcon className='icon icon-1' />
        );
    }

    const handleAdd = async (houseId) => {
        const user = apiData?._id
        const house = houseId

        if(!isUser){
            toast.error('Please Login First')
        } else {
            const addHouse = await addHouseToFav({ user, house })
        }
    }

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])
  return (
    <div className='homes'>
        <Toaster position='top-center'></Toaster>
        <Navbar toggle={toggle} />
        <DropDown isOpen={isOpen} toggle={toggle} />
        <div className="home-container">
            <div className="search">
                <div className="search-box">
                    <input type="text" placeholder='Enter location to search for Homes'/>
                    <div className="search-icon">
                        <SearchIcon className='icon' />
                    </div>
                </div>
            </div>

            <span className='title'>{ isUser ? `Welcome back ${apiData?.username}` : ''}</span>
            <h1>Our Homes</h1>
            <div className="content">
                    {
                        displayData?.map((item) => (
                            <div data-aos='zoom-in' className="card" key={item._id}>
                                <div className="img">
                                    <div className="overlay">
                                        <div className="top">
                                            <div className="actions">
                                                <div className="fav" onClick={() => handleLike(item._id)}>
                                                    <div className="small-1">{ likedHouses.includes(item._id) ? 'Liked' : 'Like'}</div>
                                                    {renderLikeIcon(item._id)}
                                                </div>
                                                <div className="add" onClick={() => handleAdd(item._id)}>
                                                    <div className="small-2">Add to Favorites</div>
                                                    <AddIcon className='icon icon-2' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <img src={item.image} alt='home'/>
                                </div>
                                <p>{item.title}</p>
                                <Link to={`/home/${item._id}`} className='btn link' >
                                    View Details <ArrowForwardIcon className='icon' />
                                </Link>
                            </div>
                        ))
                    }
            </div>
            <div className="pagination">
                <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    prev
                </button>
                <span>{ currentPage } of { totalPages } </span>
                <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    next
                </button>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Homes