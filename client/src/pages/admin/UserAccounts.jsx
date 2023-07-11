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
    <div className="user-accounts-container">
      <div className="search-filter-container">
        <button className="button" onClick={() => setFilteredUsers(users)}>
          Reset
        </button>
        <input
          type="text"
          placeholder="Search User"
          value={name}
          onChange={handleFilterChange}
        />
        <button
          className="button"
          type="submit"
          onClick={() => {
            handleSubmit();
            setName("");
          }}
        >
          Search
        </button>
        <select className="button" onChange={typeAdmin} name="" id="">
          <option value="" selected="selected">
            TypeUser:
          </option>
          <option value="common">TypeUser: User</option>
          <option value="super">TypeUser: Admin</option>
        </select>
      </div>
      <div className="user-list">
        <style>
          {`
          .user-accounts-container {
            margin: 2rem auto;
            max-width: 800px;
          }
          
          .search-filter-container {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1rem;
          }

          .search-filter-container .button {
            margin-right: 1rem;
          }
          
          .table-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.5rem;
            border-bottom: 1px solid #ccc;
            font-weight: bold;
          }
          
          .user-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.5rem;
            border-bottom: 1px solid #ccc;
          }
          
          .column {
            display: flex;
            align-items: center;
            flex: 1;
          }
          
          .user-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
          
          .user-name {
            margin-left: 1rem;
            flex: 2;
          }
          
          .user-email {
            margin: 0 1rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            flex: 3;
          }

          .user-info {
            display: flex;
            flex-grow: 1;
            justify-content: space-between;
            align-items: center;
          }

          .user-name {
            font-weight: bold;
          }

          .user-status {
            padding: 0.2cm;
            border: none;
            border-radius: 4px;
            color: #fff;
            cursor: pointer;
            transition: background-color 0.3s ease;
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .user-status.active {
            background-color: #FF5F00;
          }

          .user-status.inactive {
            background-color: #C0C0C0;
          }
        `}
        </style>

        <div className="table-header">
          <span className="column">Image</span>
          <span className="column">Name</span>
          <span className="column">Email</span>
          <span className="column">Status</span>
        </div>

        {users.map((user) => (
          <div key={user.userId} className="user-item">
            <img
              src={user.image.url}
              alt="User Image"
              className="user-avatar column"
            />
            <span className="user-name column">{`${user.firstName} ${user.lastName}`}</span>
            <span className="user-email column">{user.login.email}</span>
            <button
              className={`user-status ${
                user.isActive ? "active" : "inactive"
              } column`}
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
