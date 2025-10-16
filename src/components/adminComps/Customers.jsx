import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // 🔹 Real-time listener for Clients collection
    const unsub = onSnapshot(collection(db, "Clients"), (snapshot) => {
      const clientsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCustomers(clientsData);
    });

    return () => unsub(); // Cleanup listener on unmount
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Customer Details</h2>

      <div className="mt-5 overflow-x-auto rounded shadow border border-gray-400">
        <table className="w-full bg-white border border-gray-200 rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">S.No</th>
              <th className="px-6 py-3 text-left">Customer Name</th>
              <th className="px-6 py-3 text-left">Customer Email</th>
              <th className="px-6 py-3 text-left">Customer Phone Number</th>
            </tr>
          </thead>

          <tbody>
            {customers.length > 0 ? (
              customers.map((customer, index) => (
                <tr key={customer.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{customer.name || "—"}</td>
                  <td className="px-6 py-4">{customer.email || "—"}</td>
                  <td className="px-6 py-4">{customer.phone || "—"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-4 text-center text-gray-500 italic"
                >
                  No customer data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
