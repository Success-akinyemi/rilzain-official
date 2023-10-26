import { useEffect, useState } from 'react'
import DropDown from '../../Components/DropDown/DropDown'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import { useFetch, useFetchRental } from '../../hooks/fetch.hooks'
import SearchIcon from '@mui/icons-material/Search';
import './Rentals.css'
import Spinner from '../../Components/Helpers/Spinner/Spinner'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { Link } from 'react-router-dom'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';

function Rentals({isOpen, toggle, handleRentalLike, renderLikeIcon, renderLikeText, handleRentalDelete}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResultFound, setSearchResultFound] = useState(false)
    const [filteredData, setFilteredData] = useState([])

    const { isLoading, apiData, serverError } = useFetch()
    const { isLoadingRentalData, apiRentalData, rentalStatus, rentalServerError } = useFetchRental()
    const houseData = apiRentalData?.data.rental
    console.log('RENTAL DTA', houseData)

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

  return (
    <div className='rentals'>
        <Navbar toggle={toggle} />
        <DropDown isOpen={isOpen} toggle={toggle} />
        <div className="r-container">
            <div className="search">
                <div className="search-box">
                    <input 
                        type="text" 
                        placeholder='Enter location to search for Rentals'
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                    <div className="search-icon">
                        <SearchIcon className='icon' />
                    </div>
                </div>
            </div>

            <span className='title'>{ apiData ? `Welcome back ${apiData?.username ? apiData?.username : ''}` : ''}</span>
            <h1>Our Rental Properties</h1>
            {
                isLoadingRentalData ? (
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
                                                    <div className="fav" onClick={() => handleRentalLike(item._id)}>
                                                        <div className="small-1">{renderLikeText(item._id)}</div>
                                                        {renderLikeIcon(item._id)}
                                                    </div>
                                                    {
                                                        /**
                                                         *<div className="add" onClick={() => handleAdd(item._id)}>
                                                            <div className="small-2">Add to Favorites</div>
                                                            <AddIcon className='icon icon-2' />
                                                        *</div>
                                                         * 
                                                         */
                                                    }
                                                    {
                                                        apiData?.isAdmin ? (
                                                            <>
                                                                <div className="del" onClick={() => handleRentalDelete(item._id)}>
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
                                    {
                                        apiData?.isAdmin ? (
                                            <span className='edit'>
                                                <Link to={`/editRental/${item._id}`} className='link'>Edit</Link>
                                            </span>
                                        ) : 
                                        ('')
                                    }
                                    <Link to={`/rental/${item._id}`} className='btn link' >
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

export default Rentals