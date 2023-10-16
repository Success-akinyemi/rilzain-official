import { useEffect, useState } from 'react'
import DropDown from '../../Components/DropDown/DropDown'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import { useFetch, useFetchMyHomes } from '../../hooks/fetch.hooks'
import './MyHomes.css'
import Aos from 'aos'
import 'aos/dist/aos.css'
import Spinner from '../../Components/Helpers/Spinner/Spinner'

function MyHomes({ toggle, isOpen, renderLikeIcon, handleLike, renderLikeText, handleAdd, handleDelete }) {

  const [currentPage, setCurrentPage] = useState(1);

  const { isLoading, apiData, serverError } = useFetch()

  const { isLoadingMyHomesData, myHomesApiData, myHomesStatus, myHomesServerError} = useFetchMyHomes()
  const houseData = myHomesApiData?.data.saveHouseData

  console.log('MY HOUSE DTA', myHomesApiData?.data?.saveHouseData)

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


  
  //AOS INIT
  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, [])
  return (
    <div className='myHomes'>
        <Navbar toggle={toggle} />
        <DropDown toggle={toggle} isOpen={isOpen} />
        <div className='myHomes-container'>
            <h2>{apiData?.username}</h2>
            {
                isLoadingMyHomesData ? (
                    <Spinner />
                ) : (
                    <div className="content">
                            {
                                displayData?.map((item) => (
                                    <div data-aos='zoom-in' className="card" key={item._id}>
                                        <div className="img">
                                            <div className="overlay">
                                                <div className="top">
                                                    <div className="actions">
                                                        <div className="fav" onClick={() => handleLike(item._id)}>
                                                            <div className="small-1">{ renderLikeText(item._id) }</div>
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

export default MyHomes