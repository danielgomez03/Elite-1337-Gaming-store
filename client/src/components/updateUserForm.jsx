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
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
      </label>
      <label>
        Last Name:
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
      </label>
      <label>
        Country:
        <input type="text" name="country" value={formData.country} onChange={handleChange} />
      </label>
      <label>
        Region:
        <input type="text" name="region" value={formData.region} onChange={handleChange} />
      </label>
      <label>
        City:
        <input type="text" name="city" value={formData.city} onChange={handleChange} />
      </label>
      <label>
        Address:
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
      </label>
      <label>
        Postal Code:
        <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} />
      </label>
      <label>
        Birth Date:
        <input type="text" name="birthDate" value={formData.birthDate} onChange={handleChange} />
      </label>
      <label>
        Phone Number:
        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
      </label>
      <label>
        ID Number:
        <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} />
      </label>
      <button type="submit">Update User</button>
    </form>
  );
};

export default UpdateUserForm;