'use client'

import { useState } from 'react'
import axios from 'axios'

import { FileImage, Pencil } from 'lucide-react'

import TitleBlock from '../TitleBlock/TitleBlock'
import { CourseImageProps } from './CourseImage.types'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { UploadButton } from '@/utils/uploadthing'
import { toast } from 'sonner'

const CourseImage = (props: CourseImageProps) => {
  const { idCourse, imageCourse } = props
  const [isEditing, setIsEditing] = useState(false)
  const [image, setImage] = useState(imageCourse)

  const onChangeImage = async (imageUrl: string) => {
    console.log(imageUrl)

    try {
      axios.patch(`/api/course/${idCourse}`, {
        imageUrl
      })
      toast.success('Imagen actualizada')
    } catch (error) {
      console.error(error)
      toast.error('Error al actualizar la imagen')
    }
  }

  return (
    <div className='p-4 rounded-lg bg-white h-fit'>
      <TitleBlock title='Imagen del curso' icon={FileImage} />
      {isEditing ? (
        <div className='bg-slate-300 p-4 mt-2 rounded-lg'>
          <UploadButton
            endpoint='imageUploader'
            onClientUploadComplete={res => {
              onChangeImage(res[0]?.ufsUrl || '')
              setImage(res[0]?.ufsUrl)
              setIsEditing(false)
            }}
            onUploadError={error => {
              toast.error('Error al subir la imagen')
              console.log('Error: ', error)
            }}
            onUploadProgress={progress => {
              console.log('Progress: ', progress)
            }}
          />
        </div>
      ) : (
        <div className='w-full bg-gray-300 rounded-md h-[250px]'>
          <Image
            src={image || '/default-course-image.webp'}
            alt='Imagen del curso'
            width={500}
            height={250}
            className='rounded-md w-full h-full object-cover'
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
