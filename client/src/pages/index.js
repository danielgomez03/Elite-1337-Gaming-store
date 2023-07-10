
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Products from './guest/Products';
import CardContainer from '../components/cardsContainer';

function Index() {

  return (
    <div>
      <CardContainer />
    </div>
  );
}

export default Index;
