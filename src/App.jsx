import { useState, useEffect } from "react";
import { employeeData } from "./EmployeeData.js";

function App() {
  const [data, setData] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState();
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setData(employeeData);
  }, []);

  const handleEdit = (id) => {
    const dt = data.filter((item) => item.id === id);
    if (dt !== undefined) {
      setIsUpdate(true);
      setId(dt[0].id);
      setFirstname(dt[0].firstname);
      setLastname(dt[0].lastname);
      setAge(dt[0].age);
    }
  };

  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure to delete this item?")) {
        const dt = data.filter((item) => item.id !== id);
        setData(dt);
      }
    }
  };

  const handleValidation = () => {
    // Validation for input fields
    let error = "";
    if (firstname === "") {
      error += "First Name ";
    }
    if (lastname === "") {
      error += "Last Name ";
    }
    if (age === undefined || age <= 0) {
      error += "Age";
    }
    return error;
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Validation for input fields
    let error = handleValidation();
    // Save data to data state
    if (error == "") {
      const dt = [...data];
      // create new employee obj
      const newEmployee = {
        id: employeeData.length + 1,
        firstname: firstname,
        lastname: lastname,
        age: age,
      };
      // add new employee obj to dt
      dt.push(newEmployee);
      // Set dt to data state
      setData(dt);
      handleClear();
    } else {
      alert(`Please enter ${error}.`);
    }
  };

  const handleUpdate = () => {
    // Validation for input fields
    let error = handleValidation();
    // Find index of id from usestate(id)
    if (error == "") {
      const index = data
        .map((item, index) => {
          return item.id;
        })
        .indexOf(id);
      // handle unidentified employee
      if (index == -1) {
        alert("No employee found with this id");
      }

      // create new array of data
      const dt = [...data];
      // set updated data
      dt[index].firstname = firstname;
      dt[index].lastname = lastname;
      dt[index].age = age;
      // Set updated array to data
      setData(dt);
      // Clear input fields
      handleClear();
    } else {
      alert(`Please enter ${error}.`);
    }
  };

  const handleClear = () => {
    setIsUpdate(false);
    setId(0);
    setFirstname("");
    setLastname("");
    setAge("");
  };

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <div>
          <label>
            First Name:
            <input
              type="text"
              placeholder="Enter first name"
              onChange={(e) => setFirstname(e.target.value)}
              value={firstname}
            />
          </label>
        </div>
        <div>
          <label>
            Last Name:
            <input
              type="text"
              placeholder="Enter last name"
              onChange={(e) => setLastname(e.target.value)}
              value={lastname}
            />
          </label>
        </div>
        <div>
          <label>
            Age:
            <input
              type="number"
              placeholder="Enter age"
              onChange={(e) => setAge(e.target.value)}
              value={age}
            />
          </label>
        </div>
        <div>
          {isUpdate ? (
            <button className="btn btn-primary" onClick={() => handleUpdate()}>
              Update
            </button>
          ) : (
            <button className="btn btn-primary" onClick={(e) => handleSave(e)}>
              Save
            </button>
          )}
          &nbsp;
          <button className="btn btn-danger" onClick={() => handleClear()}>
            Clear
          </button>
        </div>
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <td>Sr.No.</td>
            <td>Id</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Age</td>
            <td>Acations</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.age}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
