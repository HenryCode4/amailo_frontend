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
const FoodBranch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {foods} = state;
    // const {tags} = state;
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

    const selectedTag = JSON.parse(localStorage.getItem("selected"));

    console.log(selectedTag);
  return (
    <div className='pb-4'>
    
    
    <div className='pb-16 p-2'>
  {selectedTag && Object.keys(selectedTag).length > 0 && (
    <div className='flex flex-col gap-2 justify-center items-center'>
      <img className='w-[150px] h-[150px]' src={`${selectedTag.imageUrl}`} alt={selectedTag.name} />
      <h1 className='text-2xl text-gray-500 font-semibold'>{selectedTag.name}</h1>
      <p className='text-[0.8rem] text-gray-400 font-semibold text-center'>You can now choose your preferred dish from our menu 😋</p>
    </div>
  )}
</div>

    

    {
        foods.length === 0 && <NotFound linkText={'Reset Search'}/>
    }
    
        <Thumbnails foods={foods} />
    
    </div>
    
  )
}

export default FoodBranch