'use client'

import { z } from 'zod'

import { Cog } from 'lucide-react'
import TitleBlock from '../TitleBlock/TitleBlock'
import { CourseFormProps } from './CourseForm.types'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { formSchema } from './CourseForm.form'

const CourseForm = (props: CourseFormProps) => {
  const { course } = props

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: course.title || '',
      slug: course.slug || '',
      description: course.description || '',
      category: course.category || '',
      level: course.level || ''
    }
  })

  // 2. Define a submit handler.
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div className='p-6 bg-white rounded-md'>
      <TitleBlock title='Información del curso' icon={Cog} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título del curso</FormLabel>
                  <FormControl>
                    <Input placeholder='Curso de React' {...field} />
                  </FormControl>
                  <FormDescription>
                    Esto es lo que el usuario verá como título del curso.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='slug'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Url del curso</FormLabel>
                  <FormControl>
                    <Input placeholder='curso-de-react' {...field} disabled />
                  </FormControl>
                  <FormDescription>
                    Esto es lo que el usuario verá como Url del curso, y no se
                    puede modificar.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Selecciona la categoría del curso' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='Frontend'>Frontend</SelectItem>
                      <SelectItem value='Backend'>Backend</SelectItem>
                      <SelectItem value='Full Stack'>Full Stack</SelectItem>
                      <SelectItem value='Infraestructura'>
                        Infraestructura
                      </SelectItem>
                      <SelectItem value='Diseño Ux/UI'>Diseño Ux/UI</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='level'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nivel</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Selecciona la nivel del curso' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='Principiante'>Principiante</SelectItem>
                      <SelectItem value='Intermedio'>Intermedio</SelectItem>
                      <SelectItem value='Avanzado'>Avanzado</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Descripción del curso' {...field} />
                  </FormControl>
                  <FormDescription>
                    Esto es lo que el usuario verá como descripción del curso.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type='submit'>Guardar</Button>
        </form>
      </Form>
    </div>
  )
}

export default CourseForm
