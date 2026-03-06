import { IconBadgeProps } from "./IconBadge.types"

const IconBadge = (props: IconBadgeProps) => {
  const { icon: Icon, text } = props
  return (
    <div className="flex items-center gap-2 text-xs">
      <div className="w-6 h-6 flex items-center justify-center bg-violet-400 rounded-full">
        <Icon className="h-4 w-4 text-white" />
      </div>
      <span className="text-slate-500">{text}</span>
    </div>
  )
}

export default IconBadge
