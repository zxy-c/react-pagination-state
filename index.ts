import {
    Page,
    PAGE_START,
    Pageable,
    Pagination,
    paginationToPageable,
} from "@zxy-cn/pagination-model"
import {EffectCallback, useEffect, useState} from "react"

export class PaginationState {
    private readonly paginationState

    constructor(pagination: Pagination) {
        this.paginationState = useState(pagination)
    }

    get pagination() {
        return this.paginationState[0]
    }

    set pagination(pagination: Pagination) {
        this.paginationState[1](pagination)
    }

    get page() {
        return this.pagination.page
    }

    set page(page: number) {
        this.pagination = {
            ...this.pagination,
            page,
        }
    }

    get last() {
        return this.pagination.last
    }

    set last(last: boolean) {
        this.pagination = {
            ...this.pagination,
            last,
        }
    }

    get first() {
        return this.pagination.first
    }

    set first(first: boolean) {
        this.pagination = {
            ...this.pagination,
            first,
        }
    }

    get size() {
        return this.pagination.size
    }

    set size(size: number) {
        this.pagination = {
            ...this.pagination,
            size,
        }
    }

    get total() {
        return this.pagination.total
    }

    set total(total: number) {
        this.pagination = {
            ...this.pagination,
            total,
        }
    }

    get pageable() {
        return paginationToPageable(this.pagination)
    }

    updateFromPage(page: Page<any>) {
        this.pagination = {
            ...this.pagination,
            total: page.totalElements,
            last: page.last,
            first: page.first,
        }
    }
}

export function getPageableDependencyList(pageable: Pageable) {
    return [pageable.page, pageable.size]
}

export function usePageableChange(effect: EffectCallback, pageable: Pageable) {
    useEffect(effect, getPageableDependencyList(pageable))
}
