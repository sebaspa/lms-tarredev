import { CertificateProps } from "./Certificate.types"

const Certificate = (props: CertificateProps) => {
  const { userName, titleCourse, cerRef } = props
  return (
    <div ref={cerRef} className="w-full h-[650px] relative bg-[url('/certificate.png')] bg-cover bg-center text-black">
      <p className="absolute text-4xl tracking-wider font-semibold top-[40%] w-full text-center">{userName}</p>
      <p className="absolute text-3xl tracking-wider font-semibold top-[67%] w-full text-center">{titleCourse}</p>
      <p className="absolute text-sm bottom-32 left-28">{new Date().toLocaleDateString()}</p>
    </div>
  )
}

export default Certificate
