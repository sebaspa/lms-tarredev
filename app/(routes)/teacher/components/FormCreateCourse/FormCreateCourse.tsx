'use client'

import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'
import { toast } from "sonner"

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { formSchema } from './FormCreateCourse.form'

const FormCreateCourse = () => {
  const router = useRouter()
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseName: '',
      slug: ''
    }
  })

  // 2. Define a submit handler.
  const onSubmit = async(values: z.infer<typeof formSchema>) => {
    console.log(values)
    try {
      const res = await axios.post('/api/course', values)
      toast.success('Curso creado con exito')
      router.push(`/teacher/${res.data.id}`)
      console.log(res)
    } catch (error) {
      console.error(error)
      toast.error('Error al crear el curso')
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 mt-4'>
        <FormField
          control={form.control}
          name='courseName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de el curso</FormLabel>
              <FormControl>
                <Input placeholder='Curso de ReactJS' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='slug'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug de el curso</FormLabel>
              <FormControl>
                <Input placeholder='curso-reactjs' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Crear curso</Button>
      </form>
    </Form>
  )
}

export default FormCreateCourse
