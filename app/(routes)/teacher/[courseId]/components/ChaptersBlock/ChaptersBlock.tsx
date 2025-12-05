'use client'
import { useState } from 'react'

import { ListCheck, PlusCircle } from 'lucide-react'

import TitleBlock from '../TitleBlock/TitleBlock'
import { Button } from '@/components/ui/button'

import { ChaptersBlockProps } from './ChaptersBlock.types'
import FormChapterName from './FormChapterName'

const ChaptersBlock = (props: ChaptersBlockProps) => {
  const { chapters, idCourse } = props
  const [chapterList, setChapterList] = useState(chapters || [])
  const [showInputChapter, setShowInputChapter] = useState(false)
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
       <FormChapterName setShowInputChapter={setShowInputChapter} idCourse={idCourse} />
      )}
    </div>
  )
}

export default ChaptersBlock
