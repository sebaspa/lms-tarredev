'use client'

import { formatPrice } from '@/lib/formatPrice'
import { ColumnDef } from '@tanstack/react-table'

export type PurchaseWithCourse = {
  id: string
  userId: string
  userEmail: string
  price: number | null
  createdAt: Date
  updatedAt: Date
  course: {
    title: string
    slug: string
    imageUrl: string | null
    price: number | null
  }
}

export const columns: ColumnDef<PurchaseWithCourse>[] = [
  {
    accessorKey: 'createdAtFormatted',
    header: 'Fecha de compra',
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt).toLocaleDateString('es-ES')
      return <div className='font-medium'>{date}</div>
    }
  },
  {
    accessorKey: 'userEmail',
    header: 'Cliente'
  },
  {
    accessorKey: 'course.title',
    header: 'Curso'
  },
  {
    accessorKey: 'price',
    header: 'Precio',
    cell: ({ row }) => {
      const price = row.original.price
      return <div className='font-medium'>{formatPrice(price)}</div>
    }
  }
]
