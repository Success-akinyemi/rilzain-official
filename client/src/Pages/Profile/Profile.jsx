import { Link, useNavigate } from 'react-router-dom';
import DropDown from '../../Components/DropDown/DropDown'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import './Profile.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UserProfile from '../../Components/UserProfile/UserProfile';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Members from '../../Components/Members/Members';
import { useState } from 'react';
import { useFetch } from '../../hooks/fetch.hooks';

function Profile({toggle, isOpen}) {
  const navigate = useNavigate()
  const [selectedMenuItem, setSelectedMenuItem] = useState(() => {
    const savedMenuItem = localStorage.getItem('selectedMenuItem');
    return savedMenuItem || 'userProfile'
  })
  const [menu, setMenu] = useState(false)

  const { isLoading, apiData, serverError } = useFetch()
  const userId = apiData?._id
  const grandAdmin = apiData?.isGrandAdmin
  const renderSelectedComponent = () => {
    switch(selectedMenuItem) {
      case 'userProfile':
        return <UserProfile />;
      case 'members':
        return apiData?.isAdmin ? <Members userId={userId} grandAdmin={grandAdmin} /> : <UserProfile />;


      default: 
        return <UserProfile />
    }
  }

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);

    localStorage.setItem('selectedMenuItem', menuItem)
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    navigate('/')
  }

  const toggleMenu = () => {
    setMenu(!menu)
  }
  return (
    <div className='profile'>
        <Navbar toggle={toggle} />
        <DropDown toggle={toggle} isOpen={isOpen} />
        <div className="profile-container">
            <div className={`sidebar ${menu ? 'show' : 'hide'}`}>
              <div className="closeBtn" onClick={toggleMenu}>
                <CloseIcon className='close-icon' />
              </div>
              <div className="top">
                <AccountCircleIcon className='top-icon' />
                <h2>{apiData?.username ? apiData?.username : ''}</h2>
              </div>

              <div className="middle">
                <span className='links' onClick={() => handleMenuItemClick('userProfile')}>Profile</span>
                { apiData?.isAdmin ? (
                    <span className='links' onClick={() => handleMenuItemClick('members')}>Members</span>
                  ) : (
                    ''
                  )
                }
                <span><Link className='link' to={'/myHomes'}>My Homes</Link></span>
              </div>

              <div className="logout" onClick={handleLogout}>
                Logout
              </div>
            </div>

            <div className="main">
              <div className="menuBtn" onClick={toggleMenu}>
                <MenuIcon className='menu-icon' />
              </div>
              <div className="m-container">
                {renderSelectedComponent()}
              </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Profile