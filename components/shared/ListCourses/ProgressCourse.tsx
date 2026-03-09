import { currentUser } from "@clerk/nextjs/server"

import { formatPrice } from "@/lib/formatPrice"

import { getUserProgressByCourse } from "@/actions/getUserProgressByCourse"

import { Progress } from "@/components/ui/progress"

import { ProgressCourseProps } from "./ProgressCourse.types"             

const ProgressCourse = async (props: ProgressCourseProps) => {
  const { courseId, totalChapters, price } = props
  const user = await currentUser()

  if(!user) {
    return (
      <p className="text-xs mt-2">No hay usuario</p>
    )
  }

  const progressCourse = await getUserProgressByCourse(user.id, courseId)

  return (
    <div className="mt-4">
      {totalChapters > 0 && progressCourse > 0 ? (
        <div>
          <Progress value={progressCourse} className="*:bg-violet-300" />
          <p className="text-xs mt-1">{progressCourse}% completado</p>
        </div>
      ): (
        <h4>{formatPrice(price)}</h4>
      )}
    </div>
  )
}

export default ProgressCourse
