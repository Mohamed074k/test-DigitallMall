import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

export default function AddProductModal({ isOpen, onClose, onSave }) {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    status: "Active",
    image: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(newProduct);
    setNewProduct({
      name: "",
      price: "",
      stock: "",
      category: "",
      status: "Active",
      image: "",
      description: "",
    });
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className=" font-[poppins] ">
          Add New Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "white" }}>
        <Form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="font-[poppins] mb-3">
            <Form.Control
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30"
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              required
            />
          </div>

          {/* Price */}
          <div className="font-[poppins] mb-3">
            <Form.Control
              type="number"
              step="0.01"
              placeholder="Price"
              value={newProduct.price}
              className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30"
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              required
            />
          </div>

          {/* Stock */}
          <div className="font-[poppins] mb-3">
            <Form.Control
              type="number"
              placeholder="Stock"
              value={newProduct.stock}
              className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30"
              onChange={(e) =>
                setNewProduct({ ...newProduct, stock: e.target.value })
              }
              required
            />
          </div>

          {/* Category */}
          <div className="font-[poppins] mb-3">
            <Form.Select
              value={newProduct.category}
              className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30"
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
              required
            >
              <option value="">Select Category</option>
              <option value="T-Shirts">T-Shirts</option>
              <option value="Hoodies">Hoodies</option>
              <option value="Caps">Caps</option>
              <option value="Mugs">Mugs</option>
            </Form.Select>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between mb-4 font-[poppins]">
            <label className="text-gray-700">Active</label>
            <button
              type="button"
              onClick={() =>
                setNewProduct({
                  ...newProduct,
                  status: newProduct.status === "Active" ? "Inactive" : "Active",
                })
              }
              className={`relative inline-flex h-6 w-11 items-center !rounded-full transition-colors duration-300 ${
                newProduct.status === "Active" ? "bg-green-500" : "bg-gray-400"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform !rounded-full bg-white transition-transform duration-300 ${
                  newProduct.status === "Active" ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Image URL */}
          <div className="font-[poppins] mb-3">
            <Form.Control
              type="text"
              placeholder="Image URL"
              value={newProduct.image}
              className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30"
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              required
            />
          </div>

          {/* Description */}
          <div className="font-[poppins] mb-3">
            <Form.Control
              as="textarea"
              placeholder="Description"
              value={newProduct.description}
              className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30"
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              rows="4"
            />
          </div>

          <Button
            type="submit"
            className="w-full p-2 !font-[poppins] !bg-black duration-300"
          >
            Add Product
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}