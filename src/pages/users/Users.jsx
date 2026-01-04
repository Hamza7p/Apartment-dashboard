import TitleBar from '@/components/layouts/TitleBar'
import { Container } from '@mui/material'
import { t } from 'i18next'
import React, { useState, useEffect } from 'react'
import FilterBar from './FilterBar'
import UsersTable from './UsersTable'
import { useUsers } from '@/hooks/api/useUsers'
import { useSearchParams } from 'react-router'
import CreateUserDialog from '@/components/users/CreateUserDialog'

const Users = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = useState(parseInt(searchParams.get('page')) || 0)
  const [pageSize, setPageSize] = useState(parseInt(searchParams.get('perPage')) || 10)
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all')
  const [searchKeyword, setSearchKeyword] = useState(searchParams.get('keyword') || '')
  const highlightUserId = searchParams.get('highlightUserId')
  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  // Build filters
  const filters = []
  if (statusFilter && statusFilter !== 'all') {
    filters.push({
      name: 'status',
      operation: 'eq',
      value: parseInt(statusFilter),
    })
  }

  // Build query options
  const queryOptions = {
    filters,
    page,
    perPage: pageSize,
  }

  // Add keyword search if provided
  if (searchKeyword) {
    queryOptions.keyword = searchKeyword
  }

  const { data: users, isLoading, error } = useUsers(queryOptions)

  const handleAddUser = () => {
    setCreateDialogOpen(true)
  }

  const handlePageChange = (newPage, newPageSize) => {
    const updatedPage = newPageSize !== pageSize ? 0 : newPage
    setPage(updatedPage)
    if (newPageSize !== pageSize) {
      setPageSize(newPageSize)
    }
    updateSearchParams(updatedPage, newPageSize, statusFilter, searchKeyword)
  }

  const handleStatusFilter = (status) => {
    setStatusFilter(status)
    setPage(0)
    updateSearchParams(0, pageSize, status, searchKeyword)
  }

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword)
    setPage(0)
    updateSearchParams(0, pageSize, statusFilter, keyword)
  }

  const updateSearchParams = (page, perPage, status, keyword) => {
    const params = new URLSearchParams()
    if (page > 0) params.set('page', page)
    if (perPage !== 10) params.set('perPage', perPage)
    if (status && status !== 'all') params.set('status', status)
    if (keyword) params.set('keyword', keyword)
    setSearchParams(params)
  }

  // Sync with URL params on mount
  useEffect(() => {
    const urlPage = parseInt(searchParams.get('page')) || 0
    const urlPageSize = parseInt(searchParams.get('perPage')) || 10
    const urlStatus = searchParams.get('status') || 'all'
    const urlKeyword = searchParams.get('keyword') || ''

    setPage(urlPage)
    setPageSize(urlPageSize)
    setStatusFilter(urlStatus)
    setSearchKeyword(urlKeyword)
  }, [searchParams])

  return (
    <Container>
      <TitleBar title={t("pages.users")} buttonTitle={t('users.addUser')} onClick={handleAddUser} />
      <FilterBar
        statusFilter={statusFilter}
        searchKeyword={searchKeyword}
        onStatusFilter={handleStatusFilter}
        onSearch={handleSearch}
      />
      <UsersTable
        users={users}
        loading={isLoading}
        error={error}
        onPageChange={handlePageChange}
        highlightUserId={highlightUserId ? parseInt(highlightUserId) : null}
      />
      <CreateUserDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
      />
    </Container>
  )
}

export default Users