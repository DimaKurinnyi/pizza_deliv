'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Container } from './Container';
import { FormInput } from './form-components/FormInput';
import { FormRegisterSchema, TRegisterFormValues } from './modals/auth-modal/schema'; // Assuming you have a schema defined for the form
import { Title } from './title';
import { Button } from '../ui';
import { UpdateUserInfo } from '@/app/action';

interface Props {
  data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(FormRegisterSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: TRegisterFormValues) => {
    try {
      await UpdateUserInfo({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });
      toast.success('Profile updated successfully');
    } catch {
      toast.error('Failed to update profile. Please try again.');
    }
  };

  const onClickSingOut = () => {
    signOut({
      callbackUrl: '/',
    });
  };
  return (
    <Container className="my-10">
      <Title text="Profile" size="md" className="font-bold" />
      <FormProvider {...form}>
        <form className="flex flex-col gap-5 w-96 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput name="fullName" label="Full Name" required />
          <FormInput name="email" type="email" label="Email" required />
          <FormInput name="password" type="password" label="Password" required />
          <FormInput name="confirmPassword" type="password" label="Confirm Password" required />
          <Button disabled={form.formState.isSubmitting} type="submit" className="mt-10 text-base"> Save</Button>

          <Button onClick={onClickSingOut} variant='secondary' disabled={form.formState.isSubmitting} type="button" className="text-base">Log out</Button>
        </form>
      </FormProvider>
    </Container>
  );
};
