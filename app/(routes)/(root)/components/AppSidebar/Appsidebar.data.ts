import { Award, BookOpen, ChartArea, GraduationCap, House, ReceiptText, SquareTerminal } from 'lucide-react'

export const routes = [
  {
    name: 'Home',
    href: '/',
    icon: House
  },
  {
    name: 'Cursos',
    href: '/courses',
    icon: SquareTerminal
  },
  {
    name: 'Mis cursos',
    href: '/my-courses',
    icon: BookOpen
  },
  {
    name: 'Pedidos',
    href: '/orders',
    icon: ReceiptText
  },
  {
    name: 'Certificados',
    href: '/certificates',
    icon: Award
  },
]

export const routesTeacher = [
  {
    name: 'Cursos',
    href: '/teacher',
    icon: GraduationCap
  },
  {
    name: 'Analíticas',
    href: '/teacher/analytics',
    icon: ChartArea
  }
]
