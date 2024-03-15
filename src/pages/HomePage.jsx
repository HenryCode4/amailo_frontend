import React, { useEffect, useReducer } from 'react'
import { getAll, getAllByTag, getAllTags, search } from '../services/foodService';
import Thumbnails from '../components/Thumbnails';
import { useParams } from 'react-router-dom';
import Search from '../components/Search';
import Tags from '../components/Tags';
import NotFound from '../components/NotFound/NotFound';

const initialState = {foods: [], tags: []};

const reducer = (state, action) => {
    switch(action.type) {
        case 'FOODS_LOADED': 
        return {...state, foods: action.payload};
        case 'TAGS_LOADED': 
        return {...state, tags: action.payload};
        default: 
        return state;
    }
}
const HomePage = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {foods} = state;
    const {tags} = state;
    const {searchTerm, tag} = useParams();

    useEffect(()=> {
        getAllTags().then(tags => dispatch({type: 'TAGS_LOADED', payload:tags}))
        
        const loadFoods = tag 
        ? getAllByTag(tag)
        : searchTerm ? 
        search(searchTerm) 
        : getAll();

        loadFoods.then(foods => dispatch({ type: 'FOODS_LOADED', payload: foods }))
    }, [searchTerm, tag])
  return (
    <>
    
    <div className='flex flex-col md:flex-row justify-center gap-x-32 items-center px-2'>
        <div className='w-[350px] md:w-[500px]'>
            <h1 className='text-2xl md:text-5xl font-bold tracking-wide pb-3'>Enjoy Your <span className='text-[#FF582E] border-b-4 border-[#FF582E] rounded-xl'>Food</span> </h1>
            <h3 className='text-2xl md:text-5xl font-bold tracking-wide pb-6'>Without Leaving The House</h3> 
            <p className='text-[.8rem] text-gray-500 pb-8'>Satisfy your craving without stepping out - indulge in a diverse culinary experience delivered straight to your doorstep, Elevate your home dining with a menu that caters to your taste.</p>

            <div className='flex gap-x-4'>
                <a href='#order-now' className='bg-[#273238] text-white text-[0.9rem] font-bold px-4 py-2 rounded-full'>Order Now</a>
            <a href='/orders' className='border-2 border-gray-300 text-gray-500 text-[0.9rem] px-4 py-2 rounded-full font-bold '>Track your order</a>
            </div>
            
        </div>
        
        <img className='w-[350px] h-[350px] md:w-[550px] md:h-[550px]' src='/icons/delivery.jpg' alt="" />
    </div>

    <div className='pt-2 pb-16' id='order-now'>
    <Search />

    <p className='text-center text-gray-500 text-[1.3rem] font-bold'>Choose your preferred restaurant</p>
    <Tags 
    tags={tags}
    />


    <div className='w-full px-10 pb-2'>
        <h3 className='text-xl font-semibold text-center md:text-start text-gray-500'>Suggestions you may like</h3>
    </div>

    {
        foods.length === 0 && <NotFound linkText={'Reset Search'}/>
    }
    
        <Thumbnails foods={foods} />
    </div>
    
    </>
    
  )
}

export default HomePage