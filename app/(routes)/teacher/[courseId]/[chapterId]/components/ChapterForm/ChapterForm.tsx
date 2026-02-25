'use client'

import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'sonner'

import { ChapterFormProps } from './ChapterForm.types'

import { Button } from '@/components/ui/button'
import { TitleBlock } from '../../../components'

import { ArrowLeft, Cog, Trash } from 'lucide-react'
import ChapterTitleForm from './ChapterTitleForm'

const ChapterForm = (props: ChapterFormProps) => {
  const { chapter, courseId } = props
  const router = useRouter()

  if (!chapter) {
    return (
      <div>
        <div className='p-6 bg-white rounded-md'>
          <p>Capítulo no encontrado.</p>
        </div>
      </div>
    )
  }

  const onPlublish = async (state: boolean) => {
    try {
      axios.patch(`/api/course/${courseId}/chapter/${chapter.id}`, {
        isPublished: state
      })
      toast.success(state ? 'Capitulo publicado' : 'Capitulo despublicado')
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error('Error al cambiar el capitulo')
    }
  }

  return (
    <div>
      <div className='p-6 bg-white rounded-md'>
        <Button
          className='mb-4'
          variant='outline'
          onClick={() => router.push(`/teacher/${courseId}`)}
        >
          <ArrowLeft />
          Volver a la edición de el curso
        </Button>
      </div>

      <div className='p-6 mt-6 bg-white rounded-md flex justify-between items-center'>
        <TitleBlock title='Configuración del capítulo' icon={Cog} />
        <div className='gap-2 flex items-center'>
          {chapter.isPublished ? (
            <Button variant='outline' onClick={() => onPlublish(false)}>
              Ocultar
            </Button>
          ) : (
            <Button onClick={() => onPlublish(true)}>Publicar</Button>
          )}
          <Button
            variant='destructive'
            onClick={() => console.log('Eliminar capitulo')}
          >
            <Trash />
          </Button>
        </div>
      </div>
      <ChapterTitleForm chapter={chapter} courseId={courseId} />
    </div>
  )
}

export default ChapterForm
