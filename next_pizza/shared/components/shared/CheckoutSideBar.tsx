'use client';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import React from 'react';
import { Button } from '../ui';
import { Skeleton } from '../ui/skeleton';
import { CheckoutItemDetails } from './CheckoutItemDetails';
import { WhiteBlock } from './WhiteBlock';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Payments } from './strupe-payment/Payments';
import convertToSubcurrency from '@/shared/lib/convertToSubcurrency';
import { TCheckoutFormValues } from './checkout/checkout-form-schema';

if(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined')}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

interface Props {
  totalPrice: number;
  totalAmount: number;
  vatPrice: number;
  loading?: boolean;
  openPayment?: boolean;
  data?:TCheckoutFormValues,
}

const DELIVERY_COST = 5;
export const CheckoutSideBar: React.FC<Props> = ({ totalAmount, totalPrice, vatPrice, loading,openPayment,data }) => {
  return (
    <WhiteBlock className="p-6 sticky top-4">
      <div className="flex flex-col gap-1">
        <span className="text-xl">Order summary:</span>
        {loading ? <Skeleton className="h-11 w-48" /> : <span className=" h-11 text-3xl font-extrabold">{totalPrice} $</span>}
      </div>
      <CheckoutItemDetails
        title={
          <div className="flex items-center gap-2">
            <Package size={18} className="text-gray-400" />
            Cost item
          </div>
        }
        value={loading ? <Skeleton className="h-6 w-14" /> : `${totalAmount}$`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center gap-2">
            <Percent size={18} className="text-gray-400" />
            VAT
          </div>
        }
        value={loading ? <Skeleton className="h-6 w-14" /> : `${vatPrice}$`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center gap-2">
            <Truck size={18} className="text-gray-400" />
            Delivery
          </div>
        }
        value={loading ? <Skeleton className="h-6 w-14" /> : `${DELIVERY_COST}$`}
      />
      {!openPayment && <Button  loading={loading} type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
        Payment
        <ArrowRight className="w-5 ml-2" />
      </Button>}
      {openPayment && <Elements stripe={stripePromise}
        options={{
          mode: 'payment',
          amount: convertToSubcurrency(totalPrice),
          currency:'pln'
        }}>
            <Payments data={data} totalPrice={totalPrice}/>
          </Elements>}
    </WhiteBlock>
  );
};
