import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useBrandProducts } from "../../../context/BrandContext/BrandProductsContext";
import { CheckCircle } from "lucide-react";

export default function AddDiscount({ onAdd }) {
  const [show, setShow] = useState(false);
  const [discount, setDiscount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [search, setSearch] = useState("");

  const { products } = useBrandProducts();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!discount.trim()) return;

    onAdd({
      id: Date.now(),
      discount,
      status: "active",
      startDate: startDate || null,
      endDate: endDate || null,
      productsIds: selectedProducts,
    });

    toast.success("Discount added successfully!");

    setDiscount("");
    setStartDate("");
    setEndDate("");
    setSelectedProducts([]);
    handleClose();
  };

  const toggleProductSelect = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  // فلترة بالبحث
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Button
        className="w-full sm:w-[250px]  p-2 !font-[poppins] !bg-gray-900 hover:!bg-gray-900/80 duration-300"
        onClick={handleShow}
      >
        Add Discount
      </Button>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Add Discount</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "white" }}>
          <Form onSubmit={handleSubmit}>
            {/* discount */}
            <div className="font-[poppins] mb-3">
              <Form.Control
                type="text"
                placeholder="Description"
                value={discount}
                className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30 shadow-md"
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

            {/* product selection */}
            <div className="font-[poppins] mb-3">
              <label className="block text-base font-semibold text-gray-700/80 mb-2">
                Select Products
              </label>

              {/* search bar */}
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full mb-4 p-2 border border-gray-300 rounded-md outline-none focus:border-gray-800/40 shadow-md"
              />

              {/* products grid */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 max-h-[300px] overflow-y-auto">
                {filteredProducts.map((p) => {
                  const isSelected = selectedProducts.includes(p.id);
                  return (
                    <div
                      key={p.id}
                      onClick={() => toggleProductSelect(p.id)}
                      className={`relative cursor-pointer  rounded-lg p-3 flex flex-col items-center justify-center transition-all duration-300 !border-3 shadow-md ${
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
            </div>

            <Button
              type="submit"
              className="mt-4 w-full p-2 !font-[poppins] !bg-gray-900 hover:!bg-gray-900/80 duration-300"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
