// Email validation pattern
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// PRODUCT CREATION VALIDATIONS

const productValidation = ({
    name,
    description,
    manufacturer,
    origin,
    price,
    discount,
    stock,
    isActive,
    category,
    images,
  }) => {
    const errors = {};
  
    // NAME
    if (!name) {
      errors.name = ["A name is required"];
    } else if (name.length > 255) {
      errors.name = ["Name can't be longer than 255 characters"];
    }
  
    // DESCRIPTION
    if (description && description.length > 2000) {
      errors.description = ["Description can't be longer than 2000 characters"];
    }
  
    // MANUFACTURER
    if (manufacturer && manufacturer.length > 100) {
      errors.manufacturer = ["Manufacturer can't be longer than 100 characters"];
    }
  
    // ORIGIN
    if (origin && origin.length > 100) {
      errors.origin = ["Origin can't be longer than 100 characters"];
    }
  
    // PRICE
    if (price && (!/^(\d{1,10}(\.\d{1,2})?)?$/.test(price) || price < 0)) {
      errors.price = ["Price must be a non-negative number with up to 10 digits and up to 2 decimal places"];
    }
  
    // DISCOUNT
    if (discount && (!/^(\d{1,2}(\.\d{1,2})?)?$/.test(discount) || discount < 0 || discount > 100)) {
      errors.discount = ["Discount must be a number between 0 and 100 with up to 1 decimal places"];
    }
  
    // STOCK
    if (stock && (!Number.isInteger(stock) || stock < 0)) {
      errors.stock = ["Stock must be a non-negative integer"];
    }
  
    // IS ACTIVE
    if (
      isActive === undefined ||
      (typeof isActive !== "boolean" &&
        !(Array.isArray(isActive) && isActive.includes(true)))
    ) {
      errors.isActive = ["Please select at least one option for isActive"];
    }
  
    // CATEGORY
    if (!category || !Array.isArray(category) || category.length === 0) {
    errors.category = ["Please select at least one category"];
    }
  
    // IMAGES
    if (images && !Array.isArray(images)) {
      errors.images = ["Images must be provided as an array"];
    } else if (images) {
      for (const image of images) {
        if (
          (!image.url || typeof image.url !== "string" || !/^https?:\/\/.*\.(jpeg|jpg|gif|png|bmp)$/.test(image.url)) &&
          (!image.uploaded || typeof image.uploaded !== "boolean")
        ) {
          errors.images = ["Invalid image format"];
          break;
        }
      }
    }
  
    return errors;
};

// USER CREATION VALIDATIONS

const userValidation = ({
    firstName,
    lastName,
    country,
    region,
    city,
    address,
    postalCode,
    birthDate,
    phoneNumber,
    idNumber,
    email,
    password,
    image,
  }) => {
    const errors = {};
  
    // FIRST NAME
    if (!firstName) {
      errors.firstName = ["First name is required"];
    } else if (firstName.length > 100) {
      errors.firstName = ["First name can't be longer than 100 characters"];
    } else if (/\d/.test(firstName)) {
      errors.firstName = ["First name should not contain numbers"];
    }
  
    // LAST NAME
    if (!lastName) {
      errors.lastName = ["Last name is required"];
    } else if (lastName.length > 100) {
      errors.lastName = ["Last name can't be longer than 100 characters"];
    } else if (/\d/.test(lastName)) {
      errors.lastName = ["Last name should not contain numbers"];
    }
  
    // COUNTRY
    if (!country) {
      errors.country = ["Country is required"];
    } else if (country.length > 100) {
      errors.country = ["Country name can't be longer than 100 characters"];
    } else if (/\d/.test(country)) {
      errors.country = ["Country name should not contain numbers"];
    }
  
    // REGION
    if (region && region.length > 100) {
      errors.region = ["Region name can't be longer than 100 characters"];
    } else if (/\d/.test(region)) {
      errors.region = ["Region name should not contain numbers"];
    }
  
    // CITY
    if (city && city.length > 100) {
      errors.city = ["City name can't be longer than 100 characters"];
    } else if (/\d/.test(city)) {
      errors.city = ["City name should not contain numbers"];
    }
  
    // ADDRESS
    if (address && address.length > 100) {
      errors.address = ["Address can't be longer than 100 characters"];
    }
  
    // POSTAL CODE
    if (postalCode && postalCode.length > 100) {
      errors.postalCode = ["Postal code can't be longer than 100 characters"];
    }
  
    // BIRTH DATE
    if (birthDate) {
      const currentDate = new Date();
      const selectedDate = new Date(birthDate);
      const minValidYear = 1900;
  
      if (selectedDate > currentDate) {
        errors.birthDate = ["Birth date can't be in the future"];
      } else if (selectedDate.getFullYear() < minValidYear) {
        errors.birthDate = [`Birth date year should be greater than ${minValidYear}`];
      }
    }
  
    // PHONE NUMBER
    if (phoneNumber && phoneNumber.length > 100) {
      errors.phoneNumber = ["Phone number can't be longer than 100 characters"];
    }
  
    // ID NUMBER
    if (idNumber && idNumber.length > 100) {
      errors.idNumber = ["ID number can't be longer than 100 characters"];
    }
  
    // EMAIL
    if (!email) {
      errors.email = ["Email is required"];
    } else if (email.length > 100) {
      errors.email = ["Email can't be longer than 100 characters"];
    } else if (!isValidEmail(email)) {
      errors.email = ["Invalid email format"];
    }
  
    // PASSWORD
    if (!password) {
      errors.password = ["Password is required"];
    } else if (password.length < 8) {
      errors.password = ["Password must be at least 8 characters long"];
    } else if (password.length > 100) {
      errors.password = ["Password can't be longer than 100 characters"];
    }
  
    // IMAGE
    if (image) {
        if (!image.url || typeof image.url !== "string" || !/^https?:\/\/.*\.(jpeg|jpg|gif|png|bmp)$/.test(image.url)) {
        errors.image = ["Invalid image format"];
        }
    }

    return errors;
};  

