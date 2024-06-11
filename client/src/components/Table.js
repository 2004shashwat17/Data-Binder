import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Table = () => {
  const [data, setData] = useState([]);
  const [tempdata, setTempData] = useState([]);
  const [editMode, setEditMode] = useState({});
  const [sort, setSort] = useState({
    key: null,
    direction: "ascending",
  });
  const [editData, setEditData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8000/students");
  //     const result = await response.json();
  //     if (Array.isArray(result)) {
  //       setData(result);
  //     } else {
  //       console.error("Fetched data is not an array:", result);
  //       setData([]);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setData([]);
  //   }
  // };
  const fetchData = async () => {
    try {
        const response = await fetch("http://localhost:8000/students");
        const result = await response.json();
        if (Array.isArray(result)) {
            setData(result);
        } else if (typeof result === 'object') {
            // Convert the object into an array with a single element
            setData([result]);
        } else {
            console.error("Fetched data is neither an array nor an object:", result);
            setData([]);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
    }
};
  // const fetchData = () => {
  //   fetch("http://localhost:8000/students")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setData(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  //     //TODO:
  // };

  const sortBy = (key) => {
    let direction = "ascending";
    if (sort.key === key && sort.direction === "ascending") {
      direction = "descending";
    }
    setData(
      [...data].sort((a, b) => {
        if (key === "name") {
          return direction === "ascending"
            ? a[key].localeCompare(b[key])
            : b[key].localeCompare(a[key]);
        } else {
          return direction === "ascending" ? a[key] - b[key] : b[key] - a[key];
        }
      })
    );
    setSort({ key, direction });
  };

  const deleteRow = (id) => {
    const updatedData = data.filter((student) => student.id !== id);
    console.log(updatedData);
    setData(updatedData);

    fetch("http://localhost:8000/writefile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const toggleEditMode = (id) => {
    setEditMode((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleInputChange = (event, id, field) => {
    const { value } = event.target;
    setTempData(data); // save the original data copy
    setData((prevData) =>
      prevData.map((student) => {
        if (student.id === id) {
          const updatedStudent = { ...student, [field]: value };
          setEditData((prevEditData) => ({
            ...prevEditData,
            [id]: updatedStudent,
          }));
          return updatedStudent;
        }
        return student;
      })
    );
    console.log(data);
  };

  const saveChanges = (id) => {
    setData((data) =>
      data.map((student) => {
        if (student.id === id) {
          return editData[id];
        }
        return student;
      })
    );
    console.log(data);
    // Send the updated data to the server
    fetch("http://localhost:8000/writefile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        // reload data and read-only mode
        cancelChanges(id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const cancelChanges = (id) => {
    fetchData();
    setEditMode({});
  };

  return (
    <div>
      <h2>Students' Performance</h2>
      <button onClick={() => navigate('/Add')}>ADD</button>
      <table>
        <thead>
          <tr>
            <th>
              <button onClick={() => sortBy("id")}>ID</button>
            </th>
            <th>
              <button onClick={() => sortBy("name")}>Name</button>
            </th>
            <th>
              <button onClick={() => sortBy("gender")}>Gender</button>
            </th>
            <th>
              <button onClick={() => sortBy("physics")}>Physics</button>
            </th>
            <th>
              <button onClick={() => sortBy("maths")}>Maths</button>
            </th>
            <th>
              <button onClick={() => sortBy("english")}>English</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((student, index) => (
            <tr key={index}>
              <td>{student.id}</td>
              <td>
                {editMode[student.id] ? (
                  <textarea
                    value={student.name}
                    onChange={(event) =>
                      handleInputChange(event, student.id, "name")
                    }
                  />
                ) : (
                  student.name
                )}
              </td>
              <td>
                {editMode[student.id] ? (
                  <textarea
                    value={student.gender}
                    onChange={(event) =>
                      handleInputChange(event, student.id, "gender")
                    }
                  />
                ) : (
                  student.gender
                )}
              </td>
              <td>
                {editMode[student.id] ? (
                  <textarea
                    value={student.physics}
                    onChange={(event) =>
                      handleInputChange(event, student.id, "physics")
                    }
                  />
                ) : (
                  student.physics
                )}
              </td>
              <td>
                {editMode[student.id] ? (
                  <textarea
                    value={student.maths}
                    onChange={(event) =>
                      handleInputChange(event, student.id, "maths")
                    }
                  />
                ) : (
                  student.maths
                )}
              </td>
              <td>
                {editMode[student.id] ? (
                  <textarea
                    value={student.english}
                    onChange={(event) =>
                      handleInputChange(event, student.id, "english")
                    }
                  />
                ) : (
                  student.english
                )}
              </td>

              <td>
                {editMode[student.id] ? (
                  <>
                    <button onClick={() => saveChanges(student.id)}>
                      Save
                    </button> 
                    <button onClick={() => cancelChanges(student.id)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button onClick={() => toggleEditMode(student.id)}>
                    Edit
                  </button>
                )}
                <button onClick={() => deleteRow(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
