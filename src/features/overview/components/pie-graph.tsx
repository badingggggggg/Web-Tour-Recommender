'use client';

import * as React from 'react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { useDashboard } from '@/hooks/use-dashboard';

const chartConfig = {
  visitors: {
    label: 'Visitors'
  },
  chrome: {
    label: 'Chrome',
    color: 'hsl(var(--chart-1))'
  },
  safari: {
    label: 'Safari',
    color: 'hsl(var(--chart-2))'
  },
  firefox: {
    label: 'Firefox',
    color: 'hsl(var(--chart-3))'
  },
  edge: {
    label: 'Edge',
    color: 'hsl(var(--chart-4))'
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))'
  }
} satisfies ChartConfig;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function PieGraph() {
  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const categoryData = data?.categoryDistribution || [];

  return (
    <Card className='flex flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Category Distribution</CardTitle>
        <CardDescription>Visual breakdown of categories</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[360px]'
        >
          <PieChart width={350} height={350}>
            <Pie
              data={categoryData}
              dataKey='count'
              nameKey='category_name'
              cx='50%'
              cy='50%'
              outerRadius={120}
              fill='#8884d8'
              label
            >
              {categoryData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
