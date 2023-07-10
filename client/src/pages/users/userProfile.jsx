import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserById from '@/components/userById';

const userProfile = () => {
  return (
    <div>
      <UserById/>
    </div>
  );
}

export default userProfile;