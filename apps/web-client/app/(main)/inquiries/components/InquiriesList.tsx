import { inquiries } from "./enquiries.data";
import { InquiryCard } from "./InquiryCard";


export function InquiriesList() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3  lg:gap-4 lg:gap-y-6 w-full">
            {inquiries.map((inquiry) => (
                <InquiryCard key={inquiry.id} inquiry={inquiry} />
            ))}
        </div>
    );
}