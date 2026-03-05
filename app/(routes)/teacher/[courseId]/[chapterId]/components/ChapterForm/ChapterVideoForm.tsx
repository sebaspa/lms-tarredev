'use client'

import { useState } from 'react'

import { Pencil, Video } from 'lucide-react'

import { TitleBlock } from '../../../components'

import { Button } from '@/components/ui/button'

import { UploadButton } from '@/utils/uploadthing'

import { ChapterVideoFormProps } from './ChapterVideoForm.types'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const ChapterVideoForm = (props: ChapterVideoFormProps) => {
  const { chapterId, courseId, videoUrl } = props
  const [onEditVideo, setOnEditVideo] = useState(false)

  const router = useRouter()

  const onSubmit = async (url: string) => {
    try {
      await axios.patch(`/api/course/${courseId}/chapter/${chapterId}`, {
        videoUrl: url
      })
      toast.success('Video actualizado')
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error('Error al actualizar el video')
    }
    setOnEditVideo(false)
  }

  return (
    <div className='mt-6 p-6 bg-white rounded-md'>
      <TitleBlock title='Añade o modifica el video' icon={Video} />
      {videoUrl ? (
        <video src={videoUrl} controls className='rounded-md' />
      ) : (
        <p>No hay video.</p>
      )}

      <div className='mt-4 p-2 rounded-md border'>
        <Button variant='secondary' onClick={() => setOnEditVideo(true)}>
          {onEditVideo ? 'Selecciona el video' : 'Editar video'}
          <Pencil className='w-4 h-4 ml-1' />
        </Button>
        {onEditVideo && (
          <UploadButton
            className='w-full bg-slate-200 rounded-md p-2 mt-2'
            endpoint='chapterVideo'
            onClientUploadComplete={url => {
              if (url) {
                onSubmit(url[0].serverData.url)
              }
            }}
          />
        )}
      </div>
    </div>
  )
}

export default ChapterVideoForm
