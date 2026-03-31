import { currentUser } from "@clerk/nextjs/server"

import { ReceiptText } from "lucide-react"

import { getUserPurchases } from "@/actions/getUserPurchases"

import { OrdersList } from "./components"

const OrdersPage = async () => {
  const user = await currentUser()
  if(!user) {
    return <p>Not signed in</p>
  }
  const purchases = await getUserPurchases(user.id)
  console.log(purchases)
  return (
    <div className="my-4 mx-6 border rounded-lg bg-white p-6">
      <div className="flex items-center mb-6 gap-1">
        <div className="p-2 rounded-full bg-violet-400">
          <ReceiptText className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-semibold">Todos mis pedidos</h1>
      </div>
      <OrdersList purchases={purchases} recepipts={[]} />
    </div>
  )
}

export default OrdersPage
