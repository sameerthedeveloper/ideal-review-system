import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const QRGeneration = () => {
  const [reviewId, setReviewId] = useState("");
  const [qrCodes, setQrCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewQR, setViewQR] = useState(null);
  const [editQR, setEditQR] = useState(null);
  const [newReviewId, setNewReviewId] = useState("");

  // 🔹 Real-time fetch from Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "QRCode"), (snapshot) => {
      const qrData = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
      setQrCodes(qrData);
    });
    return () => unsub();
  }, []);

  // 🔹 Add new QR code directly
  const handleAddQR = async () => {
    if (!reviewId.trim()) {
      alert("⚠️ Please enter a review ID");
      return;
    }

    const qrUrl = getReviewUrl(reviewId);
    setLoading(true);
    try {
      await addDoc(collection(db, "QRCode"), {
        reviewId,
        qrUrl,
        createdAt: serverTimestamp(),
      });
      setReviewId("");
      alert("✅ QR Code generated successfully!");
    } catch (err) {
      console.error("Error adding QR:", err);
      alert("❌ Failed to generate QR");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete QR
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this QR?")) {
      try {
        await deleteDoc(doc(db, "QRCode", id));
        alert("🗑️ QR deleted successfully");
      } catch (err) {
        console.error("Error deleting QR:", err);
        alert("❌ Failed to delete QR");
      }
    }
  };

  // 🔹 Edit QR
  const handleEdit = (qr) => {
    setEditQR(qr);
    setNewReviewId(qr.reviewId);
  };

  const handleUpdate = async () => {
    if (!newReviewId.trim()) {
      alert("⚠️ Enter a valid review ID");
      return;
    }

    const updatedUrl = getReviewUrl(newReviewId);
    try {
      await updateDoc(doc(db, "QRCode", editQR.id), {
        reviewId: newReviewId,
        qrUrl: updatedUrl,
      });
      alert("✅ QR updated successfully");
      setEditQR(null);
      setNewReviewId("");
    } catch (err) {
      console.error("Error updating QR:", err);
      alert("❌ Failed to update QR");
    }
  };

  // 🔹 Download QR
  const handleDownload = (id) => {
    const svg = document.getElementById(`qr-${id}`);
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `qr-${id}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  // 🔹 Get review URL
  const getReviewUrl = (id) =>
    `https://sameerthedeveloper.github.io/ideal-review-system/#/review/${id}`;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Staff QR Generation
      </h2>

      {/* 🔹 Top Input Bar */}
      <div className="w-full p-6 flex flex-col md:flex-row justify-between gap-3 bg-gray-50 border border-gray-300 rounded-xl shadow mb-6">
        <input
          type="text"
          className="w-full rounded bg-white shadow p-2 border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter Staff ID"
          value={reviewId}
          onChange={(e) => setReviewId(e.target.value)}
        />
        <button
          className="min-w-[120px] bg-green-500 px-4 py-2 text-white rounded font-bold shadow hover:bg-green-600 transition"
          onClick={handleAddQR}
          disabled={loading}
        >
          {loading ? "Saving..." : "Add QR"}
        </button>
      </div>

      {/* 🔹 QR Code List */}
      <div className="border-2 h-140 border-gray-200 rounded-xl p-5 bg-gray-100 shadow-inner overflow-y-scroll">
        <h1 className="font-bold text-gray-800 mb-4">Generated QR Codes</h1>

        {qrCodes.length === 0 ? (
          <p className="text-gray-500 italic">No QR codes generated yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {qrCodes.map((qr) => (
              <div
                key={qr.id}
                className="w-full bg-white border border-gray-300 p-4 rounded-xl shadow hover:shadow-md transition flex flex-row justify-between items-center"
              >
                <div className="flex flex-row gap-4 items-center">
                  <QRCode id={`qr-${qr.id}`} value={qr.qrUrl} size={100} />
                  <div>
                    <p className="text-sm text-gray-700 break-all">{qr.qrUrl}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Staff ID: {qr.reviewId}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-2">
                  <button
                    onClick={() => setViewQR(qr)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDownload(qr.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => handleEdit(qr)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(qr.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔹 Floating QR View Modal */}
      {viewQR && (
        <div
          onClick={() => setViewQR(null)}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl p-6 shadow-2xl flex flex-col items-center relative"
          >
            <button
              onClick={() => setViewQR(null)}
              className="absolute top-2 right-3 text-gray-600 hover:text-gray-900 text-lg font-bold"
            >
              ✕
            </button>
            <QRCode value={viewQR.qrUrl} size={300} />
            <p className="mt-3 text-gray-700 text-center break-all max-w-xs">
              {viewQR.qrUrl}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Review ID: {viewQR.reviewId}
            </p>
            <button
              onClick={() => handleDownload(viewQR.id)}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Download
            </button>
          </div>
        </div>
      )}

      {/* 🔹 Floating Edit Modal */}
      {editQR && (
        <div
          onClick={() => setEditQR(null)}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl p-6 shadow-2xl flex flex-col items-center relative"
          >
            <button
              onClick={() => setEditQR(null)}
              className="absolute top-2 right-3 text-gray-600 hover:text-gray-900 text-lg font-bold"
            >
              ✕
            </button>
            <h3 className="font-semibold text-lg mb-2">Update QR Code</h3>
            <input
              type="text"
              value={newReviewId}
              onChange={(e) => setNewReviewId(e.target.value)}
              placeholder="Enter new review ID"
              className="border p-2 rounded w-full mb-4 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
            <button
              onClick={handleUpdate}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRGeneration;
