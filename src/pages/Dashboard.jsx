import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#eaf3f8]">
      <Header />
      <Sidebar />

      {/* Main content */}
      <main className="pt-16 pl-16">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-[#1d4e6e]">Dashboard</h1>
          <p className="mt-1 text-sm text-[#5b9ab5]">
            Welcome back, Kenneth.
          </p>
        </div>
      </main>
    </div>
  );
}
