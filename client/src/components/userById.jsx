import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../redux/actions';

const UserById = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

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
      <p>Email: {user.login.email}</p>
      {/* Render other user details as needed */}
    </div>
  );
};

export default UserById;