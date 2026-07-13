export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#1a1443] p-6 rounded-xl border border-[#2a2a5a] shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-semibold text-white mb-2">Educations</h3>
          <p className="text-gray-400">Manage your educational background.</p>
        </div>
        <div className="bg-[#1a1443] p-6 rounded-xl border border-[#2a2a5a] shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-semibold text-white mb-2">Experiences</h3>
          <p className="text-gray-400">Manage your professional experience.</p>
        </div>
        <div className="bg-[#1a1443] p-6 rounded-xl border border-[#2a2a5a] shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-semibold text-white mb-2">Projects</h3>
          <p className="text-gray-400">Manage your projects and portfolio.</p>
        </div>
      </div>
    </div>
  );
}
