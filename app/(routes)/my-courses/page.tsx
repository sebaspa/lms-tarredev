import { getPurchasedCourses } from "@/actions/getPurchasedCourses"
import { ListCourses } from "@/components/shared"

const MyCoursesPage = async() => {
  const courses = await getPurchasedCourses()
  return (
    <div>
      <ListCourses title="Mis cursos" courses={courses} />
    </div>
  )
}

export default MyCoursesPage
