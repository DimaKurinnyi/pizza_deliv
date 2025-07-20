import { Button } from '@/shared/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FormInput } from '../../form-components/FormInput';
import { Title } from '../../title';
import { FormLoginSchema, TLoginFormValues } from './schema';

interface Props {
  onClose?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<TLoginFormValues>({
    resolver: zodResolver(FormLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: TLoginFormValues) => {
    try {
      const resp = await signIn('credentials', { ...data, redirect: false });
      if (!resp?.ok) {
        return toast.error('Login failed. Please try again.');
      }
      onClose?.();
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please try again.');
    }
  };
  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Login" size="md" className="font-bold" />
            <p className="text-gray-400">Enter your email and password</p>
          </div>
          <img src="/assets/images/phone-icon.png" alt="" width={60} height={60} />
        </div>
        <FormInput name="email" label="Email" required />
        <FormInput name="password" type="password" label="Password" required />
        <Button loading={form.formState.isSubmitting} type="submit" className=" h-12 text-base">
          Enter
        </Button>
      </form>
    </FormProvider>
  );
};
