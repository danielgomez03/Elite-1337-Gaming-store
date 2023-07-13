import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

export default function AddComments({id}) {
    const [content,setContent] = useState('')
    const userId = useSelector(state=> state.userId)
    // const userId ="ac5b18b6-6383-4a9f-8e4c-65ad3c93b81a"
    const onChange = (e) => {
       
       setContent(e.target.value)
    }
   
    const onSubmitComment=(e) => {
      e.preventDefault();
      const comment = {userId:userId,productId:id,content:content}
      axios.post("http://localhost:3001/comments/add", comment )
      .then(()=>{
        
      setContent("")
      })
      .catch(error=>alert(error.data))
      
  
    }

  return (
    <div>
        <form onSubmit={onSubmitComment}>
        <div className="comment-form" style={{ maxWidth: '500px', margin: '0 auto' }}>
         
          <textarea
            onChange={onChange}
            value={content}
            placeholder="Enter your comment"
            className="comment-input"
            style={{
              width: '100%',
              height: '100%',
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
    </div>
  )
}
