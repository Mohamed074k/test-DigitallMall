import { createContext, useState, useContext } from "react";
import { useDesignRequests } from "./DesignRequestContext"; // هنا نربط الاتنين

const DesignSubmissionContext = createContext();

export const DesignSubmissionProvider = ({ children }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // هنستعمل requests هنا
  const { designRequests } = useDesignRequests();

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      // mock data
      setSubmissions([
        {
          id: "sub1",
          requestId: "req1",
          date: "2025-09-01",
          clientName: "Client A",
          designName: "Logo Design",
          files: [{ id: 1, url: "/img1.png" }],
          description: "First draft",
        },
      ]);
    } catch (err) {
      setError("Failed to fetch submissions");
    } finally {
      setLoading(false);
    }
  };

  const addSubmission = async ({ requestId, files, description }) => {
    // نلاقي الـ request اللي يخص الـ submission
    const request = designRequests.find((r) => r.requestId === requestId);

    const newSubmission = {
      id: request ? request.requestId : "Unknown ID",
      requestId,
      date: new Date().toISOString().split("T")[0],
      clientName: request ? request.customerName : "Unknown Client",
      designName: request
        ? request.designDetails.customerNotes
        : "Unknown Design",
      files,
      description,
    };

    setSubmissions((prev) => [...prev, newSubmission]);
  };

  const deleteSubmission = (id) => {
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <DesignSubmissionContext.Provider
      value={{
        submissions,
        loading,
        error,
        fetchSubmissions,
        addSubmission,
        deleteSubmission,
      }}
    >
      {children}
    </DesignSubmissionContext.Provider>
  );
};

export const useDesignSubmissions = () => useContext(DesignSubmissionContext);
