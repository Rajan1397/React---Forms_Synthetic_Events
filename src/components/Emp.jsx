import React from "react";

const Emp = () => {
  const [data, setData] = React.useState({
    name: "",
    age: "",
    address: "",
    department: "",
    salary: "",
    maritalStatus: false,
  });

  // empty array yto store the data
  const [employee, setEmployee] = React.useState([]);

  const handleChange = (e) => {
    // e.target is an Object
    //es6 object destructiring

    // type is attribute and chekced is value kinda thing
    const { id, value, type, checked } = e.target;

    setData({
      ...data,
      // if type is checkbox, we want checked as attribute otherwise we want attribute as value
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const { name, age, address, department, salary, maritalStatus } = data;

  React.useEffect(() => {
    getemployees(); // invoke this functon only for first time of mounting
  }, []);

  // for first time redering of data stored
  const getemployees = () => {
    fetch(`http://localhost:3004/employee`)
      .then((res) => res.json())
      .then((res) => setEmployee(res));
  };

  const handleSubmit = (e) => {
    //console.log(data);

    const payloadjson = JSON.stringify(data);

    fetch(`http://localhost:3004/employee`, {
      method: "POST",
      body: payloadjson,
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => {
      getemployees(data);
    });
  };

  return (
    <>
      <div>
        <h1>Employee Dashboard</h1>
        <input
          type="text"
          id="name"
          placeholder="Enter name"
          onChange={handleChange}
          value={name}
        />
        <br />
        <input
          type="text"
          id="age"
          placeholder="Enter age"
          onChange={handleChange}
          value={age}
        />
        <br />
        <input
          type="text"
          id="address"
          placeholder="Enter Address"
          onChange={handleChange}
          value={address}
        />

        <br />
        <br />
        <label>
          Select Department:
          <select id="department" onChange={handleChange} value={department}>
            <option value="finance">Finance</option>
            <option value="hr">HR</option>{" "}
            {/*/Hr we want to show to the user, the stored value is hr*/}
            <option value="it">IT</option>
            <option value="medical">Medical</option>
            <option value="engineering">Engineering</option>
          </select>
        </label>
        <br />
        <br />
        <input
          id="salary"
          type="text"
          placeholder="Enter salary"
          onChange={handleChange}
          value={salary}
        />
        <br />
        <label>
          Marital Status:
          <input
            id="maritalStatus"
            type="checkbox"
            onChange={handleChange}
            checked={maritalStatus}
          />
        </label>
        <br />
        <br />
        <button onClick={handleSubmit}>Submit</button>
        <br />
        <br />

        {employee.map((item) => {
          return (
            <div
              style={{
                border: "1px solid black",
                height: "auto",
                width: "200px",
                display: "inline-block",
                margin: "10px",
                padding: "5px",
              }}
              key={item.id}
            >
              <div>Name: {item.name}</div>
              <div>Age: {item.age}</div>
              <div>Address: {item.address}</div>
              <div>Department: {item.department}</div>
              <div>Salary: {item.salary}</div>
              <div>
                Marital Status: {item.maritalStatus ? "Married" : "Unmarried"}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Emp;
