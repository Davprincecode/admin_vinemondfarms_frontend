import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface Meta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

type PaginationProps = {
  meta: Meta;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ meta, onPageChange }) => {
  const pages = Array.from({ length: meta.last_page }, (_, i) => i + 1);

  return (
    <div className="paginationCon">
      <div className="paginationFlex flex-center gap-10">

        {/* Prev button */}
        
        <div
          className={`paginationArrow ${!meta.prev_page_url && "opacity-40 cursor-not-allowed"}`}
          onClick={() => meta.prev_page_url && onPageChange(meta.current_page - 1)}
        >
          <IoIosArrowBack />
        </div>

        {/* Page numbers */}
        <div className="paginationNumber flex-center gap-10">
          {pages.map((page) => {
            const isActive = page === meta.current_page;
            const isNext = page === meta.current_page + 1;

            return (
              <div
                key={page}
                className={`pagination ${
                  isActive
                    ? "paginationActive"
                    : isNext
                    ? "paginationNext"
                    : ""
                }`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </div>
            );
          })}
        </div>

        {/* Next button */}
        <div
          className={`paginationArrow ${!meta.next_page_url && "opacity-40 cursor-not-allowed"}`}
          onClick={() => meta.next_page_url && onPageChange(meta.current_page + 1)}
        >
          <IoIosArrowForward />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
