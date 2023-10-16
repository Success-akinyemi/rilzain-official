import { useFetch, useFetchAllUsers } from '../../hooks/fetch.hooks'
import Spinner from '../Helpers/Spinner/Spinner';
import './Members.css'
import EditIcon from '@mui/icons-material/Edit';

function Members() {

  const token = localStorage.getItem('authToken')

  const { isLoading, apiData, serverError } = useFetch(token)

  const users = apiData?.data
  console.log('users', users)


  return (
    <div className='members'>
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
                <span className='ediBtn'><EditIcon className='icon' /></span>
              </div>
              ))
            )
          }
        </div>
    </div>
  )
}

export default Members