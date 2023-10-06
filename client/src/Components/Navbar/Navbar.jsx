import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'
import MenuIcon from '@mui/icons-material/Menu';
import menuData from '../../data/MenuData';
import Button from '../Helpers/Button/Button';
import { useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useFetch } from '../../hooks/fetch.hooks';
import AddIcon from '@mui/icons-material/Add';

function Navbar({toggle, enableScrollEffect}) {
    const navigate = useNavigate()
    const [isScroll, setIsScroll] = useState(false)

    const { isLoading, apiData, serverError } = useFetch()

        useEffect(() => {
            if(enableScrollEffect){
                window.onscroll = () => {
                    setIsScroll(window.pageYOffset === 0 ? false : true)
                }
            }
        }, [])

        const isUser = localStorage.getItem('authToken')
        const handleLogout = () => {
            localStorage.removeItem('authToken')
            navigate('/')
        }
  return (
    <div className={`nav ${isScroll ? 'scroll' : 'none'} ${!enableScrollEffect ? 'show' : ''}`}>
        <h1 className='logo'>
            <Link className='link'to='/' >Rilzain Solutions</Link>
        </h1>
        <div onClick={toggle} className='icon'>
            <MenuIcon className='icon' />
        </div>

        <div className="navMenu">
            {
                menuData.map((item, idx) => (
                    <Link className='link menuItem' to={item.link} key={idx}>{item.title}</Link>
                ))
            }
        </div>
        <div className="btn">
            <div className='btn-top'>
                <Button
                    to={`${ isUser ? '/myHomes' : '/registration'}`}
                    text={`${ isUser ? 'My Homes' : 'Login' }`}
                    big={true}
                />

                {
                    apiData?.isAdmin  && (
                        <Button 
                            to={'/newHome'}
                            text={<div className='text'>
                                <AddIcon className='icon' />
                                Add New Home
                                </div>
                            }
                            big={true}
                        />
                    )
                }
            </div>

            {
                isUser ? (
                    <div className="profile">
                        <div className="card">
                            <span><Link to='/profile' className='link'>Profile</Link></span>
                            <span onClick={handleLogout}><Link className='link'>Logout</Link></span>
                        </div>
                        <AccountCircleIcon className='profile-icon' />
                    </div>
                ) :
                (
                    ''
                )
            }
        </div>
    </div>
  )
}

export default Navbar