import React, { useState } from "react";
import { CheckCheck } from "lucide-react";
import { useDesignRequests } from "../../../context/designerContext/DesignRequestContext";
import { useDesignSubmissions } from "../../../context/designerContext/DesignSubmissionContext";

import AddSubmissionModal from "../../../components/DESIGNERS_ADMIN_COMPONENTS/SubmissionsComponents/AddSubmissonButton";
import SubmissionsTable from "../../../components/DESIGNERS_ADMIN_COMPONENTS/SubmissionsComponents/SubmissionsTable";
import SearchBar from "../../../components/DESIGNERS_ADMIN_COMPONENTS/SubmissionsComponents/SearchBar";

const Designs_Submission = () => {
  const { designRequests } = useDesignRequests();
  const { submissions, addSubmission } = useDesignSubmissions();
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle Save from Modal
  const handleSaveSubmission = (newSubmission) => {
    addSubmission(newSubmission);
  };

  const filteredSubmissions = submissions.filter(
    (sub) =>
      sub.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.designName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <p className="flex items-center text-xl lg:text-3xl font-semibold text-gray-900/50">
          <CheckCheck
            size={22}
            className="text-gray-900/30 mt-1 animate-bounce"
          />
          <span className="text-gray-900 pl-4">Designs</span>&nbsp;Submissions
        </p>
      </div>
      <div className="bg-gray-100/50 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Search on the left */}
          <div className="flex-1 w-full md:w-auto ">
            <SearchBar
              searchTerm={searchQuery}
              setSearchTerm={setSearchQuery}
            />
          </div>

          {/* Button on the right */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <AddSubmissionModal
              show={showModal}
              onClose={() => setShowModal(false)}
              onSave={handleSaveSubmission}
              requests={designRequests || []}
            />
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 w-full !bg-black text-white !rounded-lg font-[poppins] hover:!bg-black/80 duration-300"
            >
              + Add Submission
            </button>
          </div>
        </div>
      </div>
      {/* Table */}
      <SubmissionsTable
        submissions={filteredSubmissions}
        onDelete={(id) => deleteSubmission(id)}
      />{" "}
    </div>
  );
};

export default Designs_Submission;
