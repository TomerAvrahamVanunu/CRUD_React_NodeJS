import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from "axios";

function App() {

  const [Id, setId] = useState (0);
  const [Name, setName] = useState ("");
  const [Email, setEmail] = useState ("");
  const [LastSeen, setLastSeen] = useState ("");
  const [EmployeeList, setEmployeeList] = useState([]);

  const [newEmployeeEmail, setNewEmployeeEmail] = useState ("");

useEffect(() => {
   Axios.get("http://localhost:3001/api/get").then((response) => {
    setEmployeeList(response.data);
   })
}, [])

  const addEmployee = () => {

    Axios.post("http://localhost:3001/api/insert",{
      Id: Id, 
      Name: Name,
      Email: Email,
      LastSeen: LastSeen,
    });

      setEmployeeList([
        ...EmployeeList,
        {Id:Id, Name: Name, Email: Email, LastSeen: LastSeen},
      ]);
    };

    const deleteEmployee = (Id) => {
      Axios.delete(`http://localhost:3001/api/delete/${Id}`).then((response) => {
        setEmployeeList(EmployeeList.filter((val)=> {
          return val.Id != Id;
        }));
      });
    };

    const updateEmployee = (Id) => {
      Axios.put("http://localhost:3001/api/update", {
        Id: Id, 
    //    Name: Name,
        Email: newEmployeeEmail,
      //  LastSeen: LastSeen,
      }).then((response) => {
        setEmployeeList(
          EmployeeList.map((val) => {
            return val.Id == Id
            ? {
                Id: val.Id,
                Name: val.Name,
                Email: newEmployeeEmail,
                LastSeen: LastSeen,
              }
            : val;
          })
        );
      }
    );
  };

  const getEmloyees = () => {
    Axios.get("http://localhost:3001/api/employees").then((response) =>{
      console.log(response);
    });
  };

  return (
    <div className="App"> 
      <h1>CRUD-1 APPLICATION</h1>
      <div className="form">
        <label>Id: </label>
        <input
          type="number"
          onChange={(event) => {
            setId(event.target.value);
          }}/>  
        <label>Name:</label>
        <input 
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}/>
        <label>Email:</label>
        <input
          type="text"
          onChange={(event) => {
            setEmail(event.target.value);
          }}/>
        <label>Last_Seen:</label>
        <input
          type="datetime-local"
          onChange={(event) => {
            setLastSeen(event.target.value);
          }}/> 

        <button onClick={addEmployee}>+ Add Employee</button>
      
          {EmployeeList.map((val) => {
            return (
              <div className="card">
                <h2>Name: {val.Name}</h2>
                <p>Id: {val.Id}<br />
                   Email: {val.Email}<br />
                   LastSeen: {val.LastSeen}<br /></p>

                <button onClick={() => {deleteEmployee(val.Id)}}>Delete</button>
                <input type="text"
                  onChange={(event) => {
                    setNewEmployeeEmail(event.target.value);
                }}/>

                <button onClick={() => {updateEmployee (val.Id)}}>Email_Update</button>
                
              </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;