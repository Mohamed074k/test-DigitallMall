import { useState } from "react";
import CommissionCard from "../../../components/SUPER_ADMIN_COMPONENTS/CommissionComponents/CommisionCard";
import { BrandCommissionList } from "../../../components/SUPER_ADMIN_COMPONENTS/CommissionComponents/BrandCommissionsList";
import { DesignerCommissionList } from "../../../components/SUPER_ADMIN_COMPONENTS/CommissionComponents/DesignerCommissionList";
import BrandCommissionEdit from "../../../components/SUPER_ADMIN_COMPONENTS/CommissionComponents/BrandCommissionEdit";
import DesignerCommissionEdit from "../../../components/SUPER_ADMIN_COMPONENTS/CommissionComponents/DesignerCommissionEdit";

const Financial_Commission = () => {
  const [globalCommission, setGlobalCommission] = useState(10);

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brands, setBrands] = useState([
    { id: 1, name: "Nike", commission: 10 },
    { id: 2, name: "Adidas", commission: 12 },
    { id: 3, name: "Puma", commission: 8 },
  ]);

  const [selectedDesigner, setSelectedDesigner] = useState(null);
  const [designers, setDesigners] = useState([
    { id: 1, name: "Virgil Abloh", commission: 15 },
    { id: 2, name: "Alexander Wang", commission: 18 },
    { id: 3, name: "Raf Simons", commission: 20 },
    { id: 4, name: "Tom Ford", commission: 17 },
    { id: 5, name: "Donatella Versace", commission: 19 },
  ]);

  const handleEdit = (id) => {
    const brand = brands.find((b) => b.id === id);
    setSelectedBrand(brand);
  };

  const handleSave = (id, updatedData) => {
    setBrands((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updatedData } : b))
    );
  };

  const handleEditD = (id) => {
    const designer = designers.find((d) => d.id === id);
    setSelectedBrand(designer);
  };

  const handleSaveD = (id, updatedData) => {
    setDesigners((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updatedData } : d))
    );
  };

  return (
    <div className="mt-5 min-h-screen">
      <div className="w-2/3 mx-auto border-t border-gray-400/30 my-6"></div>

      <CommissionCard
        globalCommission={globalCommission}
        onChange={setGlobalCommission}
      />
      <div className="w-2/3 mx-auto border-t border-gray-400/30 my-6"></div>

      <BrandCommissionList brands={brands} onEdit={handleEdit} />
      {selectedBrand && (
        <BrandCommissionEdit
          brandData={selectedBrand}
          onSave={handleSave}
          onClose={() => setSelectedBrand(null)}
        />
      )}

      <DesignerCommissionList designers={designers} onEdit={handleEditD} />
      {selectedDesigner && (
        <DesignerCommissionEdit
          designerandData={selectedDesigner}
          onSave={handleSaveD}
          onClose={() => setSelectedDesigner(null)}
        />
      )}
    </div>
  );
};

export default Financial_Commission;
