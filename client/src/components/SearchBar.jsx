import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProductByName} from '../redux/actions';


export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState();

    function handleInputChange(event) {
        event.preventDefault();
        
        setName(event.target.value);
    
    }

    function handleSubmit(event) {
        if(name){
            event.preventDefault();
        dispatch(getProductByName(name))
        setName('');
        
        
        }else
        return alert('enter name')
    }
    

    return (
        <div>
            <input
                class='inputs'
                type='text'
                value={name}
                placeholder='Search Product...'
                onChange={handleInputChange}
            />
            <button
                class='button'
                type='submit'
                onClick={handleSubmit}>
                Search
            </button>
        </div>
    )
}