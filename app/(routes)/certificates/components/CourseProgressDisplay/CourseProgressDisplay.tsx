import { Progress } from "@/components/ui/progress";
import { CourseProgressDisplayProps } from "./CourseProgressDisplay.types"
import DownloadCertificate from "../DownloadCertificate/DownloadCertificate";

const CourseProgressDisplay = (props: CourseProgressDisplayProps) => {
  const { progress, titleCourse, userName } = props
  const showProgress = progress === 100;

  return showProgress ? (
    <DownloadCertificate userName={userName} titleCourse={titleCourse} />
  ) : (
    <>
    <Progress value={progress} className="*:bg-violet-300" />
    <p className="text-xs">{progress}% completado</p>
    </>
  )
}

export default CourseProgressDisplay
