"use client"

import { formatPrice } from "@/lib/formatPrice"

import { getUserProgressByCourse } from "@/actions/getUserProgressByCourse"

import { Progress } from "@/components/ui/progress"

import { ProgressCourseProps } from "./ProgressCourse.types"             
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"

const ProgressCourse = (props: ProgressCourseProps) => {
  const { courseId, totalChapters, price } = props
  const {user} = useUser()
  const [progressCourse, setProgressCourse] = useState<number>(0)

  useEffect(() => {
    const fetchProgress = async () => {
      if(user?.id) {
        const progress = await getUserProgressByCourse(user?.id, courseId)
        setProgressCourse(progress)
      }
    }

    fetchProgress()
  }, [user?.id])

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
