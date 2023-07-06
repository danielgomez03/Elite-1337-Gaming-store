import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actionByName, getProductByName } from '../redux/actions';


export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState();

    function handleInputChange(event) {
        event.preventDefault();

        setName(event.target.value);

    }

    function handleSubmit(event) {
        if (name) {
            event.preventDefault();
            dispatch(getProductByName(name))
            dispatch(actionByName())
            setName('');
        } else
            return alert('enter name')
    }

return (
    <div className='flex items-center justify-center relative'>
        <input
            type='text'
            value={name}
            placeholder='Search Product...'
            onChange={handleInputChange}
            className="w-full px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
        />
        <button
            type='submit'
            onClick={handleSubmit}
            className='absolute right-2'>
            <span className="material-symbols-rounded pt-1">
                search
            </span>
        </button>
    </div>
)
}