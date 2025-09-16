import { createContext, useState, useEffect, useContext } from "react";
import { mockDesignRequests } from "../../data/mockDesignRequests";

const DesignRequestContext = createContext();

export const DesignRequestProvider = ({ children }) => {
  const [designRequests, setDesignRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(10);

  // Load mock data
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setDesignRequests(mockDesignRequests);
      } catch (err) {
        setError("Failed to fetch design requests");
        console.error("Error fetching design requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Approve request (Pending -> In Progress)
  const approveRequest = async (requestId) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setDesignRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.requestId === requestId
            ? { ...request, status: "In Progress" }
            : request
        )
      );
      return true;
    } catch (err) {
      console.error("Failed to approve request:", err);
      return false;
    }
  };

  // Reject request (Pending -> Rejected)
  const rejectRequest = async (requestId) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setDesignRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.requestId === requestId
            ? { ...request, status: "Rejected" }
            : request
        )
      );
      return true;
    } catch (err) {
      console.error("Failed to reject request:", err);
      return false;
    }
  };

  // Complete request (In Progress -> Completed)
  const completeRequest = async (requestId) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setDesignRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.requestId === requestId
            ? { ...request, status: "Completed" }
            : request
        )
      );
      return true;
    } catch (err) {
      console.error("Failed to complete request:", err);
      return false;
    }
  };

  // Delete request
  const deleteRequest = async (requestId) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setDesignRequests((prevRequests) =>
        prevRequests.filter((request) => request.requestId !== requestId)
      );
      return true;
    } catch (err) {
      console.error("Failed to delete request:", err);
      return false;
    }
  };

  // Filter requests
  const filterRequests = (filters) => {
    let filtered = designRequests;

    if (filters.status && filters.status !== "all") {
      filtered = filtered.filter(
        (request) => request.status === filters.status
      );
    }

    if (filters.searchTerm) {
      filtered = filtered.filter(
        (request) =>
          request.requestId
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase()) ||
          request.customerName
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  // Get current requests
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = designRequests.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );
  const totalPages = Math.ceil(designRequests.length / requestsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // View request details
  const viewRequestDetails = (request) => {
    setSelectedRequest(request);
    setShowRequestModal(true);
  };

  return (
    <DesignRequestContext.Provider
      value={{
        designRequests,
        loading,
        error,
        selectedRequest,
        showRequestModal,
        setShowRequestModal,
        currentRequests,
        currentPage,
        requestsPerPage,
        totalPages,
        paginate,
        filterRequests,
        viewRequestDetails,
        approveRequest,
        rejectRequest,
        completeRequest,
        deleteRequest,
      }}
    >
      {children}
    </DesignRequestContext.Provider>
  );
};

export const useDesignRequests = () => {
  const context = useContext(DesignRequestContext);
  if (!context) {
    throw new Error(
      "useDesignRequests must be used within a DesignRequestProvider"
    );
  }
  return context;
};
