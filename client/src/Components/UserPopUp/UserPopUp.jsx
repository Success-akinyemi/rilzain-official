import React, { useState } from 'react'

function UserPopUp({ user, onUpdateAdmin }) {
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
      setShowPopup(!showPopup);
    };
  return (
    <div className='userPopup'>
              <span className='ediBtn' onClick={togglePopup}>
        Edit
      </span>

      {showPopup && (
        <div className='popup'>
          <div className='popup-content'>
            <span className='close' onClick={togglePopup}>
              &times;
            </span>
            <h2>User Details</h2>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Phone Number: {user.phoneNumber}</p>
            <p>Is Admin: {user.isAdmin ? 'Yes' : 'No'}</p>

            <button onClick={() => onUpdateAdmin(user._id)}>Make Admin</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserPopUp