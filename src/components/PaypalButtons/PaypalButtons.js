// import {
//     PayPalButtons,
//     PayPalScriptProvider,
//     usePayPalScriptReducer,
//   } from '@paypal/react-paypal-js';
//   import React, { useEffect } from 'react';
//   import { useLoading } from '../../hooks/useLoading';
//   import { pay } from '../../services/orderService';
//   import { useCart } from '../../hooks/useCart';
//   import { toast } from 'react-toastify';
//   import { useNavigate } from 'react-router-dom';
  
//   export default function PaypalButtons({ order }) {
//     return (
//       <PayPalScriptProvider
//         options={{
//           clientId:
//             'AewUs_vyC5krpuCgkuirejX9wkrqZHYs0payCIpEcokHmozKRMXorhe9wwXpQHLA8x_QNDpeuyt2nYlD',
//         }}
//       >
//         <Buttons order={order} />
//       </PayPalScriptProvider>
//     );
//   }
  
//   function Buttons({ order }) {
//     const { clearCart } = useCart();
//     const navigate = useNavigate();
//     const [{ isPending }] = usePayPalScriptReducer();
//     const { showLoading, hideLoading } = useLoading();
//     useEffect(() => {
//       isPending ? showLoading() : hideLoading();
//     });
  
//     const createOrder = (data, actions) => {
//       return actions.order.create({
//         purchase_units: [
//           {
//             amount: {
//               currency_code: 'NGN',
//               value: order.totalPrice,
//             },
//           },
//         ],
//       });
//     };
  
//     const onApprove = async (data, actions) => {
//       try {
//         const payment = await actions.order.capture();
//         const orderId = await pay(payment.id);
//         clearCart();
//         toast.success('Payment Saved Successfully', 'Success');
//         navigate('/track/' + orderId);
//       } catch (error) {
//         toast.error('Payment Save Failed', 'Error');
//       }
//     };
  
//     const onError = err => {
//       toast.error('Payment Failed', 'Error');
//     };
  
//     return (
//       <PayPalButtons
//         createOrder={createOrder}
//         onApprove={onApprove}
//         onError={onError}
//       />

//       https://sandbox-flw-web-v3.herokuapp.com/pay/xnhzi4drxfmi
//     );
//   }\

import React from 'react';
import { useCart } from '../../hooks/useCart';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function PaymentButton({ order }) {
  const { clearCart } = useCart();
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      // Open the Flutterwave payment link in a new tab/window
      window.open('https://sandbox-flw-web-v3.herokuapp.com/pay/xnhzi4drxfmi', '_blank');
      
      // After payment, you may need to periodically check the payment status
      // You can use a timer, webhooks, or some other mechanism to detect successful payment

      // For example, you can periodically check the payment status using an API endpoint
      const paymentStatus = await checkPaymentStatus();
      if (paymentStatus === 'success') {
        clearCart();
        toast.success('Payment Successful', 'Success');
        navigate('/track/orders');
      } else if (paymentStatus === 'failure') {
        toast.error('Payment Failed', 'Error');
      }

    } catch (error) {
      toast.error('Payment Failed', 'Error');
    }
  };

  const checkPaymentStatus = async () => {
    // Implement logic to check payment status from Flutterwave
    // This could involve making an API request to your backend server
    // which communicates with Flutterwave API or using webhooks
    // For this example, you can simulate success/failure randomly
    const random = Math.random();
    if (random < 0.5) {
      return 'success';
    } else {
      return 'failure';
    }
  };

  return (
    <button onClick={handlePayment}>Proceed to Payment</button>
  );
}
