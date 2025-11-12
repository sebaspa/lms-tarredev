'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { HeaderCourseProps } from './HeaderCourse.types'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff, MoveLeft, Trash } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'

const HeaderCourse = (props: HeaderCourseProps) => {
  const router = useRouter()
  const { idCourse, isPublished } = props
  const [isLoading, setIsLoading] = useState(false)

  const onPublish = async (state: boolean) => {
    setIsLoading(true)
    try {
      await axios.patch(`/api/course/${idCourse}`, {
        isPublished: state
      })
      toast.success(state ? 'Curso publicado' : 'Curso despublicado')
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error('Error al publicar el curso')
    }
    setIsLoading(false)
  }

  const removeCourse = async () => {
    try {
      await axios.delete(`/api/course/${idCourse}`)
      toast.success('Curso eliminado')
      router.push('/teacher')
    } catch (error) {
      console.error(error)
      toast.error('Error al eliminar el curso')
    }
  }

  return (
    <div>
      <div className='mb-4'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <Button onClick={() => router.push('/teacher')}>
            <MoveLeft className='' /> Volver a todos los cursos
          </Button>
          <div className='gap-2 flex items-center'>
            {isPublished ? (
              <Button
                variant='outline'
                onClick={() => onPublish(false)}
                disabled={isLoading}
              >
                Despublicar
                <EyeOff />
              </Button>
            ) : (
              <Button
                onClick={() => onPublish(true)}
                disabled={isLoading}
              >
                Publicar
                <Eye />
              </Button>
            )}
            <Button
              variant='destructive'
              onClick={removeCourse}
            >
              <Trash />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderCourse
