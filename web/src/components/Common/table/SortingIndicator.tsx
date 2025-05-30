import React from 'react'
import { SortDirection } from '@tanstack/react-table'

export function SortingIndicator({ sorted }: { sorted: false | SortDirection }) {
  return <>{sorted ? sorted === 'desc' ? <SortedDescending /> : <SortedAscending /> : <NotSorted />}</>
}

export function SortedDescending() {
  return <div aria-label="sorted descending" className="bi bi-sort-down"></div>
}

export function SortedAscending() {
  return <div aria-label="sorted ascending" className="bi bi-sort-down-alt"></div>
}

export function NotSorted() {
  return <div aria-label="not sorted" className="bi bi-filter"></div>
}
