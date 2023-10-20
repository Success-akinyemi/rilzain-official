import { useState } from 'react';
import { useFetch, useFetchAllUsers } from '../../hooks/fetch.hooks'
import Spinner from '../Helpers/Spinner/Spinner';
import './Members.css'
import EditIcon from '@mui/icons-material/Edit';
import { makeAdmin } from '../../helpers/apis';
import { Toaster } from 'react-hot-toast';

function Members() {
  
  const token = localStorage.getItem('authToken')

  const { isLoading, apiData, serverError } = useFetch(token)

  const users = apiData?.data
  console.log('users', users)

  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const togglePopup = (user) => {
    setSelectedUser(user);
    setShowPopup(!showPopup);
  };

  const handleMakeAdmin = async (id) => {
    const confirmed = window.confirm('Are you sure you want to make this user an admin?');
    if (confirmed) {
      const response = await makeAdmin({id})
    }
  }
  return (
    <div className='members'>
      <Toaster position='top-center'></Toaster>
        <h2>All Users</h2>
        <p>Total: {users?.length}</p>

        <div className="users">
          {
            isLoading ? (
              <Spinner />
            ) : (
              users?.map((item) => (
                <div className="user" key={item?._id}>
                <span>{item?.username}</span>
                <span>{item?.email}</span>
                <span><a href={`tel:${item.phoneNumber}`} className='link'>{item?.phoneNumber}</a></span>
                <span>Admin User: <b>{  item?.isAdmin === true ? ' YES' : ' NO'}</b></span>
                <span onClick={() => togglePopup(item)} className='ediBtn'><EditIcon className='icon' /></span>
              </div>
              ))
            )
          }
        </div>

        {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setShowPopup(false)}>
              &times;
            </span>
            <h2>User Details</h2>
            {selectedUser && (
              <div>
                <p>Username: {selectedUser.username}</p>
                <p>Email: {selectedUser.email}</p>
                <p>Phone Number: {selectedUser.phoneNumber}</p>
                <p>Is Admin: {selectedUser.isAdmin ? 'Yes' : 'No'}</p>
                <button
                  onClick={handleMakeAdmin(selectedUser._id)}
                >
                  Make Admin
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Members