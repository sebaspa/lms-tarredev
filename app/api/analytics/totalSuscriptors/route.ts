import { getSuscribersByMonth } from '@/actions/getSuscribersByMonth'
import { NextResponse } from 'next/server'

export async function GET () {
  try {
    const data = await getSuscribersByMonth()
    return NextResponse.json(data)
  } catch (error) {
    console.error('[GET_TOTAL_SUSCRIPTORS]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
