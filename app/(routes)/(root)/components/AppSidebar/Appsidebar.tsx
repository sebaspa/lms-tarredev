'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { routes, routesTeacher } from './Appsidebar.data'
import Image from 'next/image'

export const Appsidebar = () => {
  const { state } = useSidebar()
  return (
    <Sidebar collapsible='icon'>
      <SidebarContent className='bg-white'>
        <SidebarHeader>
          <Link href='/' className='flex flex-row items-center'>
            <Image src='/icon.png' alt='logo' width={35} height={35} />
            {state === 'expanded' && (
              <span className='text-xl font-semibold text-gray-800 tracking-wide'>
                Sebaspa
              </span>
            )}
          </Link>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
          <SidebarMenu className='space-y-2'>
            {routes.map(route => (
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
          <SidebarMenu className='mt-4'>
            <SidebarGroupLabel>Profesor</SidebarGroupLabel>
            <SidebarMenuItem>
              <SidebarMenuSub>
                {routesTeacher.map(route => (
                  <SidebarMenuSubItem key={route.name}>
                    <SidebarMenuSubButton
                      href={route.href}
                      className='hover:bg-muted transition'
                    >
                      <div className='p-1 rounded-lg text-white bg-slate-400'>
                        <route.icon className='w-4 h-4' />
                      </div>
                      {route.name}
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
