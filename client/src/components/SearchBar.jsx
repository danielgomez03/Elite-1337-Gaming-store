import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProductByName } from '../redux/actions';


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
            setName('');


        } else
            return alert('enter name')
    }


    return (
        <div className='flex items-center justify-center relative'>
            <input
                class='inputs'
                type='text'
                value={name}
                placeholder='Search Product...'
                onChange={handleInputChange}
                className="w-full px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
            <button
                class='button'
                type='submit'
                onClick={handleSubmit}
                className='absolute right-2'>
                <span class="material-symbols-rounded pt-1">
                    search
                </span>
            </button>
        </div>
    )
}