'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar'
import { House } from 'lucide-react'
import Link from 'next/link'
import { routes } from './Appsidebar.data'

export const Appsidebar = () => {
  const { state } = useSidebar()
  return (
    <Sidebar collapsible='icon'>
      <SidebarContent className='bg-white'>
        <SidebarHeader>
          <Link href='/' className='flex flex-row items-center'>
            Sebaspa
          </Link>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
          <SidebarMenu className='space-y-2'>
            {routes.map((route) => (
              <SidebarMenuItem key={route.name}>
              <SidebarMenuButton asChild>
                <a href={route.href}>
                  <div className='p-1 rounded-lg text-white bg-violet-400'>
                    <route.icon className='w-4 h-4' />
                  </div>
                  {state === 'expanded' && <span>{route.name}</span>}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
