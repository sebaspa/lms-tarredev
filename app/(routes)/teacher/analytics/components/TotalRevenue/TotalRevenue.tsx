'use client'
import { TrendingUp } from 'lucide-react'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
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
import { TotalRevenueProps } from './TotalRevenue.types'
import axios from 'axios'
export const description = 'A line chart with dots'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)'
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--chart-2)'
  }
} as ChartConfig

const TotalRevenue = () => {
  const [data, setData] = useState<TotalRevenueProps[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const res = await axios.get('/api/analytics/revenueByMonth')
        setData(res.data)
      } catch (error) {
        console.error('[fetchRevenue]', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRevenue()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total de ingresos</CardTitle>
        <CardDescription>Ingresos de los ultimos 6 meses</CardDescription>
      </CardHeader>
      {isLoading ? (
        <div className='text-sm text-muted-foreground h-36 flex items-center justify-center'>
          Loading...
        </div>
      ) : (
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={data}
              margin={{
                left: 12,
                right: 12
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='month'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={value => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey='revenue'
                type='natural'
                stroke='var(--color-desktop)'
                strokeWidth={2}
                dot={{
                  fill: 'var(--color-desktop)'
                }}
                activeDot={{
                  r: 6
                }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      )}
      <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='flex gap-2 leading-none font-medium'>
          Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
        </div>
        <div className='leading-none text-muted-foreground'>
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}

export default TotalRevenue
