import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";


export default function AddRace({ aFacade, setErrorMessage }) {
  const initialstate = {
      "name" : "",
      "date" : "",
      "time" : "",
      "location" : ""
  }

const [newRace, setNewRace] = useState(initialstate);
const [createdRace, setCreatedRace] = useState();  

const getCreatedRace = (data) => {
    setCreatedRace(data);
}


const handleChange = (evt) => {
    setNewRace({...newRace, [evt.target.id] : evt.target.value})
    console.log(newRace);
};

const handleSubmit = (evt) => {
    aFacade.postRace(newRace.name, newRace.date, newRace.time, newRace.location, "race/create", getCreatedRace, setErrorMessage);
    evt.preventDefault();
    alert("Race has been created");
    let form = document.getElementById("form");
    form.reset();
    setNewRace(initialstate);
}

  return (
    <div className="row">
        <h2>Create a new race</h2>
<form id="form" onChange={handleChange} onSubmit={handleSubmit}>
  <div className="form-group">
    <label>Name</label>
    <input className="form-control" id="name" placeholder="Enter name of race"/>
  </div>
  <div className="form-group">
    <label>Date</label>
    <input className="form-control" id="date" placeholder="Date"/>
  </div>
  <div className="form-group">
    <label>Time</label>
    <input className="form-control" id="time" placeholder="Time"/>
  </div>
  <div className="form-group">
    <label>Location</label>
    <input className="form-control" id="location" placeholder="Location"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  );
}