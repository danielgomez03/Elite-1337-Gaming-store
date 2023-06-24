import axios from 'axios'
import { useState } from 'react'

const categories=[]
const validate=(form)=> {
    let error = {};
    
    if (!form.name) {
        error.name = "enter name";
    }
    
   
    if (!form.manufacturer) {
        error.manufacturer = "enter info";
    }
    if (!form.origin) {
        error.origin = "enter info"
    }
    if (!form.price) {
        error.price = "enter info"
    }
    if (!form.discount) {
        error.discount = "enter info"
    }
    if (!form.stock) {
        error.stock = "enter info"
    }
    return error;
  }
  



export default function Form() {
 
  
  
 
  const [form, setForm] = useState({
    name:"",
    description:"",
    manufacturer: "",
    origin: "",
    price:"",
    discount:0,
    stock: 0,
    isActive:false,//fata input
    category:"",
    image:"",
    ratings:"", //falta input 
  })
   const [error,setError]= useState({})

  const categoryHandler = ()=>{}
  

 
 
   

  const onChangeHandler =(event)=>{
    
  //  console.log(event.target.name)
  setError(
    validate({
      ...form, [event.target.name]: event.target.value
    })
  )
  
   setForm({
    ...form, [event.target.name]: event.target.value
   })
  }
  const onSubmithandler=(event)=>{
    event.preventDefault();
    console.log(form)
    if(Object.keys(error).length)
      return alert('missing info')
      
   
    
    axios.post(URL,form)
    .then(res=>alert(res.data))
    .catch(error=>alert(error.data))
    
    }
    
  

  return (
  <form action="/products" method="POST" enctype="multipart/form-data" onSubmit={onSubmithandler}>
    <div>
    <div>
    <div>
      
      <input placeholder='Enter New Product...'type="text" value={form.name} onChange={onChangeHandler} name='name'/>
      {error.name ? (<p>{error.name}</p>) : ""}
    </div>
    <div>
    <input placeholder='description...'type="textarea" value={form.description} onChange={onChangeHandler} name='description'/>
      {error.description ? (<p>{error.description}</p>) : ""}
     
    </div>
    <div>
    <input placeholder='manufacturer...'type="text" value={form.manufacturer} onChange={onChangeHandler} name='manufacturer'/>
      {error.manufacturer ? (<p>{error.manufacturer}</p>) : ""}
    </div>
    <div>
    <input placeholder='origin...'type="text" value={form.origin} onChange={onChangeHandler} name='origin'/>
      {error.origin ? (<p>{error.origin}</p>) : ""}
     
    </div>
    
    <div>
    <input placeholder='price...'type="text" value={form.price} onChange={onChangeHandler} name='price'/>
      {error.price ? (<p>{error.price}</p>) : ""}
    </div>
    
    <div>
    <input placeholder='discount...'type="text" value={form.discount} onChange={onChangeHandler} name='discount'/>
      {error.discount ? (<p>{error.discount}</p>) : ""}
    </div>

    <div>
    <input placeholder='stock...'type="text" value={form.stock} onChange={onChangeHandler} name='stock'/>
      {error.stock ? (<p>{error.stock}</p>) : ""}
    </div>
    
   
    <div>
    <select name="category" onChange={categoryHandler}>
                                <option value='select'>SELECT CATEGORY</option>
                                {categories.map(cat => 
                                    <option name={cat.name} value={cat.categoryId}>
                                        {country.name}
                                    </option>
                                )
                                }
                            </select>
                            {categories.categoryId && (
        <div>
          <label>Subcategories:</label>
          <ul>
            {subcategorie.map(subcat => (
              <li value={subcat.name}>{subcat.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
    <div>
    <label for="image">Image:</label>
    <input type="file" name="image" alt='image'/>
  </div>
  
    
      
      
      </div>
      <div>
      
                   
                    <button  type='submit'>SUBMIT</button>
      </div>
     
      </div>
    </form>
  )
}