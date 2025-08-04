
import { InfoBlock } from '@/shared/components/shared'
import React from 'react'

export default function UnauthorizedPage() {
  return (
    <div className='flex flex-col items-center justify-center mt-40'>
        <InfoBlock
        title='You are not logged in'
        text='You need to be logged in to view this page'
        imageUrl='assets/images/lock.png'></InfoBlock>
    </div>
  )
}
