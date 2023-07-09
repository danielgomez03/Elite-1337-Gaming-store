import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { changeUser, confirmSession, fetchUserById } from '@/redux/actions.js';
import Products from './guest/Products';
import CardContainer from '../components/cardsContainer';

function Index() {
  const dispatch = useDispatch();
  const router = useRouter();

  const typeUser = useSelector((state) => state.typeUser);
  const tokenRedux = useSelector((state) => state.token);
  const userId = useSelector((state) => state.userId);
  const session = useSelector((state) => state.session);
  const user = useSelector((state) => state.user);

  const [sessionConfirmed, setSessionConfirmed] = useState(false);

  useEffect(() => {
    session && dispatch(fetchUserById(userId));
  }, [session])

  useEffect(() => {
    const storedTypeUser = localStorage.getItem('typeUser');
    const storedTokenRedux = localStorage.getItem('tokenRedux');
    const storedUserId = localStorage.getItem('userId');
    if (user && Object.keys(user).length !== 0) {
      if (user.userRole === "admin" || user.userRole === "super") {
        dispatch(changeUser("admin"));
      } else if (user.userRole === "common") {
        dispatch(changeUser("users"));
      }
      localStorage.setItem('typeUser', typeUser);
      localStorage.setItem('tokenRedux', tokenRedux);
      localStorage.setItem('userId', userId);
    } else if (storedTokenRedux && storedTypeUser && storedUserId) {
      dispatch(confirmSession(storedTokenRedux, storedUserId));
    }
    setSessionConfirmed(true);
  }, [tokenRedux, userId, user]);


  useEffect(() => {
    if (sessionConfirmed) {
      if (!session) {
        router.push('/');
      }
    }
  }, [sessionConfirmed, session]);

  useEffect(() => {
    console.log("tokenRedux", tokenRedux);
    console.log("session", session);
    console.log("userId", userId);
  }, [tokenRedux, session, userId]);

  return (
    <div>
      <CardContainer />
    </div>
  );
}

export default Index;
