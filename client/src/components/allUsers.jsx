import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../redux/actions';

const allUsers = () => {
  const users = useSelector((state) => state.users);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) {
    return <p>Cargando usuarios...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Lista de usuarios</h2>
      {users.map((user) => (
        <div key={user.userId}>
          <p>Nombre: {user.firstName} {user.lastName}</p>
        </div>
      ))}
    </div>
  );
};

export default allUsers;