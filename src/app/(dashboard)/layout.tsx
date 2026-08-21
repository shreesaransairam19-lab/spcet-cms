"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useAuth } from "@/hooks/use-auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, fullName, role, isLoading, isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const sidebarUser = {
    name: fullName || user.email.split("@")[0],
    email: user.email,
    role: role === "super_admin" ? "admin" as const : (role || "student") as "admin" | "faculty" | "student",
    avatar: undefined,
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        user={sidebarUser}
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
        notificationCount={3}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          user={{
            name: sidebarUser.name,
            email: sidebarUser.email,
            role: sidebarUser.role,
            avatar: sidebarUser.avatar,
          }}
          notificationCount={3}
          onMenuToggle={() => setSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
