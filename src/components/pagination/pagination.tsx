import ChevronLeft from "../../assets/icons/chevron-left.svg";
import ChevronRight from "../../assets/icons/chevron-right.svg";
import { DOTS, usePagination } from "./usePagination";

const Pagination = ({
  totalCount,
  limit,
  updatePage,
  activePageIndex,
}: {
  totalCount: number;
  limit: number;
  activePageIndex: number;
  updatePage: (data: number) => void;
}) => {
  const paginationRange = usePagination({
    currentPage: activePageIndex,
    totalCount,
    siblingCount: 1,
    pageSize: limit,
  });

  if (activePageIndex === 0 || paginationRange!.length < 2) {
    return null;
  }

  const lastPage = paginationRange![paginationRange!.length - 1];

  return (
    <div className="flex gap-2 justify-center items-center">
      <div
        onClick={() => activePageIndex === 1 && updatePage(activePageIndex - 1)}
        style={{ opacity: activePageIndex === 1 ? 1 : 0.5 }}
      >
        <img src={ChevronLeft} />
      </div>
      {paginationRange &&
        paginationRange!.map((data, index) => (
          <div
            className="p-2 border rounded-lg cursor-pointer w-[2.5rem] h-[2.5rem] flex justify-center items-center"
            style={{
              background:
                activePageIndex === data ? "rgb(47, 90, 255)" : "transparent",
            }}
            key={index}
            onClick={() => data !== DOTS && updatePage(Number(data))}
          >
            {data}
          </div>
        ))}
      <div
        onClick={() =>
          activePageIndex !== lastPage && updatePage(activePageIndex + 1)
        }
        style={{ opacity: activePageIndex !== lastPage ? 1 : 0.5 }}
      >
        <img src={ChevronRight} />
      </div>
    </div>
  );
};
export default Pagination;
