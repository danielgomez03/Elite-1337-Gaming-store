import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { userValidation } from './validations.js'
import Link from 'next/link';
import { postLogin, changeUser } from '@/redux/actions.js';
import { signIn, useSession } from 'next-auth/react'
import Swal from "sweetalert2";
import Select from "react-select";

function SignInRegister({ selectedButton, onClose }) {
  const dispatch = useDispatch();
  const typeUser = useSelector(state => state.typeUser);
  const tokenRedux = useSelector(state => state.token);
  const userId = useSelector(state => state.userId);
  const session = useSelector(state => state.session);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState({})
  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    country: '',
    region: '',
    city: '',
    address: '',
    postalCode: '',
    birthDate: '',
    phoneNumber: '',
    idNumber: '',
    email: '',
    password: '',
    image: "",
  });

  const changeHandler = (e) => {
    e.preventDefault();
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
    setError(
      userValidation({
        ...input,
        [e.target.name]: e.target.value,
      }),
    );
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const [isChecked, setIsChecked] = useState(false);
  const [imageIsChecked, setImageIsChecked] = useState(false);

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
    setInput((prevInput) => ({
      ...prevInput,
      country: selectedOption ? selectedOption.value : "",
    }));
  };

  const filterOptions = (inputValue) => {
    return options.filter((option) =>
      option.label.props.children[1]
        .toLowerCase()
        .includes(inputValue.toLowerCase()),
    );
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const [imageUrlInput, setImageUrlInput] = useState("");

  const handleAddImage = (event) => {
    event.preventDefault();
    const url = imageUrlInput.trim();

    if (url !== "" && isValidUrl(url)) {
      setInput((prevInput) => ({
        ...prevInput,
        image: url,
      }));
      setError((prevError) => ({
        ...prevError,
        image: "",
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        image: "Invalid URL",
      }));
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
      formData.append("image", file); // Append the file to the FormData object

      const response = await axios.post(
        "http://localhost:3001/images/users/uploads",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.status === 200) {
        const { imageUrl } = response.data;
        setInput((prevInput) => ({
          ...prevInput,
          image: imageUrl, // Update the image field with the imageUrl
        }));
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const swalConfig = {
    customClass: {
      container: "bg-gray-800 text-white",
      contentContainer: "border-2 border-gray-600 rounded-md",
      title: "text-xl font-bold",
      text: "text-lg",
      confirmButton: "bg-indigo-500 hover:bg-indigo-600",
    },
  };

  const submitRegister = async (e) => {
    e.preventDefault();
    console.log(input);

    // Handle image upload
    if (input.image) {
      try {
        const formData = new FormData();
        formData.append("image", input.image);

        const response = await axios.post(
          "http://localhost:3001/images/users/uploads",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        if (response.status === 200) {
          const { imageUrl } = response.data;
          setInput((prevInput) => ({
            ...prevInput,
            image: imageUrl,
          }));
        } else {
          throw new Error("Image upload failed");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    // Submit the form
    if (selectedButton === "register") {
      axios
        .post("http://localhost:3001/users/register", input)
        .then((res) => {
          Swal.fire({
            ...swalConfig,
            title: "Success",
            text: "User registered successfully!",
            icon: "success",
          });
          onClose();
        })
        .catch((error) => {
          Swal.fire({
            ...swalConfig,
            title: "Error",
            text: `Error registering user: ${error.response.data.message}`,
            icon: "error",
          });
        });
    } else if (selectedButton === "signIn") {
      axios
        .post("http://localhost:3001/login/signin", input)
        .then((res) => {
          Swal.fire({
            ...swalConfig,
            title: "Success",
            text: "User signed in successfully!",
            icon: "success",
          });
          onClose();
        })
        .catch((error) => {
          Swal.fire({
            ...swalConfig,
            title: "Error",
            text: `Error signing in: ${error.response.data.message}`,
            icon: "error",
          });
        });
    }
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    await dispatch(postLogin(tokenRedux, credentials, userId));
    typeUser !== "guest" && onClose();
  };

  useEffect(() => {
    if (session) {
      onClose();
    } else {
    }
  }, [session]);

  return (
    <form
      action="/products"
      method={selectedButton === "register" ? "POST" : "GET"}
      encType="multipart/form-data"
      onSubmit={selectedButton === "register" ? submitRegister : submitLogin}
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-5 z-50 ml-0"
    >
      <div className="w-10 relative h-auto min-w-[600px] bg-white rounded-lg flex flex-col justify-center items-center p-8">
        <button
          className="absolute top-2 right-4 px-3 mt-2 py-1"
          onClick={onClose}
        >
          x
        </button>
        <div className="w-full flex flex-row flex-wrap justify-between">
          {selectedButton === "register" ? (
            <div className="w-full flex flex-row flex-wrap justify-between">
              <p className="mb-3 w-full text-xs flex justify-center italic">
                Fields marked with
                <span className="font-bold text-red-500">
                  {" "}
                  {"\u00A0*\u00A0"}{" "}
                </span>
                are required
              </p>
              <div className="mb-4 w-1/2 pr-2">
                <label htmlFor="firstName" className="block mb-2 font-bold">
                  First Name
                  <span className="font-bold text-red-500"> * </span>
                </label>
                <input
                  id="firstName"
                  onChange={changeHandler}
                  name="firstName"
                  value={input.firstName}
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
                {error.firstName ? <p className="text-red-500 text-sm">{error.firstName}</p> : ""}
              </div>

              <div className="mb-4 w-1/2">
                <label htmlFor="lastName" className="block mb-2 font-bold">
                  Last Name <span className="font-bold text-red-500"> *</span>
                </label>
                <input
                  id='lastName'
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  onChange={changeHandler}
                  name="lastName"
                  value={input.lastName}
                  type="text" />
                {error.lastName ? <p className="text-red-500 text-sm">{error.lastName}</p> : ""}
              </div>

              <div className="mb-4 w-1/3 pr-2">
                <label htmlFor="country" className="block mb-2 font-bold">
                  Country
                </label>
                <Select
                  id="country"
                  name="country"
                  options={options}
                  inputValue={inputValue}
                  onInputChange={handleInputChange}
                  onChange={handleSelectChange}
                  value={selectedOption}
                  isClearable
                />
                {error.country ? (
                  <p className="text-red-500 text-sm">{error.country}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="mb-4 w-1/3 pr-2">
                <label htmlFor="region" className="block mb-2 font-bold">
                  Region
                </label>
                <input
                  id='region'
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  onChange={changeHandler}
                  name="region"
                  value={input.region}
                  type="text"
                />
                {error.region ? <p className="text-red-500 text-sm">{error.region}</p> : ""}
              </div>

              <div className="mb-4 w-1/3">
                <label htmlFor="city" className="block mb-2 font-bold">
                  City
                </label>
                <input
                  id='city'
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  onChange={changeHandler}
                  name="city"
                  value={input.city}
                  type="text" />
                {error.city ? <p className="text-red-500 text-sm">{error.city}</p> : ""}
              </div>

              <div className="mb-4 w-4/5 pr-2">
                <label htmlFor="adress" className="block mb-2 font-bold">
                  Address
                </label>
                <input
                  id="address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  onChange={changeHandler}
                  name="address"
                  value={input.address}
                  type="text" />
                {error.adress ? <p className="text-red-500 text-sm">{error.adress}</p> : ""}

              </div>
              <div className="mb-4 w-1/5">
                <label htmlFor="postalCode" className="block mb-2 font-bold">
                  Postal Code
                </label>
                <input
                  id='postalCode'
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  onChange={changeHandler}
                  name="postalCode"
                  value={input.postalCode}
                  type="text" />
                {error.postalCode ? <p className="text-red-500 text-sm">{error.postalCode}</p> : ""}
              </div>

              <div className="mb-4 w-1/3 pr-2">
                <label htmlFor="phoneNumber" className="block mb-2 font-bold">
                  Phone Number
                </label>
                <input
                  id='phoneNumber'
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  onChange={changeHandler}
                  name="phoneNumber"
                  value={input.phoneNumber}
                  type="text" />
                {error.phoneNumber ? <p className="text-red-500 text-sm">{error.phoneNumber}</p> : ""}
              </div>

              <div className="mb-4 w-1/3 pr-2">
                <label htmlFor="idNumber" className="block mb-2 font-bold">
                  ID Number
                </label>
                <input
                  id="idNumber"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  onChange={changeHandler}
                  name="idNumber"
                  value={input.idNumber}
                  type="text"
                />
                {error.idNumber ? (
                  <p className="text-red-500 text-sm">{error.idNumber}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="mb-4 w-1/3">
                <label htmlFor="birthDate" className="block mb-2 font-bold">
                  Birth Date
                </label>
                <input
                  id='birthDate'
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  onChange={changeHandler}
                  name="birthDate"
                  value={input.birthDate}
                  type="date" />
                {error.birthDate ? <p className="text-red-500 text-sm">{error.birthDate}</p> : ""}
              </div>

            </div>
          ) : null}

          <div className="mb-4 w-full">
            <label htmlFor="email" className="block mb-2 font-bold">
              E-mail
              <span className="font-bold text-red-500"> * </span>
            </label>
            <input
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              onChange={changeHandler}
              name="email"
              value={input.email}
              type="text"
            />
            {error.email ? (
              <p className="text-red-500 text-sm">{error.email}</p>
            ) : (
              ""
            )}
          </div>

          <div className={`mb-4 ${selectedButton === "register" ? "w-1/2" : "w-full" } pr-2`} >
            <label htmlFor="password" className="block mb-2 font-bold">
              Password
              <span className="font-bold text-red-500"> * </span>
            </label>
            <input
              id='password'
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              onChange={changeHandler}
              name="password"
              value={input.password}
              type="password"
            />
            {selectedButton === "signIn" ? (
              <button className="absolute right-12 mt-10  text-xs">
                Reset Password
              </button>
            ) : (
              ""
            )}
            {error.password ? (
              <p className="text-red-500 text-sm">{error.password}</p>
            ) : (
              ""
            )}
          </div>

          {selectedButton === "register" ? (
            <div className="mb-4 w-1/2">
              <label htmlFor="repeatPassword" className="block mb-2 font-bold">
                Repeat Password
                <span className="font-bold text-red-500"> * </span>
              </label>
              <input
                id="repeatPassword"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                onChange={changeHandler}
                name="repeatPassword"
                value={input.repeatPassword}
                type="password"
              />
              {error.repeatPassword ? (
                <p className="text-red-500 text-sm">{error.repeatPassword}</p>
              ) : (
                ""
              )}
            </div>
          ) : null}

        </div>

        {selectedButton === "register" && (
          <div className="mb-2 w-full">
            <label htmlFor="image" className="flex items-center">
              <span className="font-bold">Profile Image:</span>
              <span className="ml-2">
                ({input.image ? "1 image" : "No image"} loaded)
              </span>
              {error.image && (
                <p className="ml-10 text-red-500 text-xs">{error.image}</p>
              )}
            </label>
            <div className="flex justify-center">
              <input
                type="checkbox"
                name="file"
                id="file"
                checked={imageIsChecked === "file"}
                onChange={() => setImageIsChecked("file")}
                className="ml-4"
              />
              <label htmlFor="file" className="mr-16 p-4 pl-2">
                File
              </label>
              <input
                type="checkbox"
                name="url"
                id="url"
                checked={imageIsChecked === "url"}
                onChange={() => setImageIsChecked("url")}
              />
              <label htmlFor="url" className="p-4 pl-2">
                URL
              </label>
            </div>
            <div className="flex flex-col items-center">
              {imageIsChecked === "url" ? (
                <div className="w-full flex">
                  <div className="w-5/6 mr-2">
                    <input
                      type="text"
                      placeholder="Enter URL"
                      value={imageUrlInput}
                      onChange={(event) => setImageUrlInput(event.target.value)}
                      name="image"
                      className="w-full mr-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                      disabled={input.image !== "" || imageIsChecked !== "url"}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={imageUrlInput === ""}
                    className="w-1/6 ml-2 py-2 border border-indigo-500 text-indigo-500 font-bold rounded-md hover:bg-indigo-600"
                    onClick={handleAddImage}
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
                      disabled={input.image !== ""}
                    />
                  </label>
                </div>
              )}

              {/* Render the loaded image */}
              {input.image && (
                <div className="flex items-center m-4 gap-10">
                  <div className="relative flex items-center">
                    <img
                      src={input.image}
                      alt="Image"
                      className="w-16 h-16 object-cover rounded"
                      style={{ width: "64px", height: "64px" }}
                    />
                    <button
                      onClick={() =>
                        setInput((prevInput) => ({ ...prevInput, image: "" }))
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
        )}

        {selectedButton === "register" ? (
          <div>
            <p className="mt-1 mb-2">
              Review the{" "}
              <Link href="guest/TermsConditions" className="font-bold">
                Terms & Conditions
              </Link>{" "}
              of our services.
            </p>
            <div className='flex justify-center' >
              <input
                type="checkbox"
                name="ok"
                id="ok"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="ok" className="ml-3 italic">
                I accept the Terms & Conditions.
              </label>
            </div>
          </div>
        ) : null}
        <button
          className="w-full px-4 mt-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
          type='submit'
          disabled={selectedButton === "register" && error !== null && !isChecked}>
          {selectedButton === "register" ? "Register" : "Sign In"}
        </button>
        <button
          className="w-full px-4 mt-4 py-2 border rounded-md"
          onClick={() => signIn()}>Sign In with Google</button>


        <div className='w-full flex flex-col justify-center items-center mt-2'>
          <p>Don't have an account yet?</p>
          <button
            className="w-1/6 px-1 mt-2 py-1 bg-indigo-500 text-white font-sm rounded-md hover:bg-indigo-600" >
            {selectedButton === "register" ? "Sign In" : "Register"}
          </button>
        </div>
      </div>
    </form >
  )
}

export default SignInRegister
