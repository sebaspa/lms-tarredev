import { getHomeCourses } from "@/actions/getHomeCourses"
import { ListCourses } from "@/components/shared"

const PageCourses = async() => {
  const listCourses = await getHomeCourses()
  return (
    <div>
      <ListCourses title="Todos los cursos" courses={listCourses} />
    </div>
  )
}

export default PageCourses
