"use client";

import { PaginationProps } from "@/types";

const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <ul className="pagination flex gap-4 items-center justify-center mt-5">
          {pageNumbers.map((number) => (
            <li 
            key={number} 
            className={`${currentPage === number ? 'active text-red-500' : ''}
            p-3 rounded-lg shadow-md`}>
              <a href="#" onClick={() => onPageChange(number)}>
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  
  export default Pagination;