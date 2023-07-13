import React, { useEffect, useState } from 'react';
import { getCommentsByProduc} from "../redux/actions"

import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:3001';
} else {
  axios.defaults.baseURL = 'https://ft37bpfgrupo12-production.up.railway.app/';
}



export default function Comments({id}) {
  const dispatch = useDispatch();

   
  useEffect(()=> {
    if(id){
    dispatch(getCommentsByProduc(id))
    }
    
  },[dispatch,id])
  const comments = useSelector(state=>state.commentsByProduct)
 

  const [users, setUsers] = useState([]);
 
  useEffect(() => {
    const fetchUsersData = async () => {
      const userPromises = comments.map(comment =>
        axios.get(`/users/id/${comment.userId}`)
      );
      try {
        const responses = await Promise.all(userPromises);
        const usersData = responses.map(response => response.data);
        setUsers(usersData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsersData();
  }, [comments]);


  


  return (
    <div><div>
    <div className="max-h-50 overflow-y-scroll mt-4">
    {comments.length>0 &&<h2 className="mb-2">Reviews:</h2>}
    <ul className="bg-gray-100 p-4 rounded-lg">
      {comments?.map((comment, index) => (
        <li key={comment.commentId} className="mb-4 p-2 border border-gray-300 rounded-lg">
          <p className="text-gray-800">
            <h3>{comment.createdAt.split('T')[0]}</h3>
            <h2>{comment.content}</h2>
            {users[index] && <p>Author: {users[index].firstName}</p>}
            </p>
          
        </li>
      ))}
    </ul>
  </div>
    
      </div></div>
  )
}