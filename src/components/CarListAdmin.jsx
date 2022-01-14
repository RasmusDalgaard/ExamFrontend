import { useEffect, useState } from "react";
import { Table} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from 'uuid';
import { NavLink } from "react-router-dom";


export default function CarListAdmin({ aFacade, setErrorMessage }) {
  const initialstate = [];
  const [allCars, setAllCars] = useState(initialstate);
  const [deletedCar, setDeletedCar] = useState();
  
const getAllCars = (data) => {
    console.log(data);
    setAllCars(data.cars);
}

const updateDelete = (data) => {
    setDeletedCar(data);
    alert("The car with Id: " + deletedCar.id + "has been deleted")
}

  const deleteCar = (evt) => {
    evt.preventDefault();
    console.log(evt.target.id);
    aFacade.deleteData("car/delete/" + evt.target.id, updateDelete, setErrorMessage);
  }

  useEffect(() => {
    aFacade.fetchData("car/all", getAllCars, setErrorMessage);
  }, [aFacade, setErrorMessage]);


  return (
    <div className="row">
      {allCars.map((car) => (
            <Table className="table table-striped table-dark">
            <thead>
              <tr className="">
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Brand</th>
                <th scope="col">Make</th>
                <th scope="col">Year</th>
                <th scope="col">Connect</th>
                <th scope="col">Delete</th>
                
              </tr>
            </thead>
            <tbody>
              <tr>
                <th key={uuidv4()}scope="row">{car.id}</th>
                <td key={uuidv4()}>{car.name}</td>
                <td key={uuidv4()}>{car.brand}</td>
                <td key={uuidv4()}>{car.make}</td>
                <td key={uuidv4()}>{car.year}</td>
                <NavLink to={`/connectrace/${car.id}`}>
                <button id={car.id}>Connect to race</button>
                </NavLink>    
                <td><button id={car.id} onClick={deleteCar}>Delete</button></td>   
              </tr>
            </tbody>
          </Table>
          ))}
    </div>
  );
}