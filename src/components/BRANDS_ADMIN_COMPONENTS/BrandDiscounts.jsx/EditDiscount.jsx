// src/components/BRANDS_ADMIN_COMPONENTS/BrandDiscounts.jsx/EditDiscount.jsx
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useBrandProducts } from "../../../context/BrandContext/BrandProductsContext";
import { CheckCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function EditDiscount({ discountData, onSave, onClose }) {
  const { products } = useBrandProducts();
  const [productsIds, setProductsIds] = useState(
    discountData.productsIds || []
  );

  const [discount, setDiscount] = useState(discountData.discount);
  const [startDate, setStartDate] = useState(discountData.startDate || "");
  const [endDate, setEndDate] = useState(discountData.endDate || "");
  const [status, setStatus] = useState(discountData.status);
  const [search, setSearch] = useState("");

  const toggleProductSelect = (id) => {
    setProductsIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(discountData.id, {
      ...discountData,
      discount,
      startDate,
      endDate,
      status,
      productsIds,
    });

    toast.success("Discount updated successfully!");

    onClose();
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Modal show={true} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Edit Discount</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "white" }}>
        <Form onSubmit={handleSubmit}>
          {/* Discount Value */}
          <div className="font-[poppins] mb-3">
            <Form.Control
              type="text"
              placeholder="Discount %"
              value={discount}
              className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30"
              onChange={(e) => setDiscount(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between md:gap-3">
            {/* start date */}
            <div className="font-[poppins] mb-3 md:w-1/2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Start Date
              </label>
              <Form.Control
                type="date"
                placeholder="Start Date"
                value={startDate}
                className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30 shadow-md cursor-pointer"
                onChange={(e) => setStartDate(e.target.value)}
                onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                required
              />
            </div>

            {/* end date */}
            <div className="font-[poppins] mb-3 md:w-1/2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                End Date
              </label>
              <Form.Control
                type="date"
                placeholder="End Date"
                value={endDate}
                className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30 shadow-md cursor-pointer"
                onChange={(e) => setEndDate(e.target.value)}
                onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                required
              />
            </div>
          </div>

          {/* Switch status */}
          <div className="flex items-center justify-between mb-4">
            <label className="text-gray-600 font-bold font-[poppins]">
              Active
            </label>
            <button
              type="button"
              onClick={() =>
                setStatus(status === "active" ? "inactive" : "active")
              }
              className={`relative inline-flex h-6 w-11 items-center !rounded-full transition-colors duration-300 ${
                status === "active" ? "bg-green-500" : "bg-gray-400"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform !rounded-full bg-white transition-transform duration-300 ${
                  status === "active" ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="w-2/3 mx-auto border-t border-gray-400/30 my-6"></div>

          {/* Products IDs */}
          <label className="block text-sm font-medium text-gray-600 mb-3">
            Products
          </label>
          {/* search bar */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded-md outline-none focus:border-gray-800/40 shadow-md"
          />
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto mb-4 text-[11px]">
            {filteredProducts.map((p) => {
              const isSelected = productsIds.includes(p.id);
              return (
                <div
                  key={p.id}
                  onClick={() => toggleProductSelect(p.id)}
                  className={`relative cursor-pointer rounded-lg p-3 flex flex-col items-center justify-center transition-all duration-300 !border-3 shadow-md ${
                    isSelected
                      ? "!border-green-500 "
                      : "!border-gray-300 hover:!border-gray-500"
                  }`}
                >
                  <span className="text-sm text-center font-medium">
                    {p.name}
                  </span>

                  {/* أيقونة الصح */}
                  {isSelected && (
                    <CheckCircle
                      className="absolute bottom-2 right-2 text-green-500 transition-transform duration-300 scale-110"
                      size={15}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <Button
            type="submit"
            className="w-full p-2 !font-[poppins] !bg-gray-900 hover:!bg-gray-900/80 duration-300"
          >
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
