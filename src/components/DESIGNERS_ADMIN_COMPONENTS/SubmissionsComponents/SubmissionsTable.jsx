import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

function SubmissionsTable({ submissions = [], onDelete }) {
  // handle delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This submission will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete?.(id);
        toast.success("Submission deleted successfully");
      }
    });
  };

  return (
    <div className="font-[poppins]">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Submission ID</th>
              <th className="px-4 py-3 text-left">Client Name</th>
              <th className="px-4 py-3 text-left">Design Name</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Submission Date</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s) => (
              <tr
                key={s.id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-3">{s.id}</td>
                <td className="px-4 py-3">{s.clientName}</td>
                <td className="px-4 py-3">{s.designName}</td>
                <td className="px-4 py-3">{s?.description || "---"}</td>
                <td className="px-4 py-3">{s.date}</td>
                <td className="px-4 py-3 flex items-center justify-center gap-3">
                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/201234567890?text=Hello ${s.clientName}, regarding your submission ${s.designName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="!text-green-600 hover:!text-green-700 transition"
                  >
                    <FaWhatsapp size={22} />
                  </a>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
            {submissions.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-gray-500 italic"
                >
                  No submissions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile / Tablet Cards */}
      <div className="grid grid-cols-1 gap-4 md:hidden mt-4">
        {submissions.map((s) => (
          <div
            key={s.id}
            className="border rounded-lg shadow-md p-4 bg-white flex flex-col gap-3"
          >
            <div>
              <span className="font-semibold text-gray-700">
                Submission ID:
              </span>{" "}
              {s.id}
            </div>
            <div>
              <span className="font-semibold text-gray-700">Client Name:</span>{" "}
              {s.clientName}
            </div>
            <div>
              <span className="font-semibold text-gray-700">Design Name:</span>{" "}
              {s.designName}
            </div>
            <div>
              <span className="font-semibold text-gray-700">Description:</span>{" "}
              {s?.description || "---"}{" "}
            </div>
            <div>
              <span className="font-semibold text-gray-700">Date:</span>{" "}
              {s.date}
            </div>

            {/* Actions */}
            <div className="flex justify-end items-center gap-3 pt-2">
              <a
                href={`https://wa.me/201234567890?text=Hello ${s.clientName}, regarding your submission ${s.designName}`}
                target="_blank"
                rel="noopener noreferrer"
                className="!text-green-600 hover:!text-green-700 transition"
              >
                <FaWhatsapp size={22} />
              </a>

              <button
                onClick={() => handleDelete(s.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
        {submissions.length === 0 && (
          <p className="text-center text-gray-500 italic">
            No submissions found
          </p>
        )}
      </div>
    </div>
  );
}

export default SubmissionsTable;
