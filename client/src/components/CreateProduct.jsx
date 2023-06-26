import axios from 'axios'
import { useState } from 'react'
  

const CreateProduct = ({onClose}) =>{


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
        discount:0,
        stock: 0,
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
        
    
        
        axios.post(URL,form)
        .then(res=>alert(res.data))
        .catch(error=>alert(error.data))
        
        }
    
  

    return (
    <form action="/products" method="POST" encType="multipart/form-data" onSubmit={onSubmithandler} className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-5 ml-0 gap-2" >
        <div
            className="relative w-auto h-auto min-w-[600px] bg-white rounded-lg flex flex-col justify-center items-center p-10" >
            <button  
                className="absolute top-2 right-4"
                onClick={onClose}
            >
                X
            </button>
            <div className='w-full'>
                <div className="mb-4">
                    <input placeholder='Enter New Product...'type="text" value={form.name} onChange={onChangeHandler} name='name' className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"/>
                    {error.name ? (<p className="text-red-500">{error.name}</p>) : ""}
                </div>

                <div className="mb-4">
                    <input placeholder='description...'type="textarea" value={form.description} onChange={onChangeHandler} name='description' className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"/>
                    {error.description ? (<p className="text-red-500">{error.description}</p>) : ""}
                </div>

                <div className="mb-4">
                    <input placeholder='manufacturer...'type="text" value={form.manufacturer} onChange={onChangeHandler} name='manufacturer' className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"/>      
                </div>

                <div className="mb-4">
                    <input placeholder='origin...'type="text" value={form.origin} onChange={onChangeHandler} name='origin' className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"/>
                    {error.origin ? (<p className="text-red-500">{error.origin}</p>) : ""}
                
                </div>
                
                <div className="mb-4">
                    <input placeholder='price...'type="text" value={form.price} onChange={onChangeHandler} name='price' className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"/>
                    {error.price ? (<p className="text-red-500">{error.price}</p>) : ""}
                </div>
                
                <div className="mb-4">
                    <input placeholder='discount...'type="text" value={form.discount} onChange={onChangeHandler} name='discount' className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"/>
                    {error.discount ? (<p className="text-red-500">{error.discount}</p>) : ""}
                </div>

                <div className="mb-4">
                    <input placeholder='stock...'type="text" value={form.stock} onChange={onChangeHandler} name='stock' className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"/>
                    {error.stock ? (<p className="text-red-500">{error.stock}</p>) : ""}
                </div>
            
        
                <div className="mb-4">
                    <select value={selectedCategory} onChange={categoryHandler}>
                        <option value='select' className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500">
                            SELECT CATEGORY
                        </option>
                        {categories.map(cat => 
                            <option name={cat.name} value={cat.name}>
                                {cat.name}
                            </option>
                        )}
                    </select>
                    <div>
                        <select value={selectedSubcategory} onChange={handleSubcategory} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500">
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
                <div className="mb-4">
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

export default CreateProduct