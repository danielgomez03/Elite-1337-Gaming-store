import { fetchUsers, modifyIsActiveUser } from '@/redux/actions';
import React, { useEffect , useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
function UserAccounts() {
  const dispatch = useDispatch();
  const users = useSelector(state=>state.users)
  const [name, setName] = useState('');
  const [filteredUsers , setFilteredUsers] = useState([]);
  useEffect(()=>{
    dispatch(fetchUsers())
    
    
  },[dispatch])
  
  const handleClick = (userId,isActive) => {
    
    
    dispatch(modifyIsActiveUser(userId,isActive)).then(()=>{
      dispatch(fetchUsers())
    })
    
    
  };
 
  const handleFilterChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const typeAdmin = (e)=>{
    e.preventDefault();
  if(e.target.value ==="common")
   return setFilteredUsers( users.filter((user) => user.userRole === "common"))
   return setFilteredUsers( users.filter((user) => user.userRole === "super"))
  }
  const handleSubmit = () => {
    setFilteredUsers ( users.filter((user) =>
    user.firstName.toLowerCase().includes(name.toLowerCase()))
  );
  }
  return (
    <div><div>
       <button
                class='button'
                onClick={()=>{setFilteredUsers(users)
                }}>
                Rest
            </button>
       <input
        type="text"
        placeholder="Search User"
        value={name}
        onChange={handleFilterChange}
      />
       <button
                class='button'
                type='submit'
                onClick={()=>{handleSubmit()
                  setName('')}}>
                Search
            </button>
      </div>
         <select className='button'onChange={typeAdmin} name="" id="">
         <option  value=""selected='selected'>TypeUser:</option>
        <option value="common">TypeUser: User</option>
        <option value="super">TypeUser: Admin</option>
        
      </select>
    <div className='user-list'>
<style>
  {`
     .user-list {
      width: 100%;
      max-width: 600px; /* Ajusta el ancho máximo del contenedor principal */
      margin: 0 auto;
      margin-top: 2rem;
    }
    
    .table-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem;
      border-bottom: 1px solid #ccc;
      font-weight: bold;
    }
    
    .user-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem;
      border-bottom: 1px solid #ccc;
    }
    
    .column {
      display: flex;
      align-items: center;
    }
    
    .user-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    
    .user-name {
      margin-left: rem;
    }
    
    .user-email {
      margin: 0 1rem;
      white-space: nowrap; /* Evita que el texto se ajuste automáticamente */
      overflow: hidden; /* Oculta el contenido adicional */
      text-overflow: ellipsis; /* Agrega puntos suspensivos (...) si el contenido es demasiado largo */
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
      background-color:  #FF5F00;
    }

    .user-status.inactive {
      background-color: #C0C0C0;
    }
  `}
</style>

  <div className="table-header">
    <span className="column">Image</span>
    <span className="column">Name</span>
    <span></span>
    <span></span>
    <span></span>
    <span className="column">Email</span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span className="column">Status</span>
    <span></span>
  </div>
  {users.map((user) => (
    <div key={user.userId} className="user-item">
      <img src={user.image.url} alt="User Image" className="user-avatar column" />
      <span className="user-name column">{`${user.firstName} ${user.lastName}`}</span>
      <span className="user-email column">{user.login.email}</span>
      <span></span>
     
      <button
        className={`user-status ${user.isActive ? 'active' : 'inactive'} column`}
        onClick={() => handleClick(user.userId, user.isActive)}
      >
        {user.isActive ? 'Active' : 'disable'}
      </button>
    </div>
  ))}
</div>
</div>
  )
}

export default UserAccounts