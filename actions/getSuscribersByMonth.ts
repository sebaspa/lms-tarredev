import prisma from '@/lib/prisma'
import { startOfMonth, subMonths, format } from 'date-fns'
import { es } from 'date-fns/locale'

export async function getSuscribersByMonth () {
  const now = new Date()
  const sixMonthAgo = startOfMonth(subMonths(now, 5))

  const purchases = await prisma.purchase.findMany({
    where: {
      createdAt: {
        gte: sixMonthAgo
      }
    },
    select: {
      createdAt: true
    }
  })

  const months = Array.from({ length: 6 }, (_, index) => {
    const date = subMonths(now, 5 - index)
    return {
      month: format(date, 'LLLL', { locale: es }),
      count: 0,
      date: format(date, 'yyyy-MM')
    }
  })

  purchases.forEach(purchase => {
    const purchaseMonth = format(purchase.createdAt, 'yyyy-MM')
    const month = months.find(m => m.date === purchaseMonth)

    if (month) {
      month.count += 1
    }
  })

  return months.map(({ month, count }) => ({
    month,
    users: count
  }))
}
