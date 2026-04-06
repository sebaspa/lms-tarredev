'use client'
import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from '@/components/ui/chart'
import { useEffect, useState } from 'react'
import { SuscriptorsChartProps } from './SuscriptorsChart.types'
import axios from 'axios'
export const description = 'A bar chart'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)'
  }
} as ChartConfig

const SuscriptorsChart = () => {
  const [data, setData] = useState<SuscriptorsChartProps[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSuscribers = async () => {
      try {
        const res = await axios.get('/api/analytics/totalSuscriptors')
        setData(res.data)
      } catch (error) {
        console.error('[fetchSuscribers]', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSuscribers()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Últimos Suscriptores</CardTitle>
        <CardDescription>Suscriptores en los ultimos 6 meses</CardDescription>
      </CardHeader>
      {isLoading ? (
        <div className='text-sm text-muted-foreground h-36 flex items-center justify-center'>
          Loading...
        </div>
      ) : (
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='month'
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={value => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey='users' fill='var(--color-desktop)' radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      )}
      <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='flex gap-2 leading-none font-medium'>
          Creciendo un 5.2% este mes <TrendingUp className='h-4 w-4' />
        </div>
        <div className='leading-none text-muted-foreground'>
          Mostrando los Suscriptores de los ultimos 6 meses
        </div>
      </CardFooter>
    </Card>
  )
}

export default SuscriptorsChart
