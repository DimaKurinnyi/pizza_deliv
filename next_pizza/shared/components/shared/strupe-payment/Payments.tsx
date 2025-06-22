'use client';

import { createOrder } from '@/app/action';
import convertToSubcurrency from '@/shared/lib/convertToSubcurrency';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { Button } from '../../ui';
import { TCheckoutFormValues } from '../checkout/checkout-form-schema';

interface Props {
  totalPrice: number;
  data?: TCheckoutFormValues;
}

export const Payments: React.FC<Props> = ({ totalPrice, data }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string>('');
  const [errorMassage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlerSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!data) {
      setErrorMessage('Order data is missing');
      setLoading(false);
      return;
    }
    const res = await createOrder(data);
    if (!stripe || !elements) {
      return;
    }
    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message || 'Something went wrong');
      setLoading(false);
      return;
    }
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://localhost:3000/payment-success?order_id=${res}&amount=${totalPrice}`,
      },
    });

    if (error) {
      setErrorMessage(error.message || 'Something went wrong');
    } else {
    }
  };

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: convertToSubcurrency(totalPrice),
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [totalPrice]);

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {clientSecret && <PaymentElement />}
      {errorMassage && <div className="text-red-500 text-sm mt-2">{errorMassage}</div>}
      <Button onClick={handlerSubmit} className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
        {!loading ? `Pay $${totalPrice}` : 'Processing...'}
      </Button>
    </div>
  );
};
