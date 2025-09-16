import React, { useState } from "react";
import { FaWhatsapp, FaInfoCircle } from "react-icons/fa";
import { Camera, ChevronsLeft } from "lucide-react";

export default function ReelsPerformance() {
  const [selectedModel, setSelectedModel] = useState(null);

  const models = [
    {
      id: 1,
      name: "Ahmed Tarek",
      joinDate: "2024-01-10",
      reels: 3,
      likes: 1200,
      shares: 300,
      phone: "201234567890",
      reelsList: [
        {
          id: 1,
          name: "Fashion Reel",
          publishDate: "2024-02-01",
          likes: 500,
          shares: 120,
        },
        {
          id: 2,
          name: "Runway Highlights",
          publishDate: "2024-02-15",
          likes: 400,
          shares: 100,
        },
        {
          id: 3,
          name: "Behind the Scenes",
          publishDate: "2024-03-01",
          likes: 300,
          shares: 80,
        },
      ],
    },
    {
      id: 2,
      name: "Mohamed Elsayed",
      joinDate: "2024-02-15",
      reels: 2,
      likes: 850,
      shares: 150,
      phone: "201098765432",
      reelsList: [
        {
          id: 1,
          name: "Photo Session Reel",
          publishDate: "2024-03-10",
          likes: 500,
          shares: 100,
        },
        {
          id: 2,
          name: "Studio Vlog",
          publishDate: "2024-03-20",
          likes: 350,
          shares: 50,
        },
      ],
    },
    {
      id: 1,
      name: "Ahmed Tarek",
      joinDate: "2024-01-10",
      reels: 3,
      likes: 1200,
      shares: 300,
      phone: "201234567890",
      reelsList: [
        {
          id: 1,
          name: "Fashion Reel",
          publishDate: "2024-02-01",
          likes: 500,
          shares: 120,
        },
        {
          id: 2,
          name: "Runway Highlights",
          publishDate: "2024-02-15",
          likes: 400,
          shares: 100,
        },
        {
          id: 3,
          name: "Behind the Scenes",
          publishDate: "2024-03-01",
          likes: 300,
          shares: 80,
        },
      ],
    },
    {
      id: 2,
      name: "Mohamed Elsayed",
      joinDate: "2024-02-15",
      reels: 2,
      likes: 850,
      shares: 150,
      phone: "201098765432",
      reelsList: [
        {
          id: 1,
          name: "Photo Session Reel",
          publishDate: "2024-03-10",
          likes: 500,
          shares: 100,
        },
        {
          id: 2,
          name: "Studio Vlog",
          publishDate: "2024-03-20",
          likes: 350,
          shares: 50,
        },
      ],
    },
  ];

  return (
    <div className="mt-6 font-[poppins]">
      {!selectedModel ? (
        <>
          <div className="flex items-center text-3xl font-semibold text-gray-900/50 font-[poppins] mb-4">
            <Camera
              size={22}
              className="text-gray-900/30 mt-1 animate-bounce"
            />
            <span className="text-gray-900 pl-4">Reels</span>Report
          </div>
          {/* Header */}
          <div className="hidden lg:grid grid-cols-7 gap-4 font-semibold bg-gray-100 p-4 rounded-t-lg text-center text-gray-700">
            <div>ID</div>
            <div>Name</div>
            <div>Join Date</div>
            <div>Total Reels</div>
            <div>Total Likes</div>
            <div>Total Shares</div>
            <div>Actions</div>
          </div>

          {/* Rows */}
          <div className="divide-y border rounded-b-lg">
            {models.map((m) => (
              <div
                key={m.id}
                className="grid lg:grid-cols-7 gap-4 p-4 items-center hover:bg-gray-50 transition-all"
              >
                {/* Desktop layout */}
                <div className="hidden lg:block text-center font-medium">
                  {m.id}
                </div>
                <div className="hidden lg:block text-center font-semibold text-gray-600">
                  {m.name}
                </div>
                <div className="hidden lg:block text-center text-gray-600">
                  {m.joinDate}
                </div>
                <div className="hidden lg:block text-center">{m.reels}</div>
                <div className="hidden lg:block text-center">{m.likes}</div>
                <div className="hidden lg:block text-center">{m.shares}</div>
                <div className="hidden lg:flex justify-center gap-3">
                  <a
                    href={`https://wa.me/${m.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="!text-green-500 hover:!text-green-600 duration-300 text-2xl"
                  >
                    <FaWhatsapp />
                  </a>
                  <button
                    onClick={() => setSelectedModel(m)}
                    className="!text-blue-500 hover:!text-blue-600 duration-300 !text-xl"
                  >
                    <FaInfoCircle />
                  </button>
                </div>

                {/* Mobile layout */}
                <div className="lg:hidden space-y-3 text-sm">
                  <div>
                    <span className="font-semibold text-gray-600">ID:</span>{" "}
                    {m.id}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Name:</span>{" "}
                    {m.name}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">
                      Join Date:
                    </span>{" "}
                    {m.joinDate}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">
                      Total Reels:
                    </span>{" "}
                    {m.reels}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">
                      Total Likes:
                    </span>{" "}
                    {m.likes}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">
                      Total Shares:
                    </span>{" "}
                    {m.shares}
                  </div>
                  <div className="flex gap-3 mt-2">
                    <a
                      href={`https://wa.me/${m.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-500 hover:bg-green-600 duration-300 !no-underline text-white rounded-md p-2 text-center text-sm shadow-sm"
                    >
                      WhatsApp
                    </a>
                    <button
                      onClick={() => setSelectedModel(m)}
                      className="flex-1 !bg-blue-500 hover:!bg-blue-600 duration-300 text-white !rounded-md p-2 text-sm shadow-sm"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Back button */}
          <button
            onClick={() => setSelectedModel(null)}
            className="flex gap-2 mb-4 !bg-gray-300 hover:!bg-gray-400 duration-300 text-gray-800 px-4 py-2 !rounded-md"
          >
            <ChevronsLeft />
            Back to Models
          </button>

          {/* Reels Table */}
          <div className="hidden lg:grid grid-cols-4 gap-4 font-semibold bg-gray-100 p-4 rounded-t-lg text-center text-gray-700">
            <div>Name of Reel</div>
            <div>Publish Date</div>
            <div>Likes</div>
            <div>Shares</div>
          </div>
          <div className="divide-y  border rounded-b-lg">
            {selectedModel.reelsList.map((r) => (
              <div
                key={r.id}
                className="grid lg:grid-cols-4 gap-4 p-4 items-center hover:bg-gray-50 transition-all"
              >
                <div className="hidden lg:block text-center font-medium">
                  {r.name}
                </div>
                <div className="hidden lg:block text-center text-gray-600">
                  {r.publishDate}
                </div>
                <div className="hidden lg:block text-center">{r.likes}</div>
                <div className="hidden lg:block text-center">{r.shares}</div>

                {/* Mobile layout */}
                <div className="lg:hidden space-y-4 text-sm md:text-xl">
                  <div>
                    <span className="font-semibold text-gray-600">Name:</span>{" "}
                    {r.name}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">
                      Publish Date:
                    </span>{" "}
                    {r.publishDate}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Likes:</span>{" "}
                    {r.likes}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Shares:</span>{" "}
                    {r.shares}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
