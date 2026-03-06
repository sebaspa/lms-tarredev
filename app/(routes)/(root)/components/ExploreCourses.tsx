import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

const ExploreCourses = () => {
  return (
    <div className='my-4 mx-6 border rounded-lg bg-white'>
      <div className='grid grid-cols-1 md:grid-cols-[60%_40%] gap-4'>
        <div className='p-6 flex flex-col gap-3'>
          <h1 className='text-4xl font-semibold'>Explora todos los cursos</h1>
          <p className='text-balance max-w-2xl'>
            Empieza a aprender desde cero con esstos cursos. No necesitas
            experiancia previa, no necesitas un computador de última tecnología.
            Solo necesitas las ganas.
          </p>
          <Link href='/courses'>
            <Button className='w-fit'>Empezar a aprender</Button>
          </Link>
        </div>
        <div className="flex items-end">
          <Image
            src='/explore-courses.webp'
            alt='explore-courses'
            width={300}
            height={200}
          />
        </div>
      </div>
    </div>
  )
}

export default ExploreCourses
