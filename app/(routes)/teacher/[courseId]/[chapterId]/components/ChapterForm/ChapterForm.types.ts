import { Chapter } from "@prisma/client"

export type ChapterFormProps = {
  chapter: Chapter
  courseId: string
}
