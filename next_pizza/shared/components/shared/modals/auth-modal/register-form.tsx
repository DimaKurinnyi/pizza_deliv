'use client';
import { registerUser } from '@/app/action';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Button } from '@/shared/components/ui';

import { FormInput } from '../../form-components/FormInput';
import { FormRegisterSchema, TRegisterFormValues } from './schema';

interface Props {
  onClose?: VoidFunction;
  onClickLogin?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<TRegisterFormValues>({
    resolver: zodResolver(FormRegisterSchema),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: TRegisterFormValues) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.success('Registration successful 📝. Please confirm your email', {
        icon: '✅',
      });

      onClose?.();
    } catch (error) {
      console.error('Login failed:', error);
      return toast.error('Invalid E-Mail or password', {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput name="email" label="E-Mail" required />
        <FormInput name="fullName" label="Full Name" required />
        <FormInput name="password" label="Password" type="password" required />
        <FormInput name="confirmPassword" label="Confirm Password" type="password" required />

        <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
          Sign Up
        </Button>
      </form>
    </FormProvider>
  );
};
