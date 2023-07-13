import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeUser } from "../redux/actions";

function ButtonUser() {
    const dispatch = useDispatch();
    const typeUser = useSelector(state => state.typeUser);
    const [selectedUser, setSelectedUser] = useState(typeUser);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        setSelectedUser(typeUser);
    }, [typeUser]);

    const handleUserChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedUser(selectedValue);
        dispatch(changeUser(selectedValue));
    };

        return (
            <select
                value={selectedUser}
                onChange={handleUserChange}
                className="py-2 px-4  rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="admin">Admin</option>
                <option value="users">Users</option>
                <option value="guest">Guest</option>
            </select>

        )
}

export default ButtonUser;
