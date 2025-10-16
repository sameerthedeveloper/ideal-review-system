import {
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

function Review() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // 🔹 Fetch all reviews in real-time
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "Reviews"), (snapshot) => {
      const reviewData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(reviewData);
      setFilteredReviews(reviewData);
    });
    return () => unsub();
  }, []);

  // 🔹 Search + Filter logic
  useEffect(() => {
    let data = [...reviews];

    if (filter !== "all") {
      data = data.filter((r) => r.staffId === filter);
    }

    if (search.trim() !== "") {
      const term = search.toLowerCase();
      data = data.filter(
        (r) =>
          r.name?.toLowerCase().includes(term) ||
          r.email?.toLowerCase().includes(term) ||
          r.phone?.toLowerCase().includes(term)
      );
    }

    setFilteredReviews(data);
  }, [search, filter, reviews]);

  // 🔹 Update Clients collection from Reviews
  const handleUpdateClients = async () => {
    setLoading(true);
    try {
      for (const review of reviews) {
        const { name, phone, email } = review;
        if (!phone && !email) continue;

        const clientRef = collection(db, "Clients");

        const qPhone = query(clientRef, where("phone", "==", phone || ""));
        const qEmail = query(clientRef, where("email", "==", email || ""));

        const snapshotPhone = await getDocs(qPhone);
        const snapshotEmail = await getDocs(qEmail);

        if (!snapshotPhone.empty) {
          const docRef = doc(db, "Clients", snapshotPhone.docs[0].id);
          await updateDoc(docRef, { name, phone, email });
        } else if (!snapshotEmail.empty) {
          const docRef = doc(db, "Clients", snapshotEmail.docs[0].id);
          await updateDoc(docRef, { name, phone, email });
        } else {
          await addDoc(clientRef, { name, phone, email });
        }
      }
      alert("✅ Clients data successfully updated!");
    } catch (error) {
      console.error("Error updating clients:", error);
      alert("❌ Failed to update clients data");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete a review
  const handleDeleteReview = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "Reviews", id));
      alert("✅ Review deleted successfully!");
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("❌ Failed to delete review");
    }
  };

  const staffList = [...new Set(reviews.map((r) => r.staffId))].filter(Boolean);

  return (
    <div className="p-4">
      {/* Header and actions */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Reviews</h2>
        <div className="flex flex-col md:flex-row items-center gap-3">
          <input
            type="text"
            placeholder="Search by name, phone, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded p-2 w-64 focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded p-2 bg-white focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
          >
            <option value="all">All Staff</option>
            {staffList.map((staffId) => (
              <option key={staffId} value={staffId}>
                {staffId}
              </option>
            ))}
          </select>
          <button
            onClick={handleUpdateClients}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 shadow"
          >
            {loading ? "Updating..." : "Update Clients Data"}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded shadow border border-gray-300">
        <table className="w-full bg-white border border-gray-200 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">S.NO</th>
              <th className="px-6 py-3 text-left">Employee ID</th>
              <th className="px-6 py-3 text-left">Customer Name</th>
              <th className="px-6 py-3 text-left">Customer Phone</th>
              <th className="px-6 py-3 text-left">Customer Email</th>
              <th className="px-6 py-3 text-left">Staff Rating</th>
              <th className="px-6 py-3 text-left">Feedback</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review, index) => (
                <tr
                  key={review.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{review.staffId}</td>
                  <td className="px-6 py-4">{review.name}</td>
                  <td className="px-6 py-4">{review.phone}</td>
                  <td className="px-6 py-4">{review.email}</td>
                  <td className="px-6 py-4">{review.rating}</td>
                  <td className="px-6 py-4">{review.feedback}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No reviews found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Review;
