import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from 'uuid';

export default function CarsInRace({ aFacade, setErrorMessage }) {
  const initialstate = [];
  const [carsInRace, setCarsInRace] = useState(initialstate);

  const thisURL = window.location.href;
  const id = thisURL.split("/").pop();
  
const getCarsInRace = (data) => {
    console.log(data);
    setCarsInRace(data.cars);
}
  
  useEffect(() => {
    aFacade.fetchData("car/" + id, getCarsInRace, setErrorMessage);
  }, [aFacade, setErrorMessage]);



  return (
    <div className="row">
      {carsInRace.map((car) => (
            <Table className="table table-striped table-dark">
            <thead>
              <tr className="">
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Brand</th>
                <th scope="col">Make</th>
                <th scope="col">Year</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th key={uuidv4()} scope="row">{car.id}</th>
                <td key={uuidv4()}>{car.name}</td>
                <td key={uuidv4()}>{car.brand}</td>
                <td key={uuidv4()}>{car.make}</td>
                <td key={uuidv4()}>{car.year}</td>                
              </tr>
            </tbody>
          </Table>
          ))}
    </div>
  );
}

