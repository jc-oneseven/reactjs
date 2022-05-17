import { useEffect, useState } from "react";
import { month, weekday } from "../../Constant/Constant";
import { getReservationsByOwner } from "../../Service/getReservations";

const ManageReservation = (props) => {
  return (
    <div>
      <header className="border-bottom mb-3">
        <h4> Reservations </h4>
      </header>
      {props.reservations.length > 0 && (
        <section className="List">
          <table className="table border">
            <thead>
              <tr>
                <th> Reservation Number </th>
                <th> Customer Info </th>
                <th> Restaurant Name </th>
                <th> Time Slot </th>
                <th> Reservation Date </th>
                <th> Status </th>
              </tr>
            </thead>
            <tbody>
              {props.reservations.map((item) => (
                <tr key={item.id}>
                  <td>{item.reservationNumber}</td>
                  <td>
                    <div>
                      {item.user.firstName} {item.user.lastName}
                    </div>
                    <a className="small" href={`mailto:${item.user.email}`}>
                      {item.user.email}
                    </a>
                  </td>
                  <td> {item.restaurant.name} </td>
                  <td>{item.slot.slot}</td>
                  <td>
                    {`${weekday[new Date(item.reservationDate).getDay()]},
                                ${
                                  month[
                                    new Date(item.reservationDate).getMonth()
                                  ]
                                }
                                ${new Date(item.reservationDate).getDate()}
                              `}
                  </td>
                  <td>
                    {new Date() > new Date(item.reservationDate) ? (
                      <span class="badge bg-light"> Expired </span>
                    ) : (
                      <span class="badge bg-success">Upcoming Booking</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
      {props.reservations.length === 0 && (
        <div className="alert alert-info"> No Reservation found. </div>
      )}
    </div>
  );
};

export default ManageReservation;