export default { productValidation, userValidation };

// // EJEMPLO DE IMPLEMENTACIÓN FRONT

// // EL OBJETO DE ERRORES GENERADO LUCIRÍA ASÍ:
//     const errors = {
//         name: ["Name can't be longer than 255 characters"],
//         category: ["Please select at least one category"],
//     };

// // ASÍ LUCIRÍA LA IMPORTACIÓN Y SU IMPLEMENTACIÓN

// import React, { useState } from 'react';
// import productValidations from './validations'

// const ProductForm = () => {
//   const [form, setForm] = useState({
//     // Initial form state
//   });
//   const [error, setError] = useState({});

//   const handleFormSubmit = (event) => {
//     event.preventDefault();

//     // Perform form validations
//     const validationErrors = productValidations(form);

//     // Update the error state
//     setError(validationErrors);

//     // Continue with form submission or handle errors
//   };

//   // Rest of your component code

//   //RENDERIZADO EN HTML DE NAME Y SU SPAN DE ERROR, POR EJEMPLO. 
//   //MOSTRARA PRIMER ERROR. SI LO SOLUCIONA Y HAY OTRO, MOSTRARÁ ESE. NO MOSTRARÁ NADA SI NO HAY ERRORES.

// <input
//     type="text"
//     placeholder="Name"
//     value={form.name}
//     name="name"
//     onChange={(event) => handleChange(event)}
//     required
// />
// {error.name && error.name[0] && (
//   <span className={styles.formError}>
//     *{error.name[0]}
//   </span>
// )}

// // PARA REFERENCIA: UN USUARIO CREADO SE GUARDARÁ ASÍ:
// [
// 	{
// 		"userId": "2e1aaa03-d795-4e7f-a4fd-bb0bcb611e22",
// 		"firstName": "Jahn",
// 		"lastName": "Doe",
// 		"country": "United States",
// 		"region": "California",
// 		"city": "Los Angeles",
// 		"address": "123 Main St",
// 		"postalCode": "12345",
// 		"birthDate": "1990-01-01",
// 		"phoneNumber": "1234567890",
// 		"idNumber": "123456789",
// 		"userRole": "common",
// 		"isActive": true,
// 		"image": {
// 			"imageId": "450d7098-b295-4a00-ad5b-60fb6a568349",
// 			"url": "https://example.com/profile.jpg"
// 		},
// 		"login": {
// 			"loginId": "d2d6becc-81c8-4208-a6f4-cd0f43973de5",
// 			"email": "jahndae@example.com",
// 			"password": "$2b$10$HTDSTDl.ErjHR383H.XIt.uXjN3g/SHyJOpPdfqo12DoEZtA8AWgG",
// 			"verify": false
// 		}
// 	}
// ]