import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, onSnapshot,deleteDoc,updateDoc,doc } from "firebase/firestore";

const Employees = () => {
  const [empname, setEmpname] = useState("");
  const [empid, setEmpid] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "Staffs"), (snapshot) => {
      const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setData(users);
    });
    return () => unsub();
  }, []);

  const handleEmployee = async () => {
    if (!empname || !empid) {
      alert("Please fill both fields");
      return;
    }

    try {
      await addDoc(collection(db, "Staffs"), { name: empname, eid: empid });
      setEmpname("");
      setEmpid("");
    } catch (error) {
      console.error("❌ Error adding data:", error);
    }
  };

  const [editMode, setEditMode] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEid, setEditEid] = useState("");

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Staffs", id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await updateDoc(doc(db, "Staffs", id), {
        name: editName,
        eid: editEid,
      });
      setEditMode(null);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Employees</h2>

      <div className="p-5 w-full rounded bg-gray-100 border border-gray-400 shadow">
        <h1 className="font-bold">Add Employee</h1>
        <div className="w-full p-6 flex justify-between gap-3">
          <input
            type="text"
            className="w-full rounded bg-white shadow p-2"
            placeholder="Employee Name"
            value={empname}
            onChange={(e) => setEmpname(e.target.value)}
          />
          <input
            type="text"
            className="w-full rounded bg-white shadow p-2"
            placeholder="Employee ID"
            value={empid}
            onChange={(e) => setEmpid(e.target.value)}
          />
          <button
            className="w-25 bg-green-500 px-4 py-2 h-10 text-white rounded font-bold shadow"
            onClick={handleEmployee}
          >
            Add
          </button>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto rounded shadow border border-gray-400">
        <table className="w-full bg-white border border-gray-200 rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Employee ID</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              <>
                {data.map((element) => (
              <tr key={element.id} className="border-t">
                <td className="px-6 py-4">
                  {editMode === element.id ? (
                    <input
                      type="text"
                      className="border rounded px-2 py-1"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  ) : (
                    element.name
                  )}
                </td>
                <td className="px-6 py-4">
                  {editMode === element.id ? (
                    <input
                      type="text"
                      className="border rounded px-2 py-1"
                      value={editEid}
                      onChange={(e) => setEditEid(e.target.value)}
                    />
                  ) : (
                    element.eid
                  )}
                </td>
                <td className="px-6 py-4">
                  {editMode === element.id ? (
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => handleUpdate(element.id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => {
                        setEditMode(element.id);
                        setEditName(element.name);
                        setEditEid(element.eid);
                      }}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(element.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center">
                  <div className="w-full flex justify-center">
                    <h1 className="font-bold p-5">No Employee Data</h1>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employees;
