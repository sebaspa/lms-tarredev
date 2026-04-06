import prisma from '@/lib/prisma'
import { endOfMonth, startOfMonth, subMonths, format } from 'date-fns'
import { es } from 'date-fns/locale'

export async function getRevenueByMonth () {
  const now = new Date()
  const months = Array.from({ length: 6 }, (_, index) =>
    subMonths(now, 5 - index)
  )
  const result = await Promise.all(
    months.map(async month => {
      const start = startOfMonth(month)
      const end = endOfMonth(month)

      const purchases = await prisma.purchase.findMany({
        where: {
          createdAt: {
            gte: start,
            lte: end
          }
        },
        include: {
          course: {
            select: {
              price: true
            }
          }
        }
      })
      const totalRevenue = purchases.reduce((sum, purchase) => {
        const coursePrice = purchase.course.price ?? 0

        return sum + coursePrice
      }, 0)

      return {
        month: format(month, 'LLLL', { locale: es }),
        revenue: Number(totalRevenue.toFixed(2))
      }
    })
  )

  return result
}
