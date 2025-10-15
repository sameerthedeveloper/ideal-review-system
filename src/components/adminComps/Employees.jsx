const Employees = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Employees</h2>
      <div className="p-5 w-full rounded bg-gray-100 border border-gray-400 shadow">
        <h1 className="font-bold ">Add Employee </h1>
        <div>
          <input type="text"/>
          <input type="text"/>
        </div>
      </div>
    </div>
  );
};

export default Employees;