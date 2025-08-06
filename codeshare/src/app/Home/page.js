"use client";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const baseUrl = "https://codeshare-backend-3vf9.onrender.com";

  console.log(baseUrl);
  const [showModal, setShowModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [codeID, setCodeID] = useState("");
  const [codeText, setCodeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const rings = [0, 1, 1.5, 2];

  const handleSave = async () => {
    if (!codeID.trim() || !codeText.trim()) {
      toast.error("Both Code ID and Code Text are required.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${baseUrl}/api/add-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codeId: codeID.trim(),
          codeText: codeText.trim(),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Code saved successfully!");
        setShowModal(false);
        setCodeID("");
        setCodeText("");
      } else {
        toast.error(result.message || "Something went wrong!");
      }
    } catch (err) {
      toast.error(err.message || "Failed to save code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchId.trim()) {
      toast.error("Please enter a Code ID to search.");
      return;
    }

    setLoading(true);
    setSearchResult("");

    try {
      const response = await fetch(
        `${baseUrl}/api/get-code/${searchId.trim()}`
      );
      const result = await response.json();

      if (response.ok) {
        setSearchResult(result.codeText);
      } else {
        toast.error(result.message || "Code not found!");
      }
    } catch (err) {
      toast.error("Failed to fetch code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(searchResult);
      toast.success("Code copied to clipboard!");
    } catch {
      toast.error("Failed to copy!");
    }
  };

  return (
    <>
      {/* Logo */}
      <div className="flex items-center justify-center my-5">
        <img
          src="/codeShare.png"
          alt="Code Share Logo"
          className="m-auto h-20"
        />
      </div>

      {/* Ripple Loader */}
      <div className="relative flex items-center justify-center w-[400px] m-auto h-[400px] bg-white overflow-hidden">
        {rings.map((i) => (
          <span
            key={i}
            className="absolute rounded-full border-4 border-green-900 opacity-30 animate-ripple"
            style={{
              width: `${120 + i * 100}px`,
              height: `${120 + i * 100}px`,
              animationDelay: `${i * 0.5}s`,
              boxShadow: `0 0 60px 5px #22c55e55`,
            }}
          ></span>
        ))}

        <span className="absolute w-16 h-16 bg-green-500 rounded-full shadow-lg flex items-center">
          <img
            src="/Center Logo.png"
            alt="Logo"
            className="w-full h-full m-auto cursor-pointer"
            onClick={() => setShowModal(true)}
          />
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-7 mt-10">
        <button
          className="bg-green-700 px-4 py-2 rounded-sm text-sm font-bold shadow-md text-white cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          Share Code
        </button>
        <button
          className="bg-green-700 cursor-pointer px-4 py-2 rounded-sm text-sm shadow-md font-bold text-white"
          onClick={() => setShowSearchModal(true)}
        >
          Search Code
        </button>
      </div>

      {/* Save Code Modal */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-[600px] h-[500px] shadow-lg space-y-4">
            <h2 className="text-lg font-bold">Save Your Code</h2>

            <div>
              <label htmlFor="codeID" className="text-sm font-medium">
                Code ID:
              </label>
              <input
                id="codeID"
                name="codeID"
                type="text"
                value={codeID}
                onChange={(e) => setCodeID(e.target.value)}
                className="w-full border px-2 py-1 mt-1 rounded-sm"
              />
            </div>

            <div>
              <label htmlFor="codeText" className="text-sm font-medium">
                Code Text:
              </label>
              <textarea
                id="codeText"
                name="codeText"
                value={codeText}
                onChange={(e) => setCodeText(e.target.value)}
                rows={9}
                className="w-full h-full border px-2 py-1 mt-1 rounded-sm"
              ></textarea>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="text-sm px-3 py-1 bg-gray-300 rounded-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="text-sm px-3 py-1 bg-green-700 text-white rounded-sm"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Code Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-[600px] min-h-[300px] shadow-lg space-y-4">
            <h2 className="text-lg font-bold">Search Saved Code</h2>

            <div>
              <label htmlFor="searchId" className="text-sm font-medium">
                Enter Code ID:
              </label>
              <input
                id="searchId"
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full border px-2 py-1 mt-1 rounded-sm"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowSearchModal(false)}
                className="text-sm px-3 py-1 bg-gray-300 rounded-sm"
              >
                Close
              </button>
              <button
                onClick={handleSearch}
                disabled={loading}
                className="text-sm px-3 py-1 bg-green-700 text-white rounded-sm"
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>

            {searchResult && (
              <div className="space-y-2">
                <pre className="bg-gray-100 p-3 rounded-sm text-sm max-h-[200px] overflow-auto">
                  {searchResult}
                </pre>
                <button
                  onClick={handleCopy}
                  className="text-sm px-3 py-1 bg-green-700 text-white rounded-sm"
                >
                  Copy Code
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
