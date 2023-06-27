import axios from 'axios'
import { useState, useEffect } from 'react'
import { productValidation } from './validations';

const CreateProduct = ({ onClose }) => {

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
    const [selectedSubSubcategory, setSelectedSubSubcategory] = useState('');

    const [form, setForm] = useState({
        name: "",
        description: "",
        manufacturer: "",
        origin: "",
        price: 0,
        discount: 0,
        stock: 0,
        isActive: false,
        category: ["","",""],
        image: "",
        images: []
    });

    const [error, setError] = useState({})

    useEffect(() => {
        setError(productValidation(form));
    }, [form]);    

    const categoryHandler = (event) => {

        const category = event.target.value;
        setSelectedCategory(category);
        form.category[0] = category;

        // Buscar las subcategorías correspondientes a la categoría seleccionada
        const selectedCategoryObj = categories.find((cat) => cat.name === category);
        const subcategories = selectedCategoryObj.subcategories || [];
        setSelectedSubcategory(subcategories[0]?.name || '');
    }

    const handleSubcategory = (event) => {
        const subcategory = event.target.value;
        setSelectedSubcategory(subcategory);
        form.category[1] = subcategory;
    };

    const handleSubSubcategory = (event) => {
        const subsubcategory = event.target.value;
        setSelectedSubSubcategory(subsubcategory);
        form.category[2] = subsubcategory;
    };

    const onChangeHandler = (e) => {
        let { name, value } = e.target;
        value === "true" ? value = true : value === "false" ? value = false : null;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };


    const imagesHandler = (event) => {
        event.preventDefault();
        const url = form.image.trim();
        if (url !== "") {
            setForm((prevForm) => ({
                ...prevForm,
                images: [...prevForm.images, url],
                image: ""
            }));
        }
    };

    const handleImageUpload = (event) => {
        const files = event.target.files;
        const imagesArray = Array.from(files);

        const selectedImages = imagesArray.slice(0, 3);

        const imageUrls = [];

        selectedImages.forEach((imageFile) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const imageUrl = event.target.result;

                imageUrls.push(imageUrl);

                if (imageUrls.length === selectedImages.length) {
                    setForm((prevForm) => ({
                        ...prevForm,
                        images: [...prevForm.images, ...imageUrls]
                    }));
                }
            };

            reader.readAsDataURL(imageFile);
        });
    };

    const removeImage = (index) => {
        setForm((prevForm) => {
            const updatedImages = [...prevForm.images];
            updatedImages.splice(index, 1);
            return {
                ...prevForm,
                images: updatedImages
            };
        });
    };

    const onSubmithandler = (event) => {
        event.preventDefault();
        console.log(form);
        if (Object.keys(error).length) {
            return alert('missing info');
        }

        if (shouldSubmit) {
            axios
                .post(`http://localhost:3000/admin/products`, form)
                .then((res) => alert(res.data))
                .catch((error) => alert(error.data));
        }
    };

    const [shouldSubmit, setShouldSubmit] = useState(false);

    const handleFormSubmit = () => {
        console.log(form);
        setShouldSubmit(true);
    };

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
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-5 z-50"
        >
            <div className="w-10 relative h-auto min-w-[600px] bg-white rounded-lg flex flex-col justify-center items-center p-10">
                <button className="absolute top-2 right-4" onClick={onClose}>
                    X
                </button>
                <div className="w-full flex flex-row flex-wrap justify-between">
                    <div className="mb-4 w-3/4 pr-2">
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
                        {error.name ? <p className="text-red-500 text-sm">{error.name}</p> : ""}
                    </div>

                    <div className="mb-4 w-1/4 pl-2">
                        <label htmlFor="isActive" className="block mb-2">
                            Active
                        </label>
                        <select
                            id="isActive"
                            value={form.isActive}
                            onChange={onChangeHandler}
                            name="isActive"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        >
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                        {error.isActive && <p className="text-red-500 text-sm">{error.isActive}</p>}
                    </div>

                    <div className="mb-4 w-1/2 pr-2">
                        <label htmlFor="price" className="block mb-2">
                            Price
                        </label>
                        <input
                            id="price"
                            type="number"
                            value={form.price}
                            onChange={onChangeHandler}
                            name="price"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        />
                        {error.price ? <p className="text-red-500 text-sm">{error.price}</p> : ""}
                    </div>

                    <div className="mb-4 w-1/4 px-2">
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
                                {Array.from({ length: 20 }, (_, index) => (index) * 5).map((value) => (
                                    <option
                                        key={value}
                                        value={value}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                        onClick={() => handleSelectOption(value)}
                                    >
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {error.discount ? <p className="text-red-500 text-sm">{error.discount}</p> : ""}
                    </div>

                    <div className="mb-4 w-1/4 pl-2">
                        <label htmlFor="stock" className="block mb-2">
                            Stock
                        </label>
                        <input
                            id="stock"
                            type="number"
                            value={form.stock}
                            onChange={onChangeHandler}
                            name="stock"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        />
                        {error.stock ? <p className="text-red-500 text-sm">{error.stock}</p> : ""}
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
                            <p className="text-red-500 text-sm">{error.description}</p>
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
                        {error.origin ? <p className="text-red-500 text-sm">{error.origin}</p> : ""}
                    </div>

                    <div className="mb-4 w-1/3 pr-2">
                        <label htmlFor="category" className="block mb-2">
                            Category
                        </label>
                        <select
                            value={selectedCategory}
                            onChange={categoryHandler}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        >
                            <option value="">----------</option>
                            {categories.map((category) => (
                                <option key={category.name} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {error.category ? <p className="text-red-500 text-sm">{error.category}</p> : ""}
                    </div>

                    <div className="mb-4 w-1/3 px-2">
                        <label htmlFor="subcategory" className="block mb-2">
                            Subcategory
                        </label>
                        <select
                            value={selectedSubcategory}
                            onChange={handleSubcategory}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        >
                            <option value="">----------</option>
                            {selectedCategory &&
                                categories
                                    .find((category) => category.name === selectedCategory)
                                    ?.subcategories?.map((subcategory) => (
                                        <option key={subcategory.name} value={subcategory.name}>
                                            {subcategory.name}
                                        </option>
                                    ))}
                        </select>
                    </div>

                    <div className="mb-4 w-1/3 pl-2">
                        <label htmlFor="subSubCategory" className="block mb-2">
                            Sub-Subcategory
                        </label>
                        <select
                            value={selectedSubSubcategory}
                            onChange={handleSubSubcategory}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        >
                            <option value="">----------</option>
                            {selectedCategory &&
                                selectedSubcategory &&
                                categories
                                    .find((category) => category.name === selectedCategory)
                                    ?.subcategories?.find((subcategory) => subcategory.name === selectedSubcategory)
                                    ?.subcategories?.map((subsubcategory) => (
                                        <option key={subsubcategory.name} value={subsubcategory.name}>
                                            {subsubcategory.name}
                                        </option>
                                    ))}
                        </select>
                    </div>

                    <div className="mb-4 w-full">
                        <label htmlFor="images" className="block mb-2">
                            Images
                            <span className="ml-2">(
                                {form.images.length} {form.images.length === 1 ? "image" : "images"} loaded)
                            </span>
                        </label>
                        <div className="flex flex-col items-center">
                            <div className='w-full mb-4'>
                                <input
                                    type="text"
                                    placeholder="Enter URL"
                                    value={form.image}
                                    onChange={(e) => setForm((prevForm) => ({ ...prevForm, image: e.target.value }))}
                                    name="images"
                                    className="w-4/5 mr-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                    disabled={form.images.length >= 3}
                                />
                                <button
                                    onClick={imagesHandler}
                                    disabled={form.image.length === 0}
                                    className="w-1/6 ml-2 py-2 bg-indigo-500 text-white rounded-md hover:bg-600"
                                >
                                    Add
                                </button>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                                className="w-auto ml-4"
                                disabled={form.images.length >= 3}
                            />
                        </div>
                        {error.images ? <p className="text-red-500 text-sm">{error.images}</p> : ""}
                    </div>

                    {/* Render the loaded images */}
                    <div className="flex items-center mb-4">
                        {form.images.map((image, index) => (
                            <div key={index} className="flex items-center m-6">
                                <img src={image} alt={`Image ${index + 1}`} className="w-16 h-16 object-cover rounded mr-2" />
                                <button onClick={() => removeImage(index)} className="text-red-500 hover:text-red-700">
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full" >
                    <button
                        type="button"
                        onClick={handleFormSubmit}
                        className="w-full px-4 mt-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
                    >
                        SUBMIT
                    </button>
                </div>
            </div>
        </form>
    )
}

export default CreateProduct
