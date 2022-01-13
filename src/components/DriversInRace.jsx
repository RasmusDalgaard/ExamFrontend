import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from 'uuid';


export default function DriversInRace({ aFacade, setErrorMessage }) {
  const initialstate = [];
  const [driversInRace, setDriversInRace] = useState(initialstate);

  const thisURL = window.location.href;
  const id = thisURL.split("/").pop();
  
const getDriversInRace = (data) => {
    console.log(data);
    setDriversInRace(data.drivers);
}
  
  useEffect(() => {
    aFacade.fetchData("driver/" + id, getDriversInRace, setErrorMessage);
  }, [aFacade, setErrorMessage]);



  return (
    <div className="row">
      {driversInRace.map((driver) => (
            <Table className="table table-striped table-dark">
            <thead>
              <tr className="">
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Birthyear</th>
                <th scope="col">Gender</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th key={uuidv4()} scope="row">{driver.id}</th>
                <td key={uuidv4()}>{driver.name}</td>
                <td key={uuidv4()}>{driver.birthyear}</td>
                <td key={uuidv4()}>{driver.gender}</td>              
              </tr>
            </tbody>
          </Table>
          ))}
    </div>
  );
}
