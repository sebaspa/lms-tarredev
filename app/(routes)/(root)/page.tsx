import { getHomeCourses } from "@/actions/getHomeCourses"
import { ExploreCourses } from "./components"
import { ListCourses } from "@/components/shared"

const Page = async () => {
  const listCourses = await getHomeCourses()
  return (
    <div>
      <ExploreCourses />
      <ListCourses title="Cursos más populares" courses={listCourses} />
    </div>
  )
}

export default Page
