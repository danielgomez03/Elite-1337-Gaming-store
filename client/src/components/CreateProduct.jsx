import axios from 'axios'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '@/redux/actions';
import { productValidation } from './validations';

const CreateProduct = ({ onClose }) => {

    const dispatch = useDispatch();

    // PARA USO CON BACK
    useEffect(() => {
        (dispatch(getCategories()));
    }, []);
    const categories = useSelector(state => state.categories)

    // PARA USO LOCAL SIN BACK
    /* const categories = [
        {
            "categoryId": 1,
            "name": "Hardware",
            "isMainCategory": true,
            "parentId": null
        },
        {
            "categoryId": 2,
            "name": "CPUs/Processors",
            "isMainCategory": false,
            "parentId": 1
        },
        {
            "categoryId": 3,
            "name": "Motherboards",
            "isMainCategory": false,
            "parentId": 1
        },
        {
            "categoryId": 4,
            "name": "Graphics/Video Cards",
            "isMainCategory": false,
            "parentId": 1
        },
        {
            "categoryId": 5,
            "name": "Storage",
            "isMainCategory": false,
            "parentId": 1
        },
        {
            "categoryId": 6,
            "name": "External Hard Disk Drives",
            "isMainCategory": false,
            "parentId": 5
        },
        {
            "categoryId": 7,
            "name": "Internal Hard Disk Drives",
            "isMainCategory": false,
            "parentId": 5
        },
        {
            "categoryId": 8,
            "name": "Solid State Drives",
            "isMainCategory": false,
            "parentId": 5
        },
        {
            "categoryId": 9,
            "name": "DVD/Blu-Ray",
            "isMainCategory": false,
            "parentId": 5
        },
        {
            "categoryId": 10,
            "name": "USB Drives",
            "isMainCategory": false,
            "parentId": 5
        },
        {
            "categoryId": 11,
            "name": "MicroSD",
            "isMainCategory": false,
            "parentId": 5
        },
        {
            "categoryId": 12,
            "name": "Cooling",
            "isMainCategory": false,
            "parentId": 1
        },
        {
            "categoryId": 13,
            "name": "CPU Coolers",
            "isMainCategory": false,
            "parentId": 12
        },
        {
            "categoryId": 14,
            "name": "Case Fans",
            "isMainCategory": false,
            "parentId": 12
        },
        {
            "categoryId": 15,
            "name": "Thermal Pastes",
            "isMainCategory": false,
            "parentId": 12
        },
        {
            "categoryId": 16,
            "name": "RAM Memory",
            "isMainCategory": false,
            "parentId": 1
        },
        {
            "categoryId": 17,
            "name": "DIMM (DDR3, DDR4)",
            "isMainCategory": false,
            "parentId": 16
        },
        {
            "categoryId": 18,
            "name": "SO-DIMM",
            "isMainCategory": false,
            "parentId": 16
        },
        {
            "categoryId": 19,
            "name": "Cases and Power Supplies",
            "isMainCategory": false,
            "parentId": 1
        },
        {
            "categoryId": 20,
            "name": "Cases",
            "isMainCategory": false,
            "parentId": 19
        },
        {
            "categoryId": 21,
            "name": "Power Supplies",
            "isMainCategory": false,
            "parentId": 19
        },
        {
            "categoryId": 22,
            "name": "Monitors",
            "isMainCategory": true,
            "parentId": null
        },
        {
            "categoryId": 23,
            "name": "Standard Monitors",
            "isMainCategory": false,
            "parentId": 22
        },
        {
            "categoryId": 24,
            "name": "Gaming Monitors",
            "isMainCategory": false,
            "parentId": 22
        },
        {
            "categoryId": 25,
            "name": "Peripherals and Accessories",
            "isMainCategory": true,
            "parentId": null
        },
        {
            "categoryId": 26,
            "name": "Headphones",
            "isMainCategory": false,
            "parentId": 25
        },
        {
            "categoryId": 27,
            "name": "Keyboard/Mouse Kits",
            "isMainCategory": false,
            "parentId": 25
        },
        {
            "categoryId": 28,
            "name": "Keyboards",
            "isMainCategory": false,
            "parentId": 25
        },
        {
            "categoryId": 29,
            "name": "Mouse",
            "isMainCategory": false,
            "parentId": 25
        },
        {
            "categoryId": 30,
            "name": "Mouse Pads",
            "isMainCategory": false,
            "parentId": 25
        },
        {
            "categoryId": 31,
            "name": "Microphones",
            "isMainCategory": false,
            "parentId": 25
        },
        {
            "categoryId": 32,
            "name": "Speakers",
            "isMainCategory": false,
            "parentId": 25
        },
        {
            "categoryId": 33,
            "name": "Joysticks",
            "isMainCategory": false,
            "parentId": 25
        },
        {
            "categoryId": 34,
            "name": "Webcams",
            "isMainCategory": false,
            "parentId": 25
        },
        {
            "categoryId": 35,
            "name": "Connectivity",
            "isMainCategory": false,
            "parentId": 25
        },
        {
            "categoryId": 36,
            "name": "Graphic Tablets",
            "isMainCategory": false,
            "parentId": 25
        },
        {
            "categoryId": 37,
            "name": "Gaming Chairs",
            "isMainCategory": false,
            "parentId": 25
        },
        {
            "categoryId": 38,
            "name": "Laptops/Tablets",
            "isMainCategory": true,
            "parentId": null
        },
        {
            "categoryId": 39,
            "name": "On Sale",
            "isMainCategory": true,
            "parentId": null
        }
    ] */

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [selectedSubSubcategory, setSelectedSubSubcategory] = useState('');
    const [listSubCategories, setListSubCategories] = useState([]);
    const [listSubSubCategories, setListSubSubCategories] = useState([]);

    const mainCategories = categories.filter((category) => category.isMainCategory);
    let subCategories = [];
    let subSubCategories = [];

    const [form, setForm] = useState({
        name: "",
        description: "",
        manufacturer: "",
        origin: "",
        price: 0,
        discount: 0,
        stock: 0,
        isActive: false,
        category: 150,
        image: "",
        images: []
    });

    useEffect(() => {
        subCategories = categories.filter((category) => category.parentId === form.category);
        setListSubCategories(subCategories)
    }, [selectedCategory]);

    useEffect(() => {
        subSubCategories = categories.filter((category) => category.parentId === form.category);
        setListSubSubCategories(subSubCategories)
    }, [selectedSubcategory]);

    const [error, setError] = useState({})

    /* useEffect(() => {
        setError(productValidation(form));
    }, [form]); */

    const categoryHandler = (event) => {
        const category = categories.find((category) => category.name === event.target.value);
        setSelectedCategory(category.name);
        form.category = category.categoryId;
    }

    const handleSubcategory = (event) => {
        const subcategory = categories.find((category) => category.name === event.target.value);
        setSelectedSubcategory(subcategory.name);
        form.category = subcategory.categoryId;
    };

    const handleSubSubcategory = (event) => {
        const subsubcategory = categories.find((category) => category.name === event.target.value);
        setSelectedSubSubcategory(subsubcategory.name);
        form.category = subsubcategory.categoryId;
    };

    const onChangeHandler = (e) => {
        let { name, value } = e.target;
        name === "discount" ? setDiscount(value) : null;
        value === "true" ? value = true : value === "false" ? value = false : null;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
        if (name !== "name") {
            setError(productValidation(form));
        }
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

        setError(productValidation(form));
    };

    const handleImageUpload = (event) => {
        const files = event.target.files;
        const imagesArray = Array.from(files);

        const selectedImages = imagesArray.slice(0, 3);

        const uploadedImages = [];

        selectedImages.forEach((imageFile) => {
            uploadedImages.push(imageFile);

            if (uploadedImages.length === selectedImages.length) {
                setForm((prevForm) => ({
                    ...prevForm,
                    images: [...prevForm.images, ...uploadedImages],
                }));
            }
        });

        setError(productValidation(form));
    }; const imageUrls = form.images.map((image) => {
        if (image instanceof File) {
            return URL.createObjectURL(image);
        } else {
            return image;
        }
    });

    const removeImage = (index) => {
        setForm((prevForm) => {
            const updatedImages = [...prevForm.images];
            updatedImages.splice(index, 1);

            URL.revokeObjectURL(prevForm.images[index]);

            return {
                ...prevForm,
                images: updatedImages
            };
        });

        setError(productValidation(form));
    };

    const [shouldSubmit, setShouldSubmit] = useState(false);

    const handleFormSubmit = () => {
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

    const handleSelectOption = () => {
        setIsFocused(false);
    };

    const onSubmithandler = (event) => {
        event.preventDefault();
        if (Object.keys(error).length) {
            return alert('missing info');
        }
        setError(productValidation(form));
        console.log("shouldSubmit", shouldSubmit)
        console.log("error", error)
        if (shouldSubmit && !error) {
            axios
                .post(`http://localhost:3000/admin/products`, form)
                .then((res) => {
                    console.log(res.data);
                    onClose();
                })
                .catch((error) => {
                    console.error(error.message);
                });
        }
    };

    useEffect(() => {
        console.log("form", form);
    }, [form]);

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
                                onChange={onChangeHandler}
                                name="discount"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            >
                                {Array.from({ length: 20 }, (_, index) => (index) * 5).map((value) => (
                                    <option
                                        key={value}
                                        value={value}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
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
                            {mainCategories.map((category) => (
                                <option key={category.categoryId} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {error.category ? (
                            <p className="text-red-500 text-sm">{error.category}</p>
                        ) : (
                            ""
                        )}
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
                                listSubCategories?.map((subcategory) => (
                                    <option key={subcategory.categoryId} value={subcategory.name}>
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
                                listSubSubCategories?.map((subsubcategory) => (
                                    <option key={subsubcategory.categoryId} value={subsubcategory.name}>
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
                        {error.images ? <p className="text-red-500 text-sm">{error.images}</p> : ""}
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
                    </div>

                    {/* Render the loaded images */}
                    <div className="flex items-center mb-4">
                        {imageUrls?.map((imageUrl, index) => (
                            <div key={index} className="flex items-center m-6">
                                <img src={imageUrl} alt={`Image ${index + 1}`} className="w-16 h-16 object-cover rounded mr-2" />
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
