import ClientAdminLayout from "./ClientLayout";


export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientAdminLayout>{children}</ClientAdminLayout>;
}
