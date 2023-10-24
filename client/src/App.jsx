import { useEffect, useState } from 'react'
import './App.css'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { toast, Toaster } from 'react-hot-toast'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './Pages/LandingPage/LandingPage'
import Homes from './Pages/Homes/Homes'
import Home from './Pages/Home/Home'
import Registration from './Pages/Registration/Registration'
import { AdminUser, AuthorizeUser, ValidToken } from './auth/PrivateRoute'
import MyHomes from './Pages/MyHomes/MyHomes'
import NewHome from './Pages/NewHome/NewHome'
import Contact from './Pages/Contact/Contact'
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Profile from './Pages/Profile/Profile'
import ForgotPassword from './Components/Content/ForgotPassword/ForgotPassword'
import ResetPassword from './Components/Content/ResetPassword/ResetPassword'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useFetch } from './hooks/fetch.hooks'
import { addHouseToFav, deleteHouse, deleteSaveHouse, likeHouse } from './helpers/apis'
import EditHouse from './Pages/EditHouse/EditHouse'
import Rentals from './Pages/Rentals/Rentals'
import Rental from './Pages/Rental/Rental'
import EditRental from './Pages/EditRental/EditRental'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [contact, setContact] = useState(false)
  const [likedHouses, setLikedHouses] = useState([])

  const { isLoading, apiData, serverError } = useFetch()


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

        if(!apiData){
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

    const renderLikeText = (houseId) => {
      return likedHouses.includes(houseId) ? 'Liked' : 'Like'
    }

        //Handle Add functionality
        const handleAdd = async (houseId) => {
          const user = apiData?._id
          const house = houseId
  
          if(!apiData){
              toast.error('Please Login First')
          } else {
              const addHouse = await addHouseToFav({ user, house })
          }
      }
  
      //Handle Delete functionality
      const handleDelete = async (houseId) => {
          const admin = apiData?.isAdmin
          const confirmed = window.confirm('Are you sure you want to delete this house')
          if(!admin){
              toast.error('Not Allowed')
          }
          if(confirmed){
              try {
                  const deletedHouse = await deleteHouse({ houseId, admin })
              } catch (error) {
                  console.log(error)
                  toast.error('Could not delete House')
              }
          }
      }

      const handleRemove = async(houseId) => {
        const token = localStorage.getItem('authToken')
        const user = apiData?._id !== token
        const userId = apiData?._id
        const confirmed = window.confirm('Are you sure you want to delete this house')
        if(!user){
            toast.error('Not Allowed')
        }
        if(confirmed){
            try {
                const deletedSavedHouse = await deleteSaveHouse({ houseId, userId })
            } catch (error) {
                console.log(error)
                toast.error('Could not delete House')
            }
        }
      }

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const toggleContact = () => {
    setContact(!contact)
    const showIcons = document.querySelector('.app .layer .icons')
    showIcons.classList.toggle('visible')
  }

  const isUser = localStorage.getItem('authToken')
  return (
    <div className='app'>
      <Toaster position='top-center'></Toaster>
      <div className="layer">
        {
          contact ? (
          <div className="icons visible ">
            <a href="https://wa.me/+2347025073509?text=Hello,"><WhatsAppIcon className='icon' /></a>
            <a href="tel:+2348115397098"><LocalPhoneIcon className='icon' /></a>
          </div>
          ) : (
            ''
          )
        }
        <span onClick={toggleContact}><ContactSupportIcon className='icon' /> </span>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage toggle={toggle} isOpen={isOpen} />} isUser={isUser} />
          <Route path='/home' element={<Homes toggle={toggle} isOpen={isOpen} renderLikeIcon={renderLikeIcon} handleLike={handleLike} renderLikeText={renderLikeText} handleAdd={handleAdd} handleDelete={handleDelete} />} />
          <Route path='/rentals' element={<Rentals toggle={toggle} isOpen={isOpen} />} />
          <Route path='/rental/:id' element={<Rental toggle={toggle} isOpen={isOpen} />} />
          <Route path='/contact' element={<Contact toggle={toggle} isOpen={isOpen} />} />
          <Route path='/home/:id' element={<Home toggle={toggle} isOpen={isOpen} renderLikeIcon={renderLikeIcon} handleLike={handleLike} renderLikeText={renderLikeText} handleAdd={handleAdd} handleDelete={handleDelete}/>} />
          <Route path='/myHomes' element={<AuthorizeUser><MyHomes toggle={toggle} isOpen={isOpen} renderLikeIcon={renderLikeIcon} handleLike={handleLike} renderLikeText={renderLikeText} handleAdd={handleAdd} handleRemove={handleRemove}/></AuthorizeUser>} />
          <Route path='/profile' element={<AuthorizeUser><ValidToken><Profile toggle={toggle} isOpen={isOpen} /></ValidToken></AuthorizeUser>} />
          <Route path='/newHome' element={<AuthorizeUser><AdminUser><ValidToken><NewHome toggle={toggle} isOpen={isOpen} /></ValidToken></AdminUser></AuthorizeUser>} />
          <Route path='/editHouse/:id' element={<AuthorizeUser><AdminUser><ValidToken><EditHouse toggle={toggle} isOpen={isOpen} /></ValidToken></AdminUser></AuthorizeUser>} />
          <Route path='/editRental/:id' element={<AuthorizeUser><AdminUser><ValidToken><EditRental toggle={toggle} isOpen={isOpen} /></ValidToken></AdminUser></AuthorizeUser>} />
          <Route path='/registration' element={<Registration toggle={toggle} />} />
          <Route path='/recovery' element={<ForgotPassword />} />
          <Route path='/passwordReset/:resetToken' element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
