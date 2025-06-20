const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-600 p-4">
      <h2 className="text-sm font-bold mb-6 ps-2">FTS</h2>
      <nav className="space-y-3">
        <a href="#" className="block ps-1 hover:bg-green-50 rounded text-xs hover:border border-green-100">Dashboard</a>
        <a href="#" className="block ps-1 hover:bg-green-50 rounded text-xs hover:border border-green-100">Files</a>
        <a href="#" className="block ps-1 hover:bg-green-50 rounded text-xs hover:border border-green-100">Teams</a>
        <a href="#" className="block ps-1 hover:bg-green-50 rounded text-xs hover:border border-green-100">Settings</a>
        <a href="http://127.0.0.1:5173/logout" className="block ps-1 hover:bg-red-200 rounded text-xs hover:border border-green-100">Logout</a>
      </nav>
    </div>
  )
}

export default Sidebar

