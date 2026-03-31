export type PurchaseWithCourse = {
  id: string
  userId: string
  courseId: string
  course: {
    id: string
    title: string
    price: number | null
  }
}

type PurchaseWithFormatedDate = PurchaseWithCourse & {
  createdAtFormated: string
}

export type OrdersListProps = {
  purchases: PurchaseWithFormatedDate[]
  recepipts?: {
    paymentIntentId: string
    receiptUrl: string | null
  }[]
}
