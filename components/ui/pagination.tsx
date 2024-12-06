import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  const generatePages = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;
    
    if (showEllipsis) {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    } else {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className={cn("flex items-center justify-center gap-3", className)}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={cn(
          "hidden sm:flex h-10 w-10 transition-all duration-200",
          "border-bistre/20 hover:border-bistre hover:bg-bistre/5",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        )}
      >
        <ChevronsLeft className="h-4 w-4 text-bistre/70" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "h-10 w-10 transition-all duration-200",
          "border-bistre/20 hover:border-bistre hover:bg-bistre/5",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        )}
      >
        <ChevronLeft className="h-4 w-4 text-bistre/70" />
      </Button>

      <div className="flex gap-2 items-center">
        {generatePages().map((page, index) => (
          page === '...' ? (
            <span 
              key={`ellipsis-${index}`} 
              className="w-8 text-center text-sm font-medium text-white/"
            >
              ⋯
            </span>
          ) : (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => onPageChange(page as number)}
              className={cn(
                "hidden sm:flex h-10 w-10 p-0 text-sm font-medium transition-all duration-200",
                currentPage === page
                  ? "bg-bistre text-vanilla hover:bg-bistre/90 shadow-sm"
                  : "border-bistre/20 hover:border-bistre hover:bg-bistre/5 text-bistre/70 hover:text-bistre"
              )}
            >
              {page}
            </Button>
          )
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "h-10 w-10 transition-all duration-200",
          "border-bistre/20 hover:border-bistre hover:bg-bistre/5",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        )}
      >
        <ChevronRight className="h-4 w-4 text-bistre/70" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={cn(
          "hidden sm:flex h-10 w-10 transition-all duration-200",
          "border-bistre/20 hover:border-bistre hover:bg-bistre/5",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        )}
      >
        <ChevronsRight className="h-4 w-4 text-bistre/70" />
      </Button>

      <div className="text-sm font-medium text-bistre/60 ml-2">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
} 