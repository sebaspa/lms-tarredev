import { Chapter, Course } from '@prisma/client'

type CourseWithRelations = Course & {
  chapters: Chapter[]
}

export type CourseFormProps = {
  course: CourseWithRelations
}
