import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/actions';

const UpdateUserForm = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    region: "",
    city: "",
    address: "",
    postalCode: "",
    birthDate: "",
    phoneNumber: "",
    idNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(user.userId, formData));
  };

  return (
       <form className="max-w-md mx-auto grid gap-4 grid-cols-2" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="firstName">
          First Name:
        </label>
        <input
          className="border border-gray-400 py-2 px-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="lastName">
          Last Name:
        </label>
        <input
          className="border border-gray-400 py-2 px-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
<div className="mb-4">
  <label className="block text-gray-700 font-bold mb-2" htmlFor="country">
    Country:
  </label>
  <input
    className="border border-gray-400 py-2 px-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    type="text"
    name="country"
    value={formData.country}
    onChange={handleChange}
  />
</div>
<div className="mb-4">
  <label className="block text-gray-700 font-bold mb-2" htmlFor="region">
    Region:
  </label>
  <input
    className="border border-gray-400 py-2 px-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    type="text"
    name="region"
    value={formData.region}
    onChange={handleChange}
  />
</div>
<div className="mb-4">
  <label className="block text-gray-700 font-bold mb-2" htmlFor="city">
    City:
  </label>
  <input
    className="border border-gray-400 py-2 px-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    type="text"
    name="city"
    value={formData.city}
    onChange={handleChange}
  />
</div>
<div className="mb-4">
  <label className="block text-gray-700 font-bold mb-2" htmlFor="address">
    Address:
  </label>
  <input
    className="border border-gray-400 py-2 px-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    type="text"
    name="address"
    value={formData.address}
    onChange={handleChange}
  />
</div>
<div className="mb-4">
  <label className="block text-gray-700 font-bold mb-2" htmlFor="postalCode">
    Postal Code:
  </label>
  <input
    className="border border-gray-400 py-2 px-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    type="text"
    name="postalCode"
    value={formData.postalCode}
    onChange={handleChange}
  />
</div>
<div className="mb-4">
  <label className="block text-gray-700 font-bold mb-2" htmlFor="birthDate">
    Birth Date:
  </label>
  <input
    className="border border-gray-400 py-2 px-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    type="text"
    name="birthDate"
    value={formData.birthDate}
    onChange={handleChange}
  />
</div>
<div className="mb-4">
  <label className="block text-gray-700 font-bold mb-2" htmlFor="phoneNumber">
    Phone Number:
  </label>
  <input
    className="border border-gray-400 py-2 px-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    type="text"
    name="phoneNumber"
    value={formData.phoneNumber}
    onChange={handleChange}
  />
</div>
<div className="mb-4">
  <label className="block text-gray-700 font-bold mb-2" htmlFor="idNumber">
    ID Number:
  </label>
  <input
    className="border border-gray-400 py-2 px-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    type="text"
    name="idNumber"
    value={formData.idNumber}
    onChange={handleChange}
  />
</div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg col-span-2"
        type="submit"
      >
        Update User
      </button>
    </form>
  );
};

export default UpdateUserForm;