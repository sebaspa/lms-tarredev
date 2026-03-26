import Link from "next/link"
import { ChaptersListProps } from "./ChaptersList.types"
import { Eye } from "lucide-react"

const ChaptersList = (props: ChaptersListProps) => {
  const { chapters, courseSlug, currentChapter, userProgress } = props

  if(!chapters) return null

  return (
    <div className="grid gap-4">
      {chapters.map((chapter) => {

        return (
          <Link href={`/courses/${courseSlug}/${chapter.id}`} key={chapter.id} className="flex items-center justify-between border-gray-200 rounded-md transition-all duration-300">
            <div className="flex items-center gap-2 border shadow-md w-full justify-between rounded-md p-2">
              <span>{chapter.title}</span>
              <Eye className="w-4 h-4" />
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default ChaptersList
