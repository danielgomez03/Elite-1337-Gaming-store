import { fetchUsers, modifyIsActiveUser } from "@/redux/actions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function UserAccounts() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [name, setName] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleClick = (userId, isActive) => {
    dispatch(modifyIsActiveUser(userId, isActive)).then(() => {
      dispatch(fetchUsers());
    });
  };

  const handleFilterChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const typeAdmin = (e) => {
    e.preventDefault();
    if (e.target.value === "common")
      return setFilteredUsers(
        users.filter((user) => user.userRole === "common"),
      );
    return setFilteredUsers(users.filter((user) => user.userRole === "super"));
  };

  const handleSubmit = () => {
    setFilteredUsers(
      users.filter((user) =>
        user.firstName.toLowerCase().includes(name.toLowerCase()),
      ),
    );
  };

  return (
    <div className="w-4/6 bg-white container mx-auto py-10 px-16">
      <div className="search-filter-container flex items-center justify-center mb-4">
        <button className="button bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md mr-2" onClick={() => setFilteredUsers(users)}>
          Reset
        </button>
        <input
          type="text"
          placeholder="Search User"
          value={name}
          onChange={handleFilterChange}
          className="w-1/3 input-field px-3 py-2 rounded-md mr-2 shadow-md"
        />
        <button
          type='submit'
          onClick={() => {
            handleSubmit();
            setName("");
          }}
          className='absolute ml-56'>
          <span className="material-symbols-rounded pt-1">
            search
          </span>
        </button>
        <select className="button bg-white text-gray-800 px-4 py-2 rounded-md shadow-md" onChange={typeAdmin} name="" id="">
          <option value="">TypeUser:</option>
          <option value="common">User</option>
          <option value="super">Admin</option>
        </select>
      </div>
      <div className="user-list">
        <div className="grid grid-cols-4 items-center justify-center font-bold p-4">
          <span className="column">Image</span>
          <span className="column">Name</span>
          <span className="column">Email</span>
          <span className="column">Status</span>
        </div>

        {users.map((user) => (
          <div
            key={user.userId}
            className="user-item grid grid-cols-4 items-center justify-center bg-white border-b p-4"
          >
            <img
              src={user.image.url}
              alt="User Image"
              className="user-avatar column"
            />
            <span className="user-name column">{`${user.firstName} ${user.lastName}`}</span>
            <span className="user-email column">{user.login.email}</span>
            <button
              className={`user-status w-1/2 column text-white px-4 py-2 rounded-md ${user.isActive ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                }`}
              onClick={() => handleClick(user.userId, user.isActive)}
            >
              {user.isActive ? "Active" : "Disable"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserAccounts;
