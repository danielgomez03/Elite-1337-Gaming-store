import React from 'react'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getProductById , clean} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';


export default function Details() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  
  useEffect(() => {
    
  
    dispatch(getProductById(id));
    return dispatch(clean());
    
  }, [dispatch,id]);
  const detail = useSelector(state => state.detail);
  console.log(detail)
  return ( 
            <div>
              
              {(detail)&&(
                <div className='cont_detail'>
                  <div class='img'>
                    <img src={detail.image} alt="img not found" />
                    </div>
                    <div class='cont_text'>
                    <div class='text'>
                    <p>name: {detail.name}</p>
                    <p>description: {detail.description}</p>
                    <p>manufacturer: {detail.manufacturer}</p>
                    <p>origin: {detail.origin}</p>
                    <p>price: {detail.price}</p>
                    <p>discount: {detail.discount}</p>
                    <p>stock: {detail.stock} pzs</p>
                    <p>category: {detail.category} </p>
                    </div>
                    </div>
                    <div>
              
                </div> 
                </div>
                )}
                </div>
    
         
            
  )
}