import { PagePaginator } from "@/components/PagePaginator";
import AdminUsersTable from "./_components/AdminUsersTable";
import { getUsers } from "@/app/data/users-data";

export default async function UserDashboard(
  props: {
    searchParams?: Promise<{ [key: string]: string | string[] }>;
  }
) {
  const searchParams = await props.searchParams;
  const page = (searchParams?.page as string) || "1";
  const { data, count, hasNext, hasPrev, pageCount } = await getUsers({
    page: parseInt(page),
    q: searchParams?.search as string,
  });
  const searchTerm = (searchParams?.search as string) || "";
  return (
    <main className="flex-col space-y-8 p-2">
      <div className="flex min-h-[calc(100vh-228px)] justify-center">
        <AdminUsersTable
          currentPage={parseInt(page)}
          count={count}
          data={data}
          searchTerm={searchTerm}
        />
      </div>
      <PagePaginator
        hasNext={hasNext}
        hasPrev={hasPrev}
        baseHref="/admin/dashboard/users"
        page={parseInt(page)}
        pageCount={pageCount}
      />
    </main>
  );
}
