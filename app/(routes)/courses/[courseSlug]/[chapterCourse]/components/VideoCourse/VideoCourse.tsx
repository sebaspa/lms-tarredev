import { VideoCourseProps } from "./VideoCourse.types"

const VideoCourse = (props: VideoCourseProps) => {
  const {videoUrl} = props
  return (
    <video src={videoUrl} controls className='w-full shadow-md rounded-md' />
  )
}

export default VideoCourse
