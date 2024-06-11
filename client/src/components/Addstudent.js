import { useNavigate } from "react-router-dom";
import React, { useEffect ,useState } from "react";
import './Addstudent.css';

export const Addstudent = () => {
    const [student, setStudent] = useState({ // Define student state
        id: "",
        name: "",
        gender: "",
        physics: "",
        maths: "",
        english: "",
      });
      const [data, setData] = useState([]);
      const [maxId, setMaxId] = useState(0);

      const [showLogo, setShowLogo] = useState(false);

      const navigate = useNavigate(); 
      useEffect(() => {
        fetchData();
      }, []);
      function getMax(arr, prop) {
        var max;
        for (var i=0 ; i<arr.length ; i++) {
            if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
                max = arr[i];
        }
        return max;
    }
      const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8000/students");
            const result = await response.json();
            if (Array.isArray(result)) {
                setData(result);
                     
              console.log(result); 
              const   maxval=getMax(result,"id");
               
              student.id=parseInt( maxval.id) +1;
              setStudent(student);
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
      const addStudent = async (student) => {

        console.log(data.push(student));
        console.log(data);
        
        try {
          const response = await fetch("http://localhost:8000/writefile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          if (!response.ok) {
            throw new Error("Failed to add student");
          }
          return await response.json();
        } catch (error) {
          console.error("Error adding student:", error);
          throw error;
        }
      };
    

     const handleChange = (event) => {
    const { name, value } = event.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
     await addStudent(student);
    setStudent({
      id: "",
      name: "",
      gender: "",
      physics: "",
      maths: "",
      english: "",
    });
    console.log("New student submitted:", student);
    // Navigate back to the main page
    setShowLogo(true);
    setTimeout(() => {
        setShowLogo(false);
        navigate("/");
    }, 1500); // Show logo for 1 second
  } catch (error) {
    console.error("Error adding student",error);
  }
  };
    return (
        <div>
          {/* <Addstudentform addStudent={addStudent} updateTable={updateTable} /> */}
          <h2>Add New Student</h2>
          <form onSubmit={handleSubmit}>
            <label>ID:</label>
            <input
              type="text"
              disabled = {true}
              name="id"
              value={student.id}
              onChange={handleChange}
              required
            />
            <br />
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
              required
            />
            <br />
            <div className="radio-group">
    <label>
        <input
            type="radio"
            name="gender"
            value="Male"
            checked={student.gender === "Male"}
            onChange={handleChange}
            required
        /> 
        Male
    </label>
    <label>
        <input
            type="radio"
            name="gender"
            value="Female"
            checked={student.gender === "Female"}
            onChange={handleChange}
            required
        /> 
        Female
    </label>
</div>
            <br />
            <label>Physics:</label>
            <input
              type="text"
              name="physics"
              value={student.physics}
              onChange={handleChange}
              required
            />
0            <br />
            <label>Maths:</label>
            <input
              type="text"
              name="maths"
              value={student.maths}
              onChange={handleChange}
              required
            />
            <br />
            <label>English:</label>
            <input
              type="text"
              name="english"
              value={student.english}
              onChange={handleChange}
              required
            />
            <br />
            <button type="submit">Addstudent</button>
            </form>
            <div className="updated-logo">
                {/* Render the GIF image */}
                <img src={require('../image/giphy.webp').default} alt="Your GIF image" />
            </div>
          {showLogo && <div className="updated-logo">Updated!</div>}
          <button onClick={() => navigate("/")}>Go Back</button>
        </div>
      );
    };
