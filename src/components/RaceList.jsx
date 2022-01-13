import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";


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
            <table>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Date</th>
              <th>Location</th>
              <th>Time</th>
            </tr>
            <tr>
              <td>{race.id}</td>
              <td>{race.name}</td>
              <td>{race.date}</td>
              <td>{race.location}</td>
              <td>{race.time}</td>
            </tr>
            <tr>
              <td>Centro comercial Moctezuma</td>
              <td>Francisco Chang</td>
              <td>Mexico</td>
            </tr>
          </table>
          ))}
    </div>
  );
}