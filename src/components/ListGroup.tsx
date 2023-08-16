import { IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faExternalLink } from "@fortawesome/free-solid-svg-icons";

type Person = {
  id: number;
  name: string;
  position: string;
  department: string;
  eduaction: string;
  degree: string;
  email: string;
  address: string;
  postalCode: number;
};

function handleButtonClick(
  action: "delete" | "edit",
  personData: Person
): void {
  if (action === "delete") {
    console.log("Delete action called for:", personData);
    // Delete logic goes here
  } else if (action === "edit") {
    console.log("Edit action called for:", personData);
    // Edit logic goes here
  }
}

function ListGroup() {
  let lists: Person[] = [
    {
      id: 1,
      name: "John",
      position: "國內業務",
      department: "業務部",
      eduaction: "中興大學",
      degree: "企業管理",
      email: "abc@gmail.com",
      address: "桃園市一路3號",
      postalCode: 337,
    },
    {
      id: 1,
      name: "John",
      position: "國內業務",
      department: "業務部",
      eduaction: "中興大學",
      degree: "企業管理",
      email: "abc@gmail.com",
      address: "桃園市一路3號",
      postalCode: 337,
    },
  ];

  return (
    <>
      <h1>人員名單</h1>
      {lists.length === 0 && <p>目前無人員資料</p>}

      <table className="table">
        <thead>
          <tr>
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
            <tr>
              <th scope="row">{people.id}</th>
              <th scope="row">{people.name}</th>
              <th scope="row">{people.position}</th>
              <th scope="row">{people.department}</th>
              <th scope="row">{people.eduaction}</th>
              <th scope="row">{people.degree}</th>
              <th scope="row">{people.email}</th>
              <th scope="row">{people.address}</th>
              <th scope="row">{people.postalCode}</th>
              <th scope="row">
                <IconButton
                  aria-label="delete"
                  size="small"
                  color="error"
                  onClick={() => handleButtonClick("delete", people)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </IconButton>
                <IconButton
                  aria-label="edit"
                  size="small"
                  color="primary"
                  onClick={() => handleButtonClick("edit", people)}
                >
                  <FontAwesomeIcon icon={faExternalLink} />
                </IconButton>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ListGroup;
