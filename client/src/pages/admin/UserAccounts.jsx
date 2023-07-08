import { fetchUsers, modifyIsActiveUser } from '@/redux/actions';
import React, { useEffect , useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
function UserAccounts() {
  const dispatch = useDispatch();
  const users = useSelector(state=>state.users)
  useEffect(()=>{
 dispatch(fetchUsers())

  },[])
  const [buttonStates, setButtonStates] = useState({});

  const handleClick = (userId,isActive) => {
    
   
      dispatch(modifyIsActiveUser(userId,isActive)).then(()=>{
        dispatch(fetchUsers())
      })
   
    
  };
  return (
    <div>UserAccounts
        <div>
      {users.map((user) => (
        <div key={user.userId} className="">
          <span><img src={user.image.url} alt="User Avatar" className="user-avatar" /></span>
          <span className="user-name">{`${user.firstName} ${user.lastName}`}</span>
          <button name={user.userId} onClick={() => handleClick(user.userId,user.isActive)}>
              
              {user.isActive? 'Activo' : 'Inactivo'}
            </button>
 
        </div>
      ))}
    </div>
    </div>
  )
}

export default UserAccounts