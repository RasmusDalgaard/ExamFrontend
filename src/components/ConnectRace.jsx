import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';


export default function ConnectRace({ aFacade, setErrorMessage }) {
  const initialstate = [];
  const [allRaces, setAllRaces] = useState(initialstate);
  const[connectedCar, setConnectedCar] = useState();

  const thisURL = window.location.href;
  const id = thisURL.split("/").pop();
  
const getAllRaces = (data) => {
    console.log(data);
    setAllRaces(data.races);
}

const getConnectedCar = (data) => {
    setConnectedCar(data);
}

const connectToCar = (evt) => {
    evt.preventDefault()
    let raceId = evt.target.id;
    aFacade.putData("car/connect/" + id, getConnectedCar, setErrorMessage, raceId);
    alert("Race with id: " + raceId + " has been connected to car with id: " + id);
}
  
  useEffect(() => {
    aFacade.fetchData("race/all", getAllRaces, setErrorMessage);
  }, [aFacade, setErrorMessage]);



  return (
    <div className="row">
      {allRaces.map((race) => (
            <Table className="table table-striped table-dark">
            <thead>
              <tr className="">
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Location</th>
                <th scope="col">Connect to car</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th key={uuidv4()}scope="row">{race.id}</th>
                <td key={uuidv4()}>{race.name}</td>
                <td key={uuidv4()}>{race.date}</td>
                <td key={uuidv4()}>{race.time}</td>
                <td key={uuidv4()}>{race.location}</td>
                <td><button id={race.id} onClick={connectToCar}>Connect</button></td>  
              </tr>
            </tbody>
          </Table>
          ))}
    </div>
  );
}