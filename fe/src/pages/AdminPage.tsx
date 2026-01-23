import AdminHeader from "@/components/admin/AdminHeader";
import AdminTable from "@/components/admin/AdminTable";
import { useState } from "react";
import AdminQuizEditor from "./AdminQuizEditor";

export default function AdminPage() {
  const [status, setStatus] = useState("dashboard");

  const handleDashboardClick = () => {
    setStatus("dashboard");
  };

  const handleEditPage = () => {
    setStatus("editpage");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader
        status={status}
        onDashboardClick={handleDashboardClick}
        onEditPage={handleEditPage}
      />

      <main className="p-6">
        {status === "dashboard" && <AdminTable />}{" "}
        {status === "editpage" && <AdminQuizEditor />}
      </main>
    </div>
  );
}
