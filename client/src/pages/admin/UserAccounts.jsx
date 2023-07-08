import { fetchUsers, modifyIsActiveUser } from '@/redux/actions';
import React, { useEffect , useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
function UserAccounts() {
  const dispatch = useDispatch();
  const users = useSelector(state=>state.users)
  useEffect(()=>{
 dispatch(fetchUsers())

  },[])

  const handleClick = (userId,isActive) => {
    
   
      dispatch(modifyIsActiveUser(userId,isActive)).then(()=>{
        dispatch(fetchUsers())
      })
   
    
  };
  return (
    
    <div className='user-list'>UserAccounts
<style>
  {`
      .user-list {
        width: 100%;
        max-width: 600px; /* Ajusta el ancho máximo del contenedor principal */
        margin: 0 auto;
      }
    .user-item {
      display: flex;
      align-items: center;
      width: 100%;
      margin-bottom: 1cm;
    }

    .user-avatar {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 50%;
      margin-right: 1cm;
    }

    .user-info {
      display: flex;
      flex-grow: 1;
      justify-content: space-between;
      align-items: center;
    }

    .user-name {
      font-weight: bold;
    }

    .user-status {
      padding: 0.2cm;
      border: none;
      border-radius: 4px;
      color: #fff;
      cursor: pointer;
      transition: background-color 0.3s ease;
      flex: 0 0 100px; /* Establece un ancho fijo para los botones */
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .user-status.active {
      background-color: green;
    }

    .user-status.inactive {
      background-color: red;
    }
  `}
</style>
        <div>
        {users.map((user) => (
  <div key={user.userId} className="user-item">
    <img src={user.image.url} alt="User Avatar" className="user-avatar" />
    <div className="user-info">
      <span className="user-name">{`${user.firstName} ${user.lastName}`}</span>
      <span>{`${user.firstName} ${user.lastName}`}</span>
      <button
        className={`user-status ${user.isActive ? 'active' : 'inactive'}`}
        onClick={() => handleClick(user.userId, user.isActive)}
      >
        {user.isActive ? 'Activo' : 'Inactivo'}
      </button>
    </div>
  </div>
))}
    </div>
    </div>
  )
}

export default UserAccounts