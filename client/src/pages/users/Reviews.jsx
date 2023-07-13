import React from 'react';
import { useSelector } from 'react-redux';
import AddingRating from '@/components/addingRating';
import AddComments from '@/components/addComments';

const Reviews = () => {
  const user = useSelector((state) => state.user);

  if (!user) {
    // Redireccionar si el usuario no está autenticado
    return null;
  }

  return (
<div>
<AddingRating/>    
<AddComments/>
</div>
  );
};

export default Reviews;