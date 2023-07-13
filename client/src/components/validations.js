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
  } else if (name.length > 100) {
    errors.name = ["Name can't be longer than 100 characters"];
  }

  // DESCRIPTION
  if (description && description.length > 1000) {
    errors.description = ["Description can't be longer than 1000 characters"];
  }

  // MANUFACTURER
  if (manufacturer && manufacturer.length > 50) {
    errors.manufacturer = ["Manufacturer can't be longer than 50 characters"];
  }

  // ORIGIN
  if (origin && origin.length > 50) {
    errors.origin = ["Origin can't be longer than 50 characters"];
  }

  // PRICE
  if (price && (!/^(\d{1,10}(\.\d{1,2})?)?$/.test(price) || price < 0)) {
    errors.price = [
      "Price must be a non-negative number with up to 10 digits and up to 2 decimal places",
    ];
  }

  // DISCOUNT
  if (
    discount &&
    (!/^(\d{1,2}(\.\d{1,2})?)?$/.test(discount) ||
      discount < 0 ||
      discount > 100)
  ) {
    errors.discount = [
      "Discount must be a number between 0 and 100 with up to 1 decimal places",
    ];
  }

  // STOCK
  if (stock && (!Number.isInteger(Number(stock)) || Number(stock) < 0)) {
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
  if (!category || isNaN(Number(category))) {
    errors.category = ["Please provide a valid category"];
  }

  return errors;
};

// USER CREATION VALIDATIONS
const userValidation = async ({
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
  } else if (firstName.length > 50) {
    errors.firstName = ["First name can't be longer than 50 characters"];
  } else if (/\d/.test(firstName)) {
    errors.firstName = ["First name should not contain numbers"];
  }

  // LAST NAME
  if (!lastName) {
    errors.lastName = ["Last name is required"];
  } else if (lastName.length > 50) {
    errors.lastName = ["Last name can't be longer than 50 characters"];
  } else if (/\d/.test(lastName)) {
    errors.lastName = ["Last name should not contain numbers"];
  }

  // COUNTRY
  if (!country) {
    errors.country = ["Country is required"];
  } else if (country.length > 50) {
    errors.country = ["Country name can't be longer than 50 characters"];
  } else if (/\d/.test(country)) {
    errors.country = ["Country name should not contain numbers"];
  }

  // REGION
  if (region && region.length > 50) {
    errors.region = ["Region name can't be longer than 50 characters"];
  } else if (/\d/.test(region)) {
    errors.region = ["Region name should not contain numbers"];
  }

  // CITY
  if (city && city.length > 50) {
    errors.city = ["City name can't be longer than 50 characters"];
  } else if (/\d/.test(city)) {
    errors.city = ["City name should not contain numbers"];
  }

  // ADDRESS
  if (address && address.length > 100) {
    errors.address = ["Address can't be longer than 100 characters"];
  }

  // POSTAL CODE
  if (postalCode && postalCode.length > 50) {
    errors.postalCode = ["Postal code can't be longer than 50 characters"];
  }

  // BIRTH DATE
  if (birthDate) {
    const currentDate = new Date();
    const selectedDate = new Date(birthDate);
    const minValidYear = 1900;

    if (selectedDate > currentDate) {
      errors.birthDate = ["Birth date can't be in the future"];
    } else if (selectedDate.getFullYear() < minValidYear) {
      errors.birthDate = [
        `Birth date year should be greater than ${minValidYear}`,
      ];
    }
  }

  // PHONE NUMBER
  if (phoneNumber && phoneNumber.length > 50) {
    errors.phoneNumber = ["Phone number can't be longer than 50 characters"];
  }

  // ID NUMBER
  if (idNumber && idNumber.length > 50) {
    errors.idNumber = ["ID number can't be longer than 50 characters"];
  }

  // EMAIL
  if (!email) {
    errors.email = ["Email is required"];
  } else if (email.length > 50) {
    errors.email = ["Email can't be longer than 50 characters"];
  } else if (!isValidEmail(email)) {
    errors.email = ["Invalid email format"];
  }

  // PASSWORD
  if (!password) {
    errors.password = ["Password is required"];
  } else if (password.length < 6) {
    errors.password = ["Password must be at least 6 characters long"];
  } else if (password.length > 25) {
    errors.password = ["Password can't be longer than 25 characters"];
  }

  // IMAGE
  if (
    image &&
    typeof image !== "string" &&
    (!image.url ||
      typeof image.url !== "string" ||
      !/^https?:\/\/.*\.(jpeg|jpg|gif|png|bmp)$/.test(image.url))
  ) {
    errors.image = ["Invalid image format"];
  }

  return errors;
};

// MAIL VALIDATION -> FOR USER UPDATE, NEWSLETTER
const mailValidation = ({ email }) => {
  const errors = {};

  // EMAIL
  if (!email) {
    errors.email = ["Email is required"];
  } else if (email.length > 50) {
    errors.email = ["Email can't be longer than 50 characters"];
  } else if (!isValidEmail(email)) {
    errors.email = ["Invalid email format"];
  }

  return errors;
};

module.exports = { productValidation, userValidation, mailValidation };
