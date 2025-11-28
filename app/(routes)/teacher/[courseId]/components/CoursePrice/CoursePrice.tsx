'use client'

import { useState } from 'react'
import axios from 'axios'

import { toast } from 'sonner'

import { DollarSign } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import TitleBlock from '../TitleBlock/TitleBlock'

import { CoursePriceProps } from './CoursePrice.types'
import { Button } from '@/components/ui/button'

const CoursePrice = (props: CoursePriceProps) => {
  const { idCourse, priceCourse } = props
  const [price, setPrice] = useState<number | string | undefined>(
    priceCourse || 'Gratis'
  )

  const onChangePrice = async () => {
    try {
      const priceToSend = price === 'Gratis' ? null : parseFloat(price as string)
      axios.patch(`/api/course/${idCourse}`, {
        price: priceToSend
      })
      toast.success('Precio actualizado')
    } catch (error) {
      console.error(error)
      toast.error('Error al actualizar el precio')
    }
  }

  return (
    <div className='p-6 bg-white rounded-md h-fit'>
      <TitleBlock title='Precio del curso' icon={DollarSign} />
      <Select onValueChange={setPrice} defaultValue={price?.toString()}>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Precio del curso' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Precio del curso</SelectLabel>
            <SelectItem value='Gratis'>Gratis</SelectItem>
            <SelectItem value='19'>$19</SelectItem>
            <SelectItem value='20'>$20</SelectItem>
            <SelectItem value='21'>$21</SelectItem>
            <SelectItem value='22'>$22</SelectItem>
            <SelectItem value='23'>$23</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button
        className='mt-3'
        disabled={!price}
        onClick={() => onChangePrice()}
      >
        Guardar precio
      </Button>
    </div>
  )
}

export default CoursePrice
