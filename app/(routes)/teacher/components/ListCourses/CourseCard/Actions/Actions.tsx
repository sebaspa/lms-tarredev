'use client'

import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'sonner'

import { Edit, Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { ActionsProps } from './Actions.types'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'

const Actions = (props: ActionsProps) => {
  const { courseId } = props

  const router = useRouter()

  const onEdit = () => {
    router.push(`/teacher/${courseId}`)
  }

  const deleteCourse = async () => {
    try {
      await axios.delete(`/api/course/${courseId}`)
      toast.success('Curso eliminado')
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error('Error al eliminar el curso')
    }
  }

  return (
    <div className='flex flex-col gap-2 items-center w-full lg:max-w-42'>
      <Button className='w-full' onClick={onEdit}>
        Editar <Edit className='w-4 h-4' />
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant='outline'
            className='w-full text-red-500 border-red-500 hover:bg-red-100 hover:text-red-500'
          >
            Eliminar <Trash className='w-4 h-4' />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esto borrará permanentemente tu curso y no podrá ser recuperado.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={deleteCourse}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default Actions
