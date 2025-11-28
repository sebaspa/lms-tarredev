import { TitleBlockProps } from './TitleBlock.types'

const TitleBlock = (props: TitleBlockProps) => {
  const { title, icon: Icon } = props
  return (
    <div className='flex items-center mb-6 gap-1'>
      <div className='p-2 rounded-full bg-violet-400'>
        <Icon className='h-5 w-5 text-white' />
      </div>
      <h3 className='text-xl font-semibold'>{title}</h3>
    </div>
  )
}

export default TitleBlock
