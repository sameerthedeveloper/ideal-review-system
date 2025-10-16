import { useState } from "react";
import { db } from "../../firebase";


const Employees = () => {
    const [empname,setEmpname] = useState()
    const [empid,setEmpid] = useState()


    const handleEmployee = ()=>{

    }
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Employees</h2>
      <div className="p-5 w-full rounded bg-gray-100 border border-gray-400 shadow">
        <h1 className="font-bold ">Add Employee </h1>
        <div className="w-full p-6 flex justify-between gap-3">
          <input type="text" className="w-full rounded bg-white shadow p-2" placeholder="Employee Name" value={empname} onChange={(i)=>{setEmpname(i.value)}}/>
          <input type="text" className="w-full rounded bg-white shadow p-2" placeholder="Employee ID" value={empid} onChange={(e)=>{setEmpid(e.value)}}/>
          <button className="w-25 bg-green-500 px-4 py-2 h-10 text-white rounded font-bold shadow" onClick={handleEmployee}>Add </button>
        </div>
      </div>
      <div className="p-5 w-full rounded bg-gray-100 border border-gray-400 shadow mt-5">


      </div>
    </div>
  );
};

export default Employees;