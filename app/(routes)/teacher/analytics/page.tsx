import { SuscriptorsChart } from "./components"

const AnalyticsPage = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <SuscriptorsChart />
      </div>
    </div>
  )
}

export default AnalyticsPage
