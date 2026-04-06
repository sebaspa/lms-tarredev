'use client'

import { formatPrice } from '@/lib/formatPrice'

import { Progress } from '@/components/ui/progress'

import { ProgressCourseProps } from './ProgressCourse.types'
import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import axios from 'axios'

const ProgressCourse = (props: ProgressCourseProps) => {
  const { courseId, totalChapters, price } = props
  const { user } = useUser()
  const [loading, setLoading] = useState(true)
  const [progressCourse, setProgressCourse] = useState<number>(0)

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user?.id) return setLoading(false)
      try {
        const { data } = await axios.post('/api/get-user-progress', {
          courseId,
          userId: user.id
        })

        setProgressCourse(data.progress)
      } catch (error) {
        console.error('[GET_USER_PROGRESS_BY_COURSE]', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProgress()
  }, [courseId, user?.id])

  if(!user) {
    return <p className='text-xs mt-2'>Debes iniciar sesión para ver el progreso.</p>
  }

  if(loading) {
    return <p className='text-xs mt-2'>Cargando progreso...</p>
  }

  return (
    <div className='mt-4'>
      {totalChapters > 0 && progressCourse > 0 ? (
        <div>
          <Progress value={progressCourse} className='*:bg-violet-300' />
          <p className='text-xs mt-1'>{progressCourse}% completado</p>
        </div>
      ) : (
        <h4>{formatPrice(price)}</h4>
      )}
    </div>
  )
}

export default ProgressCourse
