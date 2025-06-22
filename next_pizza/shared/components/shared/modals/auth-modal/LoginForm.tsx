import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormLoginSchema, TLoginFormValues } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Title } from '../../title'
interface Props {
  onClose?:VoidFunction
}

export const LoginForm: React.FC<Props> = ({onClose}) => {
  const form = useForm<TLoginFormValues>({
    resolver:zodResolver(FormLoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (data: TLoginFormValues) => {
    console.log(data)
    // Handle login logic here
    // onClose?.()
  }
  return (
    <FormProvider {...form}>
      <form className='flex flex-col gap-5' onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Login" size="md" className="font-bold" />
            <p className='text-gray-400'>Enter your email and password</p>
          </div>
          <img src="/assets/images/phone-icon.png" alt=""  width={60} height={60}/>
        </div>
        
      </form>
    </FormProvider>
  )
}

