import {
    Page,
    PAGE_START,
    Pageable,
    Pagination,
    paginationToPageable,
    Slice,
    Slicination,
    slicinationToPageable,
} from "@zxy-cn/pagination-model"
import {EffectCallback, useEffect, useState} from "react"

export class SlicinationState<T extends Slicination = Slicination>{
    protected readonly state

    constructor(slicination: T) {
        this.state = useState(slicination)
    }

    get value() {
        return this.state[0]
    }

    set value(slicination: T) {
        this.state[1](slicination)
    }

    get page() {
        return this.value.page
    }

    set page(page: number) {
        this.value = {
            ...this.value,
            page,
        }
    }

    get last() {
        return this.value.last
    }

    set last(last: boolean) {
        this.value = {
            ...this.value,
            last,
        }
    }

    get first() {
        return this.value.first
    }

    set first(first: boolean) {
        this.value = {
            ...this.value,
            first,
        }
    }

    get size() {
        return this.value.size
    }

    set size(size: number) {
        this.value = {
            ...this.value,
            size,
        }
    }

    get pageable() {
        return slicinationToPageable(this.value)
    }

    updateFromSlice(slice: Slice<any>) {
        this.value = {
            ...this.value,
            last: slice.last,
            first: slice.first,
        }
    }
}

export class PaginationState extends SlicinationState<Pagination>{

    constructor(pagination: Pagination) {
        super(pagination)
    }

    get total() {
        return this.value.total
    }

    set total(total: number) {
        this.value = {
            ...this.value,
            total,
        }
    }

    get pageable() {
        return paginationToPageable(this.value)
    }

    updateFromPage(page: Page<any>) {
        this.value = {
            ...this.value,
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
