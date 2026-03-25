'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

import {
  GripVertical,
  ListCheck,
  Loader2,
  Pencil,
  PlusCircle
} from 'lucide-react'

import TitleBlock from '../TitleBlock/TitleBlock'
import { Button } from '@/components/ui/button'

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from '@hello-pangea/dnd'

import { ChaptersBlockProps } from './ChaptersBlock.types'
import FormChapterName from './FormChapterName'
import { toast } from 'sonner'

const ChaptersBlock = (props: ChaptersBlockProps) => {
  const { chapters, idCourse } = props
  const router = useRouter()
  const [showInputChapter, setShowInputChapter] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  // Derived state: compute during render instead of useEffect
  const chapterList = chapters || []

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(chapterList)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    const bultUpdate = items.map((chapter, index) => {
      return {
        id: chapter.id,
        position: index
      }
    })

    onReorder(bultUpdate)
  }

  const onReorder = async (
    onUpdateData: { id: string; position: number }[]
  ) => {
    try {
      setIsUpdating(true)
      await axios.put(`/api/course/${idCourse}/chapter/reorder`, {
        list: onUpdateData
      })
      toast.success('Capitulos reordenados')
      router.refresh()
    } catch (error) {
      console.error('[Reorder]', error)
      toast.error('Error al reordenar los capitulos')
    } finally {
      setIsUpdating(false)
    }
  }

  const onEditChapter = (chapterId: string) => {
    router.push(`/teacher/${idCourse}/${chapterId}`)
  }

  return (
    <div className='p-6 bg-white rounded-md h-fit relative'>
      <TitleBlock title='Capítulos del curso' icon={ListCheck} />
      <div className='flex gap-2 items-center justify-between mb-3'>
        <p>Capítulos completos</p>
        <Button
          variant='outline'
          size='sm'
          onClick={() => setShowInputChapter(true)}
        >
          <PlusCircle className='w-4 h-4' />
          Crear capítulo
        </Button>
      </div>
      {showInputChapter && (
        <FormChapterName
          setShowInputChapter={setShowInputChapter}
          idCourse={idCourse}
        />
      )}

      {isUpdating && (
        <div className='absolute top-0 right-0 w-full h-full flex items-center justify-center bg-slate-500/20'>
          <Loader2 className='animate-spin h-6 w-6 text-violet-500' />
        </div>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='chapters'>
          {provided => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className='flex flex-col gap-2'
            >
              {chapterList.map((chapter, index) => (
                <Draggable
                  key={chapter.id}
                  draggableId={chapter.id}
                  index={index}
                >
                  {provided => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className='flex gap-2 items-center bg-slate-100 rounded-md py-2 px-4 text-sm justify-between'
                    >
                      <div className='flex items-center gap-2'>
                        <GripVertical className='w-4 h-4 text-gray-500' />
                        <p>{chapter.title}</p>
                      </div>
                      <div className='flex gap-2 items-center px-2 py-1'>
                        {chapter.isPublished ? (
                          <p className='px-2 py-1 text-emerald-600'>
                            Publicado
                          </p>
                        ) : (
                          <p className='px-2 py-1 text-gray-700'>
                            No publicado
                          </p>
                        )}
                        <div
                          role='button'
                          tabIndex={0}
                          className='cursor-pointer'
                          onClick={() => onEditChapter(chapter.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              onEditChapter(chapter.id)
                            }
                          }}
                        >
                          <Pencil className='w-4 h-4 text-gray-500' />
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default ChaptersBlock
