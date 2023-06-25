import axios from 'axios'
import { useState } from 'react'
import React from 'react';
// import { UseSelector } from 'react-redux/es/hooks/useSelector';

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
//  const categories = useSelector(state=>state.categories)
  const categories = [
  {
      name: 'Hardware',
      isMainCategory: true,
      
      subcategories: [
          {
              name: 'Procesadores (CPU)',
          },
          {
              name: 'Placas Madre (Motherboards)',
          },
          {
              name: 'Placas de Video (GPU)',
          },
          {
              name: 'Almacenamiento',
              subcategories: [
                  {
                      name: 'Disco Rígido Externo',
                  },
                  {
                      name: 'Disco Interno Mecánico',
                  },
                  {
                      name: 'Disco SSD / SSD M.2',
                  },
                  {
                      name: 'Ópticos (DVD / Blu-Ray)',
                  },
                  {
                      name: 'Pen Drives',
                  },
                  {
                      name: 'MicroSD',
                  },
              ],
          },
          {
              name: 'Cooling / Refrigeración',
              subcategories: [
                  {
                      name: 'Coolers CPU',
                  },
                  {
                      name: 'Coolers Gabinete',
                  },
                  {
                      name: 'Pastas Térmicas',
                  },
              ],
          },
          {
              name: 'Memorias RAM',
              subcategories: [
                  {
                      name: 'DIMM (DDR3, DDR4)',
                  },
                  {
                      name: 'SO-DIMM',
                  },
              ],
          },
          {
              name: 'Gabinetes, Fuentes y Alimentación',
              subcategories: [
                  {
                      name: 'Gabinetes',
                  },
                  {
                      name: 'Fuentes',
                  },
                  {
                      name: 'Alimentación',
                  },
              ],
          },
      ],
  },
  {
      name: 'Monitores',
      isMainCategory: true,
      subcategories: [
          {
              name: 'Monitores',
          },
          {
              name: 'Monitores Gamer',
          },
      ],
  },
  {
      name: 'Periféricos y Accesorios',
      isMainCategory: true,
      subcategories: [
          {
              name: 'Auriculares',
          },
          {
              name: 'Kit Teclado/Mouse',
          },
          {
              name: 'Teclado',
          },
          {
              name: 'Mouse',
          },
          {
              name: 'Mouse Pads',
          },
          {
              name: 'Micrófonos',
          },
          {
              name: 'Parlantes',
          },
          {
              name: 'Joysticks',
          },
          {
              name: 'Webcams',
          },
          {
              name: 'Conectividad',
          },
          {
              name: 'Tabletas Digitalizadoras',
          },
          {
              name: 'Sillas Gamer',
          },
      ],
  },
  {
      name: 'Notebooks / Tablets',
      isMainCategory: true,
  },
  {
      name: 'Ofertas',
      isMainCategory: true,
  },
];
const [selectedCategory, setSelectedCategory] = useState('');
const [selectedSubcategory, setSelectedSubcategory] = useState('');
  
 
  const [form, setForm] = useState({
    name:"",
    description:"",
    manufacturer: "",
    origin: "",
    price:"",
    discount:"",
    stock: "",
    isActive:false,//fata input
    category:"",
    image:"",
    
  })
   const [error,setError]= useState({})

  const categoryHandler = (event)=>{
   
    const category = event.target.value;
    setSelectedCategory(category);

    // Buscar las subcategorías correspondientes a la categoría seleccionada
    const selectedCategoryObj = categories.find((cat) => cat.name === category);
    const subcategories = selectedCategoryObj.subcategories || [];
    setSelectedSubcategory(subcategories[0]?.name || '');

  }

  const handleSubcategory = (event) => {
    const subcategory = event.target.value;
    setSelectedSubcategory(subcategory);
  };
  

 
 
   

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
      
   
    
    axios.post("http://localhost:3001/products",form)
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
                    <select value={selectedCategory} onChange={categoryHandler}>
                        <option value='select'>
                            SELECT CATEGORY
                        </option>
                        {categories.map(cat => 
                            <option name={cat.name} value={cat.name}>
                                {cat.name}
                            </option>
                        )}
                    </select>
                    <div>
                        <select value={selectedSubcategory} onChange={handleSubcategory}>
                            <option value="">SubCategories</option>
                            {selectedCategory &&
                            categories
                                .find((cat) => cat.name === selectedCategory)
                                .subcategories?.map((subcategory) => (
                                <option key={subcategory.name} value={subcategory.name}>
                                    {subcategory.name}
                                </option>
                                ))}
                        </select>
                    </div>
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