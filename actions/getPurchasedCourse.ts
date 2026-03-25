import prisma from '@/lib/prisma'

export const getPurchasedCourse = async (
  userId: string,
  courseId: string
): Promise<boolean> => {
  try {
    const purchase = await prisma.purchase.findFirst({
      where: {
        userId,
        courseId
      }
    })

    return !!purchase
  } catch (error) {
    console.error('[GET_PURCHASED_COURSE]: ', error)
    return false
  }
}
