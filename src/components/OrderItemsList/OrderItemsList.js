import React from 'react';
import { Link } from 'react-router-dom';
// import Price from '../Price/Price';
import classes from './orderItemsList.module.css';
import Price from '../Price';

export default function OrderItemsList({ order }) {
  return (
    <table className={classes.table}>
      <tbody>
        <tr>
          <td colSpan="5">
            <h3>Order Items:</h3>
          </td>
        </tr>
        {order.items.map(item => (
          <tr className='flex flex-col md:flex-row gap-x-6 items-center ' key={item.food.id}>
            <td>
              <Link to={`/food/${item.food.id}`}>
                <img className='w-[50px] h-[50px]' src={item.food.imageUrl} alt='' />
              </Link>
            </td>
            <td>{item.food.name}</td>
            <td>
              <Price price={item.food.price} />
            </td>
            <td>{item.quantity}</td>
            <td>
              <Price price={item.price} />
            </td>
          </tr>
        ))}

        <tr>
          <td colSpan="3"></td>
          <td>
            <strong>Total :</strong>
          </td>
          <td>
            <Price price={order.totalPrice} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}