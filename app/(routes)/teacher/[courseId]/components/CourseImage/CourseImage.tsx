'use client'

import { useState } from 'react'

import { FileImage, Pencil } from 'lucide-react'

import TitleBlock from '../TitleBlock/TitleBlock'
import { CourseImageProps } from './CourseImage.types'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const CourseImage = (props: CourseImageProps) => {
  const { idCourse, imageCourse } = props
  const [isEditing, setIsEditing] = useState(false)
  return (
    <div className='p-4 rounded-lg bg-white h-fit'>
      <TitleBlock title='Imagen del curso' icon={FileImage} />
      {isEditing ? (
        <p>Upload image</p>
      ) : (
        <div className='w-full h-full min-h-[250px] bg-gray-300 rounded-md'>
          <Image
            src={imageCourse || '/default-course-image.webp'}
            alt='Imagen del curso'
            width={500}
            height={250}
            className='rounded-md w-full h-full'
          />
        </div>
      )}
      <Button
        className='w-full mt-4'
        variant='outline'
        size='sm'
        onClick={() => setIsEditing(!isEditing)}
      >
        <Pencil className='w-4 h-4 mr-1' />
        Editar imagen
      </Button>
    </div>
  )
}

export default CourseImage
