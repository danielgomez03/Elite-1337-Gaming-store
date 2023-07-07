import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AllUsers from '@/components/allUsers';
import UserById from '@/components/userById';

const userProfile = () => {
  return (
    <div>
      <h1>¡Mi aplicación de React!</h1>
      <AllUsers/>
      <UserById/>
    </div>
  );
}

export default userProfile;