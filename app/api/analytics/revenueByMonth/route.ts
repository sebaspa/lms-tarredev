import { getRevenueByMonth } from '@/actions/getRevenueByMonth'
import { NextResponse } from 'next/server'

export async function GET () {
  try {
    const data = await getRevenueByMonth()
    return NextResponse.json(data)
  } catch (error) {
    console.error('[GET_REVENUE_BY_MONTH]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}