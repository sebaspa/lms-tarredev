import { currentUser } from "@clerk/nextjs/server"

import { Header } from "./components"

const TeacherPage = async () => {
  const user = await currentUser()

  if(!user) {
    return (<p>Not signed in</p>)
  }

  return (
    <div>
      <Header />
    </div>
  )
}

export default TeacherPage
