import { IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import ModalForm from "./Modal";

interface Person {
  pk: number;
  name: string;
  position: string;
  department: string;
  education: string;
  degree: string;
  email: string;
  address: string;
  postalCode: number;
}

const API_ENDPOINT = window.location.origin + "/api";

const ListGroup = () => {
  const [lists, setLists] = useState<Person[]>([]);

  async function handleDeleteClick(pk: number): Promise<void> {
    const check = window.confirm("確定是否要刪除此筆資料？");
    if (check) {
      console.log("Delete action called for:", pk);
      const response = await fetch(`${API_ENDPOINT}/delete/${pk}`, {
        method: "DELETE",
      });
      if (response.status === 204) {
        setLists(lists.filter((person) => person.pk !== pk));
      }
    }
  }

  type UpdateProps = {
    pk: number;
    name: string;
    position: string;
    department: string;
    education: string;
    degree: string;
    email: string;
    address: string;
    postalCode: number;
  };

  const handleUpdateClick = (
    target: Partial<UpdateProps>,
    pk: number
  ): void => {
    const updatedLists = lists.map((person) => {
      if (person.pk === pk) {
        return {
          ...person,
          ...target,
        };
      }
      return person;
    });
    setLists(updatedLists);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINT + "/all");
        const data = await response.json();

        console.log(data);
        if (Array.isArray(data)) {
          setLists(data);
        } else {
          throw new Error("Data format is incorrect");
        }
      } catch (error: any) {
        console.error(
          "There was a problem with the fetch operation:",
          error.message
        );
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>人員名單</h1>

      <table className="table">
        <thead>
          <tr className="table-primary">
            <th scope="col">ID</th>
            <th scope="col">姓名</th>
            <th scope="col">職稱</th>
            <th scope="col">部門</th>
            <th scope="col">學歷</th>
            <th scope="col">科系</th>
            <th scope="col">信箱</th>
            <th scope="col">地址</th>
            <th scope="col">郵遞區號</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {lists.map((people) => (
            <tr key={people.pk}>
              <th scope="row">{people.pk}</th>
              <th scope="row">{people.name}</th>
              <th scope="row">{people.position}</th>
              <th scope="row">{people.department}</th>
              <th scope="row">{people.education}</th>
              <th scope="row">{people.degree}</th>
              <th scope="row">{people.email}</th>
              <th scope="row">{people.address}</th>
              <th scope="row">{people.postalCode}</th>
              <th scope="row">
                <IconButton
                  aria-label="delete"
                  size="small"
                  color="error"
                  onClick={() => handleDeleteClick(people.pk)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </IconButton>

                <ModalForm
                  pk={people.pk}
                  name={people.name}
                  position={people.position}
                  department={people.department}
                  education={people.education}
                  degree={people.degree}
                  email={people.email}
                  address={people.address}
                  postalCode={people.postalCode}
                  handleUpdateClick={handleUpdateClick}
                ></ModalForm>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListGroup;
