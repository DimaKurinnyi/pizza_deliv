import React from 'react';

interface Props {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}
export const PayOrderTemplate: React.FC<Props> = ({ orderId, totalAmount, paymentUrl }) => {
  return (
    <div>
      <h1>Order #{orderId}</h1>
      <p>
        Thank you for your order! {totalAmount} To complete the payment, please <a href={paymentUrl}>click her</a>.
      </p>
    </div>
  );
};
