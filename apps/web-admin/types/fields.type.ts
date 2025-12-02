// TODO @reza: Refactor this to use a global pagination interface for consistency across models.
// REVIEW COMMENT: Currently, 'Field' has its own pagination structure. Consider creating a reusable Pagination type 
// that can be applied to any model to avoid duplication and improve maintainability.
export interface Field {
    meta: {
        total: number
        page: number
        limit: number
        totalPages: number
        links: {
            first: string
            last: string
            next?: string
        }
    }
    data: {
        id: number
        cuid: string
        name: string
        title: string
        type: "TEXT" | "NUMBER" | "CHECKBOX" | "DATE" | "RADIO" | "SELECT" | "TEXTAREA" | "FILE"
        required: boolean
        order: number
        step: number
        categoryId: number | null
        target: "MATERIAL_BOOK" | "OTHER_TARGET"
        createdAt: string
        updatedAt: string
    }[]
}
