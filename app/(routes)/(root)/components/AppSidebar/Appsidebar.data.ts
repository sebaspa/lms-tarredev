import { BookOpen, ChartArea, GraduationCap, House, Settings2, SquareTerminal } from 'lucide-react'

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
    name: 'Ajustes',
    href: '/settings',
    icon: Settings2
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
