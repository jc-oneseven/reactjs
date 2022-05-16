import { useEffect, useState } from "react";
import Header from "../Components/Header/Header";
import Register from "../Components/Register/Register";
import { GetOwners } from "../Service/GetUser";

const Admin = (props) => {
  const [users, setUser] = useState([]);

  useEffect(function (e) {
    const owners = GetOwners().then((data) => {
      return data.filter((user) =>
        user.roles[0] ? user.roles[0].name === "Owner" : ""
      );
    });
    owners.then((owners) => setUser(sortUsers(owners)));
  }, []);

  function handleFormSubmit(user) {
    setUser((prevUser) => {
      const mergeUsers = [user, ...prevUser];
      return sortUsers(mergeUsers);
    });
  }

  function sortUsers(usersList) {
    return usersList.sort((a, b) =>
      a.firstName.toUpperCase() > b.firstName.toUpperCase()
        ? 1
        : b.firstName.toUpperCase() > a.firstName.toUpperCase()
        ? -1
        : 0
    );
  }

  return (
    <div>
      <Header
        isLoggedIn={props.isLoggedIn}
        logout={props.logout}
        showModal={props.showModal}
        userName={props.userName}
        currentUserRole={props.currentUserRole}
      />
      <div className="container mt-4">
        <header className="border-bottom mb-3">
          <h4> Manage Owners </h4>
        </header>
        <div className="row">
          <div className="col-4 border-end p-4 pt-2 bg-gray ">
            <Register
              title="Add Owner"
              tagLine="Add new owner so that new restaurant will be added by them."
              formSubmit={handleFormSubmit}
            />
          </div>
          <div className="col-8">
            <table className="table">
              <thead>
                <tr>
                  <th> Name </th>
                  <th> Email </th>
                  <th> Contact Number </th>
                  <th> Action </th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        {user.firstName} {user.lastName}
                      </td>
                      <td> {user.email} </td>
                      <td> {user.mobile} </td>
                      <td>
                        <button id={user.id} className="btn btn-primary btn-sm">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
