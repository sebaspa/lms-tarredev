'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import { ChapterTitleFormProps } from './ChapterTitleForm.types'
import { Input } from '@/components/ui/input'
import { formSchema } from './ChapterTitleForm.form'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

import { EditorDescription } from '@/components/shared'

const ChapterTitleForm = (props: ChapterTitleFormProps) => {
  const { courseId, chapter } = props

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: chapter.title || '',
      description: chapter.description || '',
      isFree: chapter.isFree || false
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    console.log('values: ', values)
  }

  return (
    <div className='p-6 rounded-md bg-white mt-6'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4 grid grid-cols-1 md:grid-cols-2 gap-6'
        >
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del capítulo</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Ej: Introducción a la programación'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción del capítulo</FormLabel>
                <FormControl>
                  <EditorDescription {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='isFree'
            render={({ field }) => (
              <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel>Capítulo público</FormLabel>
                  <FormDescription>
                    Si quieres que este capítulo sea visible para todos los usuarios.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <div className=""></div>
          <Button type='submit' disabled={!form.formState.isValid} className='mt-4'>
            Guardar
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ChapterTitleForm
