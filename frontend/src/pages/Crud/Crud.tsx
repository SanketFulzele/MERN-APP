import { useEffect, useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { Container, Button, Modal, Form, Card } from "react-bootstrap";
import { Pencil, Trash2, Plus } from "lucide-react";
import axios from "axios";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./Crud.css";

import { showError, showSuccess } from "../../components/ToastProvider/toastService";

ModuleRegistry.registerModules([AllCommunityModule]);

interface User {
  id: number;
  name: string;
  email: string;
  country: string;
}

// Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/route",
});

const Crud = () => {
  const [rowData, setRowData] = useState<User[]>([]);
  const [formData, setFormData] = useState<User>({
    id: 0,
    name: "",
    email: "",
    country: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch customers
  const fetchCustomers = async () => {
    try {
      const { data } = await api.get("/customer-list");
      setRowData(data);
    } catch (error) {
      showError("Failed to fetch customers");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Open Add
  const openAddModal = () => {
    setIsEdit(false);
    setFormData({ id: 0, name: "", email: "", country: "" });
    setShowModal(true);
  };

  // Open Edit
  const openEditModal = (user: User) => {
    setIsEdit(true);
    setFormData(user);
    setShowModal(true);
  };

  // Save (Add / Edit)
  const handleSave = async () => {
    if (!formData.name || !formData.email || !formData.country) {
      showError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      let res;

      if (isEdit) {
        res = await api.post(`/edit-customer/${formData.id}`, formData);
      } else {
        res = await api.post(`/add-customer`, formData);
      }

      showSuccess(res.data.message);
      fetchCustomers();
      setShowModal(false);

    } catch (error: any) {
      showError(error?.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  // Delete
  const handleDelete = async (id: number) => {
    try {
      const { data } = await api.post(`/delete-customer/${id}`);
      showSuccess(data.message);
      fetchCustomers();
    } catch (error: any) {
      showError(error?.response?.data?.message || "Delete failed");
    }
  };

  // Columns (memoized)
  const columnDefs = useMemo(() => [
    { headerName: "Name", field: "name", flex: 1 },
    { headerName: "Email", field: "email", flex: 1.5 },
    { headerName: "Country", field: "country", flex: 1 },
    {
      headerName: "Actions",
      flex: 1,
      cellRenderer: (params: { data: User }) => (
        <div className="grid-actions">
          <Button
            size="sm"
            className="edit-btn"
            onClick={() => openEditModal(params.data)}
          >
            <Pencil size={16} />
          </Button>

          <Button
            size="sm"
            className="delete-btn"
            onClick={() => handleDelete(params.data.id)}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      ),
    },
  ], []);

  return (
    <Container className="crud-wrapper">
      <Card className="crud-card">
        <div className="crud-header">
          <h4>User Management</h4>

          <Button className="add-btn" onClick={openAddModal}>
            <Plus size={18} /> Add User
          </Button>
        </div>

        <div className="ag-theme-alpine custom-grid">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            pagination
            paginationPageSize={5}
            rowHeight={35}
            headerHeight={35}
          />
        </div>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEdit ? "Edit User" : "Add User"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Country</Form.Label>
            <Form.Control
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>

          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : isEdit ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Crud;