import axios from 'axios'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '@/redux/actions';
import { useEffect } from 'react';

const CreateProduct = ({ onClose }) => {

    const validate = (form) => {
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
        name: "",
        description: "",
        manufacturer: "",
        origin: "",
        price: 0,
        discount: 0,
        stock: 0,
        isActive: false,//fata input
        category: "",
        image: "",

    })
    const [error, setError] = useState({})

    const categoryHandler = (event) => {

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

    const onChangeHandler = (event) => {

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

    const imagesHandler = (event) => {
        event.preventDefault();
        const imagesUrl = { url: event.target.value }
        setForm({
            ...form,
            images: [...form.images, imagesUrl],
        })

    }
    const onSubmithandler = (event) => {
        event.preventDefault();
        console.log(form)
        if (Object.keys(error).length)
            return alert('missing info')



        axios.post(URL, form)
            .then(res => alert(res.data))
            .catch(error => alert(error.data))

    }

    const [discount, setDiscount] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleSelectOption = (value) => {
        setDiscount(value);
        setIsFocused(false);
    };

    return (
        <form
            action="/products"
            method="POST"
            encType="multipart/form-data"
            onSubmit={onSubmithandler}
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-5"
        >
            <div className="w-10 relative h-auto min-w-[600px] bg-white rounded-lg flex flex-col justify-center items-center p-10">
                <button className="absolute top-2 right-4" onClick={onClose}>
                    X
                </button>
                <div className="w-full flex flex-row flex-wrap justify-between">
                    <div className="mb-4 w-full">
                        <label htmlFor="name" className="block mb-2">
                            Name Product
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={form.name}
                            onChange={onChangeHandler}
                            name="name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        />
                        {error.name ? <p className="text-red-500">{error.name}</p> : ""}
                    </div>

                    <div className="mb-4 w-1/4 pr-2">
                        <label htmlFor="price" className="block mb-2">
                            Price
                        </label>
                        <input
                            id="price"
                            type="text"
                            value={form.price}
                            onChange={onChangeHandler}
                            name="price"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        />
                        {error.price ? <p className="text-red-500">{error.price}</p> : ""}
                    </div>

                    <div className="mb-4 w-1/4 pl-2">
                        <label htmlFor="discount" className="block mb-2">
                            Discount (%)
                        </label>
                        <div className={`relative ${isFocused ? 'focus' : ''}`}>
                            <select
                                id="discount"
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                name="discount"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            >
                                {Array.from({ length: 19 }, (_, index) => (index + 1) * 5).map((value) => (
                                    <option key={value} value={value.toString()}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                            {isFocused && (
                                <div className="absolute top-full left-0 z-10 w-full py-2 mt-1 overflow-auto bg-white border border-gray-300 rounded-lg max-h-24">
                                    {Array.from({ length: 4 }, (_, index) => (index + 1) * 5).map((value) => (
                                        <div
                                            key={value}
                                            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                            onClick={() => handleSelectOption(value)}
                                        >
                                            {value}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {error.discount ? <p className="text-red-500">{error.discount}</p> : ""}
                    </div>

                    <div className="mb-4 w-1/4 pr-2">
                        <label htmlFor="stock" className="block mb-2">
                            Stock
                        </label>
                        <input
                            id="stock"
                            type="text"
                            value={form.stock}
                            onChange={onChangeHandler}
                            name="stock"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        />
                        {error.stock ? <p className="text-red-500">{error.stock}</p> : ""}
                    </div>

                    <div className="mb-4 w-full">
                        <label htmlFor="description" className="block mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={form.description}
                            onChange={onChangeHandler}
                            name="description"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 resize-y"
                        />
                        {error.description ? (
                            <p className="text-red-500">{error.description}</p>
                        ) : ""}
                    </div>

                    <div className="mb-4 w-1/2 pr-2">
                        <label htmlFor="manufacturer" className="block mb-2">
                            Manufacturer
                        </label>
                        <input
                            id="manufacturer"
                            type="text"
                            value={form.manufacturer}
                            onChange={onChangeHandler}
                            name="manufacturer"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-4 w-1/2 pl-2">
                        <label htmlFor="origin" className="block mb-2">
                            Origin
                        </label>
                        <input
                            id="origin"
                            type="text"
                            value={form.origin}
                            onChange={onChangeHandler}
                            name="origin"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        />
                        {error.origin ? <p className="text-red-500">{error.origin}</p> : ""}
                    </div>

                    <div className="mb-4 w-full">
                        <label htmlFor="category" className="block mb-2">
                            Category
                        </label>
                        <select
                            value={selectedCategory}
                            onChange={categoryHandler}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        >
                            <option value="select">SELECT CATEGORY</option>
                            {categories.map((cat) => (
                                <option key={cat.name} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4 w-full">
                        <label htmlFor="subcategory" className="block mb-2">
                            Subcategory
                        </label>
                        <select
                            value={selectedSubcategory}
                            onChange={handleSubcategory}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        >
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

                    <div className="mb-4 w-full">
                        <label htmlFor="image" className="block mb-2">
                            Image
                        </label>
                        <input
                            placeholder='Enter URL...'
                            type="text"
                            value={form.image}
                            onChange={imagesHandler} name='images'
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                </div>
                <div>
                    <button type="submit">SUBMIT</button>
                </div>
            </div>
        </form>
    )
}

export default CreateProduct
