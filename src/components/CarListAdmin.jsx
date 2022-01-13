import { useCallback, useEffect, useState } from "react";
import { Table} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


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
              </tr>
            </thead>
            <tbody>
              <tr>
                <th key={car.id}scope="row">{car.id}</th>
                <td key={car.id}>{car.name}</td>
                <td key={car.id}>{car.brand}</td>
                <td key={car.id}>{car.make}</td>
                <td key={car.id}>{car.year}</td>    
                
                <td><button id={car.id} onClick={deleteCar}>Delete</button></td>
                       
              </tr>
            </tbody>
          </Table>
          ))}
    </div>
  );
}