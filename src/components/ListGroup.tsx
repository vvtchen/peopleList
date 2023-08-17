import { IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import ModalForm from "./Modal";

interface Person {
  model: string;
  pk: number;
  fields: {
    name: string;
    position: string;
    department: string;
    education: string;
    degree: string;
    email: string;
    address: string;
    postalCode: number;
  };
}

const API_ENDPOINT = "http://127.0.0.1:8000/api/";

function ListGroup() {
  const [lists, setLists] = useState<Person[]>([]);

  async function handleDeleteClick(pk: number): Promise<void> {
    const check = window.confirm("確定是否要刪除此筆資料？");
    if (check) {
      console.log("Delete action called for:", pk);
      const response = await fetch(`${API_ENDPOINT}delete/${pk}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(`error: ${error.message}`);
      }
      const result = await response.json();
      console.log(result); // {success:true}
      if (result.success) {
        setLists(lists.filter((person) => person.pk !== pk));
      } else {
        console.log("Failed to delete");
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
          fields: {
            ...person.fields,
            ...target,
          },
        };
      }
      return person;
    });

    setLists(updatedLists);
  };

  useEffect(() => {
    fetch(API_ENDPOINT + "all")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setLists(data);
        } else {
          throw new Error("Data format is incorrect");
        }
      })
      .catch((error) => {
        console.error(
          "There was a problem with the fetch operation:",
          error.message
        );
      });
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
              <th scope="row">{people.fields.name}</th>
              <th scope="row">{people.fields.position}</th>
              <th scope="row">{people.fields.department}</th>
              <th scope="row">{people.fields.education}</th>
              <th scope="row">{people.fields.degree}</th>
              <th scope="row">{people.fields.email}</th>
              <th scope="row">{people.fields.address}</th>
              <th scope="row">{people.fields.postalCode}</th>
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
                  name={people.fields.name}
                  position={people.fields.position}
                  department={people.fields.department}
                  education={people.fields.education}
                  degree={people.fields.degree}
                  email={people.fields.email}
                  address={people.fields.address}
                  postalCode={people.fields.postalCode}
                  handleUpdateClick={handleUpdateClick}
                ></ModalForm>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListGroup;
