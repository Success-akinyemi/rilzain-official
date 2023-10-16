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
import AddIcon from '@mui/icons-material/Add';
import { toast, Toaster } from 'react-hot-toast'
import SearchIcon from '@mui/icons-material/Search';
import { useFetch, useFetchHouses } from '../../hooks/fetch.hooks';
import Spinner from '../../Components/Helpers/Spinner/Spinner';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Homes({ isOpen, toggle, renderLikeIcon, handleLike, renderLikeText, handleAdd, handleDelete}) {
    
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResultFound, setSearchResultFound] = useState(false)
    const [filteredData, setFilteredData] = useState([])
    
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



/** 
    // Handle Serach Functionality
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value)
    }
    const filteredData = houseData?.filter((item) => {
        const { location, address } = item;
        return(
            location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            address.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })
*/

const handleSearchInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = houseData?.filter((item) => {
        const { location, address } = item;
        return (
            location.toLowerCase().includes(query) ||
            address.toLowerCase().includes(query)
        );
    });
    setFilteredData(filtered)
    setSearchResultFound(filteredData.length > 0 || query === '');
}


    const dataToDisplay = searchResultFound ? filteredData : displayData
    
    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])
    if(houseServerError){
        return <h1>Please Check Your NetWork Connection</h1>
    }
  return (
    <div className='homes'>
        <Toaster position='top-center'></Toaster>
        <Navbar toggle={toggle} />
        <DropDown isOpen={isOpen} toggle={toggle} />
        <div className="home-container">
            <div className="search">
                <div className="search-box">
                    <input 
                        type="text" 
                        placeholder='Enter location to search for Homes'
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                    <div className="search-icon">
                        <SearchIcon className='icon' />
                    </div>
                </div>
            </div>

            <span className='title'>{ apiData ? `Welcome back ${apiData?.username ? apiData?.username : ''}` : ''}</span>
            <h1>Our Homes</h1>
            {
                isLoadingHouseData ? (
                    <Spinner />
                ) : (
                <div className="content">
                        {  searchQuery && !searchResultFound ? (
                                <div className="no-result">No House Found Please Check other Location</div>
                            ) : (
                                dataToDisplay?.map((item) => (
                                <div data-aos='zoom-in' className="card" key={item._id}>
                                    <div className="img">
                                        <div className="overlay">
                                            <div className="top">
                                                <div className="actions">
                                                    <div className="fav" onClick={() => handleLike(item._id)}>
                                                        <div className="small-1">{renderLikeText(item._id)}</div>
                                                        {renderLikeIcon(item._id)}
                                                    </div>
                                                    <div className="add" onClick={() => handleAdd(item._id)}>
                                                        <div className="small-2">Add to Favorites</div>
                                                        <AddIcon className='icon icon-2' />
                                                    </div>
                                                    {
                                                        apiData?.isAdmin ? (
                                                            <>
                                                                <div className="edit">
                                                                    <div className="small-3">Edit</div>
                                                                    <Link to={`/editHouse/${item._id}`} className='link'>
                                                                        <EditIcon className='icon icon-3' />
                                                                    </Link>
                                                                </div>
                                                                <div className="del" onClick={() => handleDelete(item._id)}>
                                                                    <div className="small-4">Delete</div>
                                                                    <DeleteIcon className='icon icon-4' />
                                                                </div>
                                                            </>

                                                        ) : (
                                                            ''
                                                        )
                                                    }
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
                            )
                        }
                </div>
                )
            }
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