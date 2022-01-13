import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';


export default function RaceList({ aFacade, setErrorMessage }) {
  const initialstate = [];
  const [allRaces, setAllRaces] = useState(initialstate);
  
const getAllRaces = (data) => {
    console.log(data);
    setAllRaces(data.races);
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
                <th scope="col">Cars</th>
                <th scope="col">Drivers</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th key={uuidv4()}scope="row">{race.id}</th>
                <td key={uuidv4()}>{race.name}</td>
                <td key={uuidv4()}>{race.date}</td>
                <td key={uuidv4()}>{race.time}</td>
                <td key={uuidv4()}>{race.location}</td>
                <NavLink to={`/carsinrace/${race.id}`}>
                <td><button>Cars</button></td>
                </NavLink>
                <NavLink to={`/driversinrace/${race.id}`}>
                <td><button>Drivers</button></td>
                </NavLink>
                
              </tr>
            </tbody>
          </Table>
          ))}
    </div>
  );
}