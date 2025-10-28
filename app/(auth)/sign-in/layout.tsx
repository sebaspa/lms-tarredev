const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-full h-screen'>
      <div className='flex h-full w-full items-center justify-center'>
        <div className="absolute top-0 left-0 h-full w-full bg-linear-to-r from-amber-200 to-yellow-400 z-[-1]"></div>
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
