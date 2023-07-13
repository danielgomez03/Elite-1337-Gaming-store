import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "@/redux/actions";
import { productValidation } from "./validations";
import Select from "react-select";
import Swal from "sweetalert2";

const CreateProduct = ({ onClose }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);
  const categories = useSelector((state) => state.categories);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedSubSubcategory, setSelectedSubSubcategory] = useState("");
  const [listSubCategories, setListSubCategories] = useState([]);
  const [listSubSubCategories, setListSubSubCategories] = useState([]);

  const mainCategories = categories.filter(
    (category) => category.isMainCategory,
  );
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
    isActive: true,
    category: 100,
    subcategory: 100,
    subsubcategory: 100,
    images: "",
    caption: "",
  });

  const [error, setError] = useState({});

  const categoryHandler = (selectedOption) => {
    setSelectedCategory(selectedOption);
    const category = categories.find(
      (item) => item.name === selectedOption.label && !item.parentId,
    );
    setForm((prevForm) => ({
      ...prevForm,
      category: category ? category.categoryId : null,
    }));
  };

  const handleSubcategory = (selectedOption) => {
    setSelectedSubcategory(selectedOption);
    const subcategory = listSubCategories.find(
      (item) => item.name === selectedOption.label,
    );
    setForm((prevForm) => ({
      ...prevForm,
      category: subcategory ? subcategory.categoryId : null,
      subcategory: subcategory ? subcategory.categoryId : null,
    }));
  };

  const handleSubSubcategory = (selectedOption) => {
    setSelectedSubSubcategory(selectedOption);
    const subsubcategory = listSubSubCategories.find(
      (item) => item.name === selectedOption.label,
    );

    setForm((prevForm) => ({
      ...prevForm,
      category: selectedOption ? subsubcategory.parentId : null,
      subcategory: selectedOption ? subsubcategory.categoryId : null,
      subsubcategory: selectedOption ? subsubcategory.categoryId : null,
    }));
  };

  const onChangeHandler = (e) => {
    let { name, value } = e.target;
    value === "true"
      ? (value = true)
      : value === "false"
      ? (value = false)
      : null;

    if (name === "stock" && value.length > 3) {
      e.preventDefault();
      return;
    }

    if (name === "price") {
      if (
        value !== "" &&
        typeof value === "string" &&
        !/^\d+([.,]?\d{0,2})?$/.test(value.replace(",", "."))
      ) {
        return;
      }
    }

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const onKeyPressHandler = (e) => {
    const { name, value } = e.target;

    if (name === "stock" && (e.key === "." || e.key === ",")) {
      e.preventDefault();
      value.replace(/[.,]/g, "");
    }
  };

  const onChangeDiscount = (selectedOption) => {
    setDiscount(selectedOption);
    setForm((prevForm) => ({
      ...prevForm,
      discount: selectedOption.value,
    }));
  };

  const optionsActive = [
    { value: true, label: "Active" },
    { value: false, label: "Inactive" },
  ];

  const onChangeActive = (selectedOption) => {
    setForm((prevForm) => ({
      ...prevForm,
      isActive: selectedOption.value,
    }));
  };

  const [imageSourceType, setImageSourceType] = useState("file"); // "file" or "url"
  const [imageFile, setImageFile] = useState(null);

  const imagesHandler = (event) => {
    event.preventDefault();
    const url = form.images.trim();
    console.log(url);
    if (url !== "" && isValidUrl(url)) {
      setForm((prevForm) => ({
        ...prevForm,
        images: url,
      }));
      setError({});
    } else {
      setError({ images: "Invalid URL" });
    }
  };

  function isValidUrl(url) {
    const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
    return urlPattern.test(url);
  }

  const handleImageUpload = async (event) => {
    const file = event.target.files[0]; // Access the uploaded file

    try {
      const formData = new FormData();
      formData.append("images", file); // Append the file to the FormData object

      const response = await axios.post(
        "http://localhost:3001/images/products/uploads",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.status === 200) {
        const { imageUrl } = response.data;
        setForm((prevForm) => ({
          ...prevForm,
          images: imageUrl, // Update the images field with the imageUrl
        }));
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const [discount, setDiscount] = useState("");

  const swalConfig = {
    customClass: {
      container: "bg-gray-800 text-white",
      contentContainer: "border-2 border-gray-600 rounded-md",
      title: "text-xl font-bold",
      text: "text-lg",
      confirmButton: "bg-indigo-500 hover:bg-indigo-600",
    },
  };

  const onSubmithandler = (event) => {
    event.preventDefault();
    if (Object.keys(error).length) {
      Swal.fire({
        ...swalConfig,
        title: "Error",
        text: `Error creating product: ${error.message}`,
        icon: "error",
      });
    }
    setError(productValidation(form));
    if (error !== null) {
      axios
        .post(`http://localhost:3001/products/create`, form)
        .then((res) => {
          console.log("resCreateProduct", res.data);
          Swal.fire({
            ...swalConfig,
            title: "Success",
            text: "Product created successfully!",
            icon: "success",
          });
          onClose();
        })
        .catch((error) => {
          Swal.fire({
            ...swalConfig,
            title: "Error",
            text: `Error creating product: ${error.response.data.message}`,
            icon: "error",
          });
          console.error(error.message);
        });
    }
  };

  const [isChecked, setIsChecked] = useState("file");

  const handleCheckboxChange = (e) => {
    setImageSourceType(e.target.name);
  };

  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);

  const fetchCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const countries = response.data;
      const formattedOptions = countries.map((country) => ({
        value: country.name.common,
        label: (
          <div>
            {country.flag} {country.name.common}
          </div>
        ),
      }));
      formattedOptions.sort((a, b) => a.value.localeCompare(b.value));
      setOptions(formattedOptions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleInputChange = (newInputValue) => {
    setInputValue(newInputValue);
    filterOptions(newInputValue);
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setForm((prevForm) => ({
      ...prevForm,
      origin: selectedOption ? selectedOption.value : "",
    }));
  };

  const filterOptions = (inputValue) => {
    return options.filter((option) =>
      option.label.props.children[1]
        .toLowerCase()
        .includes(inputValue.toLowerCase()),
    );
  };

  useEffect(() => {
    subCategories = categories.filter(
      (category) => category.parentId === form.category,
    );
    setListSubCategories(subCategories);
  }, [selectedCategory]);

  useEffect(() => {
    subSubCategories = categories.filter(
      (category) => category.parentId === form.subcategory,
    );
    setListSubSubCategories(subSubCategories);
  }, [selectedSubcategory]);

  useEffect(() => {
    console.log("form", form);
  }, [form]);

  useEffect(() => {
    console.log("error", error);
  }, [error]);

  const optionsDiscount = Array.from({ length: 20 }, (_, index) => ({
    value: index * 5,
    label: `${index * 5}`,
  }));

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "1px solid #CBD2E1", // border-gray-300
      borderRadius: "0.5rem", // rounded-lg
      outline: "none", // focus:outline-none
      "&:focus": {
        borderColor: "#6366F1", // focus:border-indigo-500
        boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.3)",
      },
      "&:hover": {
        borderColor: "#A5B4FC",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      padding: "0.75rem", // px-4 py-2
      cursor: "pointer",
      color: "#000000",
      backgroundColor: state.isFocused ? "#F3F4F6" : "transparent", // hover:bg-gray-200
    }),
    menu: (provided, state) => ({
      ...provided,
      marginTop: 0,
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Box shadow for the dropdown menu
    }),
    menuList: (provided, state) => ({
      ...provided,
      padding: 0,
      "&::-webkit-scrollbar": {
        width: "5px", // Ancho de la barra de desplazamiento
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#A5B4FC",
        borderRadius: "5px",
      },
    }),
    /* indicatorSeparator: () => ({
            display: 'none', // Remove the indicator separator
        }), */
  };

  return (
    <form
      action="/products"
      method="POST"
      encType="multipart/form-data"
      onSubmit={onSubmithandler}
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-5 z-50"
    >
      <div className="relative w-10/10 max-w-2xl bg-white rounded-lg flex flex-col justify-start items-center p-8">
        <button
          className="absolute top-2 right-4 px-3 mt-2 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 mb-3 font-bold"
          onClick={onClose}
        >
          X
        </button>
        {/* <h2 className='text-lg'>Create Product</h2> */}
        <div className="w-full flex flex-row flex-wrap justify-between">
          <div className="mb-4 w-3/4 pr-2 relative">
            <label htmlFor="name" className="block mb-2 font-bold">
              Product Name
              <span className="font-bold text-red-500"> * </span>
            </label>
            <input
              id="name"
              type="text"
              autoFocus
              value={form.name}
              onChange={onChangeHandler}
              name="name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
            {error.name ? (
              <p className="absolute text-red-500 text-xs">{error.name}</p>
            ) : (
              ""
            )}
          </div>

          <div className="mb-2 w-1/4 pl-1 relative">
            <label htmlFor="isActive" className="block mb-2 font-bold">
              Active
            </label>
            <Select
              value={optionsActive.find(
                (option) => option.value === form.isActive,
              )}
              onChange={onChangeActive}
              options={optionsActive}
              classNamePrefix="custom-select"
              styles={customStyles}
            />
            {error.isActive && (
              <p className="absolute text-red-500 text-xs">{error.isActive}</p>
            )}
          </div>

          <div className="mb-2 w-1/2 pr-1 relative">
            <label htmlFor="price" className="block mb-2 font-bold">
              Price
            </label>
            <input
              id="price"
              type="number"
              value={form.price !== 0 ? form.price : ""}
              placeholder="0"
              onChange={onChangeHandler}
              name="price"
              min={0}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
            {error.price ? (
              <p className="absolute text-red-500 text-xs">{error.price}</p>
            ) : (
              ""
            )}
          </div>

          <div className="mb-2 w-1/4 px-2 relative">
            <label
              htmlFor="discount"
              className="block mb-2 h-5 overflow-hidden"
            >
              <span className="block mb-2 font-bold whitespace-nowrap">
                Discount (%)
              </span>
            </label>
            <div>
              <Select
                id="discount"
                value={options.find((option) => option.value === discount)}
                onChange={onChangeDiscount}
                options={optionsDiscount}
                classNamePrefix="custom-select" // Nombre de la clase personalizada
                styles={customStyles}
              />
            </div>
            {error.discount ? (
              <p className="absolute text-red-500 text-xs">{error.discount}</p>
            ) : (
              ""
            )}
          </div>

          <div className="mb-2 w-1/4 pl-1 relative">
            <label htmlFor="stock" className="block mb-2 font-bold">
              Stock
            </label>
            <input
              id="stock"
              type="number"
              placeholder="0"
              value={form.stock !== 0 ? form.stock : ""}
              onKeyPress={onKeyPressHandler}
              onChange={onChangeHandler}
              name="stock"
              min={0}
              max={999}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
            {error.stock ? (
              <p className="absolute text-red-500 text-xs">{error.stock}</p>
            ) : (
              ""
            )}
          </div>

          <div className="mb-2 w-full relative">
            <label htmlFor="description" className="block mb-2 font-bold">
              Description
            </label>
            <textarea
              id="description"
              value={form.description}
              onChange={onChangeHandler}
              name="description"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 resize-y"
            />
            {error.description ? (
              <p className="absolute text-red-500 text-xs">
                {error.description}
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="mb-2 w-1/2 pr-1 relative">
            <label htmlFor="manufacturer" className="block mb-2 font-bold">
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
            {error.manufacturer ? (
              <p className="absolute text-red-500 text-xs">
                {error.manufacturer}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="mb-2 w-1/2 pl-2 relative">
            <label htmlFor="origin" className="block mb-2 font-bold">
              Origin
            </label>
            <div>
              <Select
                classNamePrefix="custom-select"
                styles={customStyles}
                options={options}
                inputValue={inputValue}
                onInputChange={handleInputChange}
                onChange={handleSelectChange}
                value={selectedOption}
                isClearable
              />
            </div>
            {error.origin ? (
              <p className="absolute text-red-500 text-xs">{error.origin}</p>
            ) : (
              ""
            )}
          </div>

          <div className="mb-2 w-1/3 pr-1 relative">
            <label htmlFor="category" className="block mb-2 font-bold">
              Category
              <span className="font-bold text-red-500"> * </span>
            </label>
            <Select
              classNamePrefix="custom-select"
              required
              styles={customStyles}
              value={selectedCategory}
              onChange={categoryHandler}
              options={mainCategories?.map((category) => ({
                value: category.name,
                label: category.name,
              }))}
            />
            {error.category ? (
              <p className="absolute text-red-500 text-xs">{error.category}</p>
            ) : (
              ""
            )}
          </div>

          <div className="mb-2 w-1/3 px-2 relative">
            <label htmlFor="subcategory" className="block mb-2 font-bold">
              Subcategory
            </label>
            <Select
              classNamePrefix="custom-select"
              required
              styles={customStyles}
              value={selectedSubcategory}
              disabled={!selectedCategory}
              onChange={handleSubcategory}
              options={
                selectedCategory && listSubCategories
                  ? listSubCategories.map((subcategory) => ({
                      value: subcategory.name,
                      label: subcategory.name,
                    }))
                  : []
              }
            />
          </div>

          <div className="mb-2 w-1/3 pl-1 relative">
            <label
              htmlFor="subSubCategory"
              className="flex mb-2 h-5 overflow-hidden"
            >
              <span className="whitespace-nowrap block mb-2 font-bold">
                Sub-Subcategory
              </span>
            </label>
            <Select
              classNamePrefix="custom-select"
              styles={customStyles}
              value={selectedSubSubcategory}
              disabled={!selectedSubcategory}
              onChange={handleSubSubcategory}
              options={
                selectedCategory && selectedSubcategory && listSubSubCategories
                  ? listSubSubCategories.map((subsubcategory) => ({
                      value: subsubcategory.name,
                      label: subsubcategory.name,
                    }))
                  : []
              }
            />
          </div>

          <div className="mb-2 w-full">
            <label htmlFor="images" className="flex items-center">
              <span className="font-bold">
                Image <span className="font-bold text-red-500"> * </span>
              </span>

              <span className="ml-2">
                ({form.images ? "1 image" : "No image"} loaded)
              </span>
              {error.images && (
                <p className="ml-10 text-red-500 text-xs">{error.images}</p>
              )}
            </label>
            <div className="flex justify-center">
              <input
                type="checkbox"
                name="file"
                id="file"
                checked={imageSourceType === "file"}
                onChange={handleCheckboxChange}
                className="ml-4"
              />
              <label htmlFor="file" className="mr-16 p-4 pl-2">
                File
              </label>
              <input
                type="checkbox"
                name="url"
                id="url"
                checked={imageSourceType === "url"}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="url" className="p-4 pl-2">
                URL
              </label>
            </div>
            <div className="flex flex-col items-center">
              {imageSourceType === "url" ? (
                <div className="w-full flex">
                  <div className="w-5/6 mr-2">
                    <input
                      type="text"
                      placeholder="Enter URL"
                      value={form.images}
                      onChange={(e) =>
                        setForm((prevForm) => ({
                          ...prevForm,
                          images: e.target.value,
                        }))
                      }
                      name="images"
                      className="w-full mr-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                      disabled={form.images !== ""}
                    />
                  </div>
                  <button
                    onClick={imagesHandler}
                    disabled={form.images === ""}
                    className="w-1/6 ml-2 py-2 border border-indigo-500 text-indigo-500 font-bold rounded-md hover:bg-600"
                  >
                    Add
                  </button>
                </div>
              ) : (
                <div>
                  <label className="inline-flex items-center px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 cursor-pointer">
                    <span className="material-symbols-rounded mr-4">
                      perm_media
                    </span>
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={form.images !== ""}
                    />
                  </label>
                </div>
              )}

              {/* Render the loaded image */}
              {form.images && (
                <div className="flex items-center m-4 gap-10">
                  <div className="relative flex items-center">
                    <img
                      src={form.images}
                      alt="Image"
                      className="w-16 h-16 object-cover rounded"
                    />
                    <button
                      onClick={() =>
                        setForm((prevForm) => ({ ...prevForm, images: "" }))
                      }
                      className="absolute w-full h-full rounded text-transparent hover:bg-black hover:bg-opacity-50 hover:text-white"
                    >
                      <span className="material-symbols-rounded font-thin text-x-2">
                        Delete
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row flex-wrap justify-between mb-2 w-1/2 pr-1 relative">
          <label htmlFor="caption" className="block mb-2 font-bold">
            Image Caption
          </label>
          <input
            id="caption"
            type="text"
            value={form.caption}
            onChange={onChangeHandler}
            name="caption"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          />
          {error.caption ? (
            <p className="absolute text-red-500 text-xs">{error.caption}</p>
          ) : (
            ""
          )}
        </div>
        <div className="w-full">
          <button
            type="submit"
            disabled={Object.keys(error).length > 0}
            className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 font-bold tracking-wider"
          >
            Create Product
          </button>
          <button
            className="lg:hidden w-full px-4 mt-4 py-2 bg-gray-200 rounded-md font-bold tracking-wider"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateProduct;
