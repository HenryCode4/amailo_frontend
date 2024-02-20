import React from 'react'
import { Link } from 'react-router-dom'
import StarRating from './StarRating'
import Price from './Price'

const Thumbnails = ({foods}) => {
  return (
    <ul className='list flex justify-center flex-wrap p-0 list-none'>
        {
            foods.map((food)=> (
                <li key={food.id}>
                    <Link to={`/food/${food.id}`}>
                        <img className='image object-cover h-[14.5rem] ' src={`${food.imageUrl}`} alt={food.name} />
                    

                    <div className='content mt-[0.3rem] py-[0.5rem] px-[1rem] relative h-[7rem] '>
                        <div className='name'>{food.name}</div>
                        <span className={`favorite absolute top-[0.5rem] right-[1rem] text-[1.2rem] ${food.favorite ? "": "not text-gray-500"}`}>❤</span>
                        <div className='stars my-[0.5rem]'>
                            <StarRating stars={food.stars} />
                        </div>
                        
                    

                    <div className='product_item_footer '>
                        <div className='origins '>
                            {
                                food.origins.map((origin)=> (
                                    <span key={origin}>{origin}</span>
                                ))
                            }
                        </div>
                        <div className='cook_time'>
                            <span>🕒</span>
                            {food.cookTime}
                        </div>
                    </div>
                    <div className='price text-[0.8rem]'>
                        <Price price={food.price} />
                    </div>
                    </div>
                    </Link>
                </li>
            ))
        }
    </ul>
  )
}

export default Thumbnails