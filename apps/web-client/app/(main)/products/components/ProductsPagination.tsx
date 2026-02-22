import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";


export function ProductsPagination() {
    return (
        <Pagination dir="rtl" className="mt-16 lg:pt-6 mb-16 lg:border-t ">
            <PaginationContent className="w-full justify-between items-center flex">
                <PaginationItem >
                    <PaginationPrevious href="#" />
                </PaginationItem>

                <div className="flex items-center gap-2">

                    <PaginationItem>
                        <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationLink href="#" >
                            2
                        </PaginationLink>
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationLink >...</PaginationLink>
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationLink href="#">100</PaginationLink>
                    </PaginationItem>

                </div>

                <PaginationItem >
                    <PaginationNext href="#" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}