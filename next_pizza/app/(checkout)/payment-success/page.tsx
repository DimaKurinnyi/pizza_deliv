'use client';

import { newStatus } from '@/app/action';
import { useEffect } from 'react';

export default function PaymentSuccess({ searchParams: { order_id, redirect_status } }: { searchParams: { order_id: string; redirect_status: string } }) {
  useEffect(() => {
    newStatus(order_id, redirect_status);
    console.log('order_id', order_id);
    console.log('redirect_status', redirect_status);
  }, [order_id, redirect_status]);
  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
        <h2 className="text-2xl">You successfully sent</h2>

        <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">${order_id}</div>
      </div>
    </main>
  );
}
