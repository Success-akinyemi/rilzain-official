import { useFetchAllUsers } from '../../hooks/fetch.hooks'
import './Members.css'

function Members() {
  const {isLoadingUsers, apiUsersData, usersStatus, usersServerError} = useFetchAllUsers();
  const users = apiUsersData?.data
  console.log('users', users)

  if(isLoadingUsers){
    return <div>Loadding</div>
  }
  return (
    <div className='members'>
        Members
    </div>
  )
}

export default Members