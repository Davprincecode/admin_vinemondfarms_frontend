import React from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
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
const AdminPagination: React.FC<PaginationProps> = ({ meta, onPageChange }) =>{
    const pages = Array.from({ length: meta.last_page }, (_, i) => i + 1);


  return (
    <div className="admin-shop-footer flex-center justification-between">
                             
                             {/* <div className="page-con flex-center gap-10">
        <p>Showing</p>
        <select
          value={meta.per_page}
          onChange={(e) => onPerPageChange?.(parseInt(e.target.value))}
        >
          {[10, 20, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <p>of {meta.total}</p>
      </div>
             */}
                           <div className="pagination-number flex-center">

                            {/* Prev button */}
        
        <div
          className={`pagination-num-arrow ${!meta.prev_page_url && "opacity-40 cursor-not-allowed"}`}
          onClick={() => meta.prev_page_url && onPageChange(meta.current_page - 1)}
        >
          <IoIosArrowBack />
        </div>
                           

                             {pages.map((page) => {
            const isActive = page === meta.current_page;
            

            return (
              <div
                key={page}
                className={`pagination-num ${
                  isActive
                    ? "pagination-active"
                    : ""
                }`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </div>
            );
          })}
                          
                      <div className="pagination-num-arrow" onClick={() => meta.next_page_url && onPageChange(meta.current_page + 1)}><IoIosArrowForward /></div>
                           </div>
            
            </div>
  )
}

export default AdminPagination