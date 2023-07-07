import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../redux/actions';

const UserById = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  const userId = "ac5b18b6-6383-4a9f-8e4c-65ad3c93b81a";

  useEffect(() => {
    dispatch(fetchUserById(userId));
  }, [dispatch, userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>User ID: {user.userId}</p>
      <p>{user.firstName}</p>
    </div>
  );
};

export default UserById;