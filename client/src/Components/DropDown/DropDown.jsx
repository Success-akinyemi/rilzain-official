import { Link, useNavigate } from 'react-router-dom';
import menuData from '../../data/MenuData';
import Button from '../Helpers/Button/Button';
import './DropDown.css'
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useFetch } from '../../hooks/fetch.hooks';
import AddIcon from '@mui/icons-material/Add';

function DropDown({isOpen, toggle}) {
    const navigate = useNavigate()
    
    const { isLoading, apiData, serverError } = useFetch()

    
    const handleLogout = () => {
        localStorage.removeItem('authToken')
        navigate('/')
        toggle()
    }
  return (
    <div className={`dropDown ${isOpen ? 'open' : 'close'}`} >
        <div className='closeBtn' onClick={toggle} isOpen={isOpen}>
            <CloseIcon className='icon' />
        </div>

        <div className="menu">

            {
                menuData.map((item, idx) => (
                    <Link 
                        className='menuList link' 
                        to={item.link} 
                        key={idx}
                        onClick={toggle}
                    >
                        {item.title}
                    </Link>
                ))
            }
    
        </div>


        <div className="btn">
            <div className='btn-top' onClick={toggle}>
                <Button
                    to={`${ apiData ? '/myHomes' : '/registration'}`}
                    text={`${ apiData ? 'My homes' : 'Login' }`}
                    big={true}
                />
                {
                    apiData?.isAdmin ? (
                        <Button 
                            to={'/newHome'}
                            text={<div className='text'>
                                <AddIcon className='icon' />
                                Add New Home
                                </div>
                            }
                            big={true}
                        />
                    ) : (
                        ''
                    )
                }
            </div>

            {
                apiData ? (
                    <div className="card">
                    <span onClick={toggle}><Link to='/profile' className='link'><AccountCircleIcon className='icon' /> Profile</Link></span>
                    <span onClick={handleLogout}><LogoutIcon className='icon' /> Logout</span>
                    </div>
                ) : (
                    ''
                )
            }
        </div>
    </div>
  )
}

export default DropDown