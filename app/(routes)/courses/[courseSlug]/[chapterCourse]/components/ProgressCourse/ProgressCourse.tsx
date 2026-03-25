'use client'

import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'

import type { ProgressCourseProps } from './ProgressCourse.types'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const ProgressCourse = (props: ProgressCourseProps) => {
  const router = useRouter()
  const { chapterCourseId, infoCourse, userProgress } = props
  const { chapters, id, slug } = infoCourse
  const totalChapters = chapters.length
  const completedChapters = userProgress.filter(
    progress => progress.isCompleted
  ).length
  const progressPercentage =
    totalChapters > 0
      ? Math.round((completedChapters / totalChapters) * 100)
      : 0
  const currentChapterProgress = userProgress.find(
    progress => progress.chapterId === chapterCourseId
  )
  const [isCompleted, setIsCompleted] = useState(
    currentChapterProgress?.isCompleted ?? false
  )

  useEffect(() => {
    const progress = userProgress.find(
      progress => progress.chapterId === chapterCourseId
    )
    if (progress) {
      setIsCompleted(progress.isCompleted)
    }
  }, [chapterCourseId, userProgress])

  const handleViewChapters = async (newIsCompleted: boolean) => {
    try {
      await axios.patch(
        `/api/course/${id}/chapter/${chapterCourseId}/progress`,
        JSON.stringify({ isCompleted: newIsCompleted })
      )
      setIsCompleted(newIsCompleted)
      if (newIsCompleted) {
        toast.success('Capítulo marcado como completado')
      } else {
        toast.success('Capítulo desmarcado como completado')
      }

      if (isCompleted) {
        const currentIndex = chapters.findIndex(
          chapter => chapter.id === chapterCourseId
        )
        const nextChapter = chapters[currentIndex + 1]

        if (nextChapter) {
          router.push(`/courses/${slug}/${nextChapter.id}`)
        }
      }
      router.refresh()
    } catch (error) {
      console.error('Error updating progress:', error)
      toast.error('Error al actualizar el progreso')
    }
  }

  return (
    <div>
      <div className='my-4 w-full flex items-center gap-2 flex-col p-2 border rounded-md shadow-md bg-white'>
        <span className='text-sm'>
          Progreso del curso | {progressPercentage}%
        </span>
        <Progress
          value={progressPercentage}
          className='*:bg-violet-300 w-full'
        />
      </div>
      <div className='my-4 w-full'>
        <Button
          className='w-full'
          onClick={() => handleViewChapters(!isCompleted)}
          variant={isCompleted ? 'outline' : 'default'}
        >
          {isCompleted ? 'Desmarcar como completado' : 'Marcar como completado'}
        </Button>
      </div>
    </div>
  )
}

export default ProgressCourse
