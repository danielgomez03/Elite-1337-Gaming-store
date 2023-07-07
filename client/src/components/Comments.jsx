import React, { useEffect, useState } from 'react';
import { getCommentsByProduc} from "../redux/actions"
import { useDispatch, useSelector } from 'react-redux';
import Rating from '@/components/Rating';
import axios from 'axios';



export default function Comments({id}) {
  const dispatch = useDispatch();

  // manejar con redux a futuro 
  const purchased = true;
  const userId = "ac5b18b6-6383-4a9f-8e4c-65ad3c93b81a"
 
  useEffect(()=> {
    if(id){
    dispatch(getCommentsByProduc(id))
    }
    
  },[dispatch,id])
  const comments = useSelector(state=>state.commentsByProduct)
  console.log(comments)

  const [users, setUsers] = useState([]);
  console.log(users)
  useEffect(() => {
    const fetchUsersData = async () => {
      const userPromises = comments.map(comment =>
        axios.get(`http://localhost:3001/users/id/${comment.userId}`)
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


  const [content,setContent] = useState()
  const onChange = (e) => {
     
     setContent(e.target.value)
  }
 
  const onSubmitComment=(e) => {
    e.preventDefault();
    const comment = {userId:userId,productId:id,content:content}
    axios.post("http://localhost:3001/comments/add", comment )
    .then(()=>{
      dispatch(getCommentsByProduc(id))
    setContent("")
    })
    .catch(error=>alert(error.data))
    

  }


  return (
    <div><div>
    <div className="max-h-50 overflow-y-scroll mt-4">
    <h2 className="mb-2">Reviews:</h2>
    <ul className="bg-gray-100 p-4 rounded-lg">
      {comments?.map((comment, index) => (
        <li key={comment.commentId} className="mb-4 p-2 border border-gray-300 rounded-lg">
          <p className="text-gray-800">
            <h3>{comment.createdAt}</h3>
            <h2>{comment.content}</h2>
            {users[index] && <p>Author: {users[index].firstName}</p>}
            </p>
          {/* Otros elementos y estilos para cada comentario, como autor, fecha, etc. */}
        </li>
      ))}
    </ul>
  </div>
    {purchased &&
     <form onSubmit={onSubmitComment}>
     <div className="comment-form" style={{ maxWidth: '500px', margin: '0 auto' }}>
      
       <textarea
         onChange={onChange}
         value={content}
         placeholder="Enter your comment"
         className="comment-input"
         style={{
           width: '100%',
           height: '100px',
           padding: '8px',
           border: '1px solid #ccc',
           borderRadius: '4px',
           resize: 'vertical',
         }}
       />
       <button
         type="submit"
         className="comment-submit"
         style={{
           backgroundColor: '#007bff',
           color: '#fff',
           padding: '8px 16px',
           border: 'none',
           borderRadius: '4px',
           cursor: 'pointer',
         }}
       >
         Send
       </button>
     </div>
   </form>
    }
      </div></div>
  )
}
