'use client'

import { useState } from 'react'

import { Calendar, Timer } from 'lucide-react'

import { IconBadge } from '@/components/shared'

import { HeroBlockCourseProps } from './HeroBlockCourse.types'
import { formatPrice } from '@/lib/formatPrice'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const HeroBlockCourse = (props: HeroBlockCourseProps) => {
  const { course, purchaseCourse } = props
  const {
    title,
    id,
    description,
    price,
    level,
    imageUrl,
    updatedAt,
    slug,
    chapters
  } = course
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const enrollCourse = async () => {
    console.log('Enroll course')
  }

  const redirectToCourse = () => {
    router.push(`/courses/${slug}/${chapters[0].id}`)
  }

  return (
    <div className='grid gap-4 grid-cols-1 md:grid-cols-2 mt-6'>
      <div className=''>
        <h2 className='text-3xl font-semibold'>{title}</h2>
        <p className='text-balance mt-2'>{description}</p>
        <div className='flex flex-col gap-3 mt-5 text-gray-600'>
          <IconBadge icon={Timer} text='7h 45min' />
          <IconBadge
            icon={Calendar}
            text={`Última actualización: ${new Date(
              updatedAt
            ).toLocaleDateString('es-CO')}`}
          />
        </div>
        <h2 className='text-xl font-semibold my-4'>{formatPrice(price)}</h2>
        {purchaseCourse ? (
          <Button
            className='hover:bg-violet-400 text-white font-semibold'
            disabled={isLoading}
            onClick={redirectToCourse}
          >
            Ver curso
          </Button>
        ) : (
          <Button
            className='hover:bg-violet-400 text-white font-semibold'
            disabled={isLoading}
            onClick={enrollCourse}
          >
            Inscribirse ahora
          </Button>
        )}
      </div>
      <Image
        src={imageUrl || '/default-course-image.webp'}
        alt={title}
        width={500}
        height={400}
        className='rounded-md'
      />
    </div>
  )
}

export default HeroBlockCourse
