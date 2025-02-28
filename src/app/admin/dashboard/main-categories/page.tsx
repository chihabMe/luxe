import { PagePaginator } from "@/components/PagePaginator";
import { getCategories } from "@/app/data/categories-data";
import {
  getAllMainCategories,
  getMainCategories,
} from "@/app/data/main-categories-data";
import AdminMainCategoryTable from "./_components/AdminMainCategoriesTable";

export default async function MainCategoryDashboard(props: {
  searchParams?: Promise<{ [key: string]: string | string[] }>;
}) {
  const searchParams = await props.searchParams;
  const page = (searchParams?.page as string) || "1";
  const { data, count, hasNext, hasPrev, pageCount } = await getMainCategories({
    page: parseInt(page),
    q: searchParams?.search as string,
  });

  const searchTerm = (searchParams?.search as string) || "";
  return (
    <main className="flex-col space-y-8 p-2">
      <div className="flex min-h-[calc(100vh-228px)] justify-center">
        <AdminMainCategoryTable
          currentPage={parseInt(page)}
          count={count}
          data={data}
          searchTerm={searchTerm}
        />
      </div>
      <PagePaginator
        hasNext={hasNext}
        hasPrev={hasPrev}
        baseHref="/admin/dashboard/categories"
        page={parseInt(page)}
        pageCount={pageCount}
      />
    </main>
  );
}
