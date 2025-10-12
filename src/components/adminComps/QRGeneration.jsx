import { useState } from "react";
import QRCode from "react-qr-code";


const QRGeneration = () => {
  const [reviewId, setReviewId] = useState("");
  const [showQR, setShowQR] = useState(false);

  const handleGenerate = () => {
    if (!reviewId.trim()) {
      alert("Please enter a review ID first");
      return;
    }
    setShowQR(true);
  };

  const handleDownload = () => {
    const svg = document.getElementById("qr-code");
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
      downloadLink.download = "review-qrcode.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const getReviewUrl = (id) => {
    return `https://sameerthedeveloper.github.io/ideal-review-system/#/review/${id}`;
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 ">Review QR Generation</h2>
      <div className="flex gap-5">
        <div className="max-w-md">
          <input
            type="text"
            value={reviewId}
            onChange={(e) => setReviewId(e.target.value)}
            placeholder="Enter review ID"
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={handleGenerate}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
          >
            Generate QR
          </button>
          <div className="mt-4 p-5 border-2 border-gray-400 flex flex-col rounded-xl">
            {showQR && reviewId && (
              <>
                <QRCode
                  id="qr-code"
                  value={getReviewUrl(reviewId)}
                  size={400}
                />
                <p className="mt-2 text-sm text-gray-600 break-all">
                  {getReviewUrl(reviewId)}
                </p>
                <button
                  onClick={handleDownload}
                  className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Download QR Code
                </button>
              </>
            )}
          </div>
        </div>
        <div className="border-2 border-gray-200 w-full rounded-xl p-5 bg-gray-100 ">
          <h1 className="font-bold">Generated QR Codes</h1>
        </div>
      </div>
    </div>
  );
};

export default QRGeneration;