import React, { useEffect, useState } from "react"
import api from "../../api/axios"
import { Table } from "react-bootstrap"

import "./User.css"
import { showError, showSuccess } from "../../components/ToastProvider/toastService"

interface UserType {
  _id: string
  name: string
  email: string
}

const User = () => {
  const [rowData, setRowData] = useState<UserType[]>([])
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModal, setIsDeleteModal] = useState(false)

  const [editingUser, setEditingUser] = useState<UserType | null>(null)
  const [deleteId, setDeleteId] = useState<string>("")

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const res = await api.get("/mern/all-user")
      setRowData(res.data || [])
    } catch (err: any) {
      showError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const openAddModal = () => {
    setEditingUser(null)
    setName("")
    setEmail("")
    setIsModalOpen(true)
  }

  const openEditModal = (data: UserType) => {
    setEditingUser(data)
    setName(data.name)
    setEmail(data.email)
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingUser) {
        await api.put(`/mern/edit-user/${editingUser._id}`, {
          name,
          email,
        })

        showSuccess("User updated successfully")
      } else {
        await api.post("/mern/add-user", {
          name,
          email,
        })
        showSuccess("User added successfully")
      }

      setIsModalOpen(false)
      fetchUsers()
    } catch (err: any) {
      showError(err?.response?.data?.message || err.message)
    }
  }

  const openDeleteModal = (id: string) => {
    setDeleteId(id)
    setIsDeleteModal(true)
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/mern/delete-user/${deleteId}`)

      showSuccess("User deleted successfully")

      setIsDeleteModal(false)
      fetchUsers()
    } catch (err: any) {
      showError(err?.response?.data?.message || err.message)
    }
  }

  return (
    <div className="user-page__root">
      <div className="user-page__header">
        <div className="user-page__title-section">
          <div className="user-page__title-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
            </svg>
          </div>
          <div>
            <h2>User Management</h2>
            <p>Manage your users efficiently</p>
          </div>
        </div>

        <button className="user-page__header-add-button" onClick={openAddModal}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor"/>
          </svg>
          Add User
        </button>
      </div>

      {loading && (
        <div className="user-page__loader-overlay">
          <div className="user-page__loader-spinner"></div>
          <p>Loading users...</p>
        </div>
      )}

      <div className="user-page__grid-container">
        <div className="user-page__grid-panel">
          <Table responsive striped bordered hover className="user-page__table mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rowData.length === 0 ? (
                <tr>
                  <td colSpan={3} className="user-page__empty-state">
                    No users found.
                  </td>
                </tr>
              ) : (
                rowData.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <div className="user-page__grid-actions">
                        <button
                          className="user-page__grid-button--edit"
                          onClick={() => openEditModal(user)}
                        >
                          Edit
                        </button>

                        <button
                          className="user-page__grid-button--delete"
                          onClick={() => openDeleteModal(user._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </div>

      {isModalOpen && (
        <div className="user-page__modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="user-page__modal-panel" onClick={(e) => e.stopPropagation()}>
            <div className="user-page__modal-header">
              <div className="user-page__modal-icon">
                {editingUser ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="currentColor"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor"/>
                  </svg>
                )}
              </div>
              <h3>{editingUser ? "Edit User" : "Add New User"}</h3>
              <button className="user-page__modal-close" onClick={() => setIsModalOpen(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="user-page__input-group">
                <label>Full Name</label>
                <div className="user-page__input-wrapper">
                  <svg className="user-page__input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
                  </svg>
                  <input
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="user-page__input-group">
                <label>Email Address</label>
                <div className="user-page__input-wrapper">
                  <svg className="user-page__input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
                  </svg>
                  <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="user-page__modal-actions">
                <button type="button" className="user-page__modal-button--cancel" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="user-page__modal-button--save">
                  {editingUser ? "Update User" : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModal && (
        <div className="user-page__modal-backdrop" onClick={() => setIsDeleteModal(false)}>
          <div className="user-page__modal-panel--delete" onClick={(e) => e.stopPropagation()}>
            <div className="user-page__delete-icon-wrapper">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
              </svg>
            </div>
            <p>Are you sure you want to delete this user?</p>
            <p className="user-page__delete-warning">This action cannot be undone.</p>

            <div className="user-page__modal-actions">
              <button type="button" className="user-page__modal-button--cancel" onClick={() => setIsDeleteModal(false)}>
                Cancel
              </button>
              <button className="user-page__modal-button--delete" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default User