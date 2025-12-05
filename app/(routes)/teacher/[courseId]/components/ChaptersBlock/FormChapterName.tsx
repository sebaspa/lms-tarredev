'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { formSchema } from './FormChapterName.form'

import { FormChapterNameProps } from './FormChapterName.types'

const FormChapterName = (props: FormChapterNameProps) => {
  const { setShowInputChapter, idCourse } = props
  const router = useRouter()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ''
    }
  })

  // 2. Define a submit handler.
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      axios.post(`/api/course/${idCourse}/chapter`, {
        title: values.title
      })
      setShowInputChapter(false)
      toast.success('Capitulo creado')
      router.refresh()
    } catch (error) {
      console.error('[Chapter]', error)
      toast.error('Error al crear el capitulo')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mb-4'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Ej: Introduccón a la programación.' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={!form.formState.isValid}>Crear</Button>
      </form>
    </Form>
  )
}

export default FormChapterName
