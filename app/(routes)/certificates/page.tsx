import { currentUser } from "@clerk/nextjs/server"
import { getPurchasedCourses } from "@/actions/getPurchasedCourses"
import { getUserProgressByCourse } from "@/actions/getUserProgressByCourse"
import { Award } from "lucide-react"
import { CoursesList } from "./components"

const CertificatesPage = async() => {
  const courses = await getPurchasedCourses()
  const user = await currentUser()

  if(!user) {
    return <p>Not signed in</p>
  }

  const userName = `${user.firstName} ${user.lastName}`

  if(!courses) {
    return <p>No courses found</p>
  }

  const coursesWithProgress = await Promise.all(
    courses.map(async (course) => {
      const progress = await getUserProgressByCourse(course.id, user.id)

      return {
        ...course,
        progress
      }
    })
  )

  return (
    <div className="m-6 p-6 border bg-white rounded-md">
      <div className="flex items-center gap-1 mb-4">
        <div className="p-2 rounded-full bg-violet-400">
          <Award className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-semibold ml-1">Certificados de los cursos</h3>
      </div>
      <CoursesList courses={coursesWithProgress} userName={userName} />
    </div>
  )
}

export default CertificatesPage
