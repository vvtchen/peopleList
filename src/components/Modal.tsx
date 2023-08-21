import { useState } from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import { IconButton } from "@mui/material";

const API_ENDPOINT = window.location.origin + "/api";
type ModalFormProps = {
  pk: number;
  name: string;
  position: string;
  department: string;
  education: string;
  degree: string;
  email: string;
  address: string;
  postalCode: number;
  handleUpdateClick: (target: Partial<ModalFormProps>, pk: number) => void;
};

const ModalForm: React.FC<ModalFormProps> = ({
  pk,
  name,
  position,
  department,
  education,
  degree,
  email,
  address,
  postalCode,
  handleUpdateClick,
}) => {
  const [show, setShow] = useState(false);

  type FormState = {
    name: string;
    position: string;
    department: string;
    education: string;
    degree: string;
    email: string;
    address: string;
    postalCode: number;
  };

  const [formState, setFormState] = useState<FormState>({
    name: name,
    position: position,
    department: department,
    education: education,
    degree: degree,
    email: email,
    address: address,
    postalCode: postalCode,
  });

  const [originalState, setOriginalState] = useState<FormState>({
    name: name,
    position: position,
    department: department,
    education: education,
    degree: degree,
    email: email,
    address: address,
    postalCode: postalCode,
  });

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setFormState(originalState);
    setShow(false);
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    const updateField: Partial<FormState> = {};
    Object.keys(formState).forEach((key: string) => {
      const ele = key as keyof FormState;
      if (formState[ele] !== originalState[ele]) {
        (updateField as any)[ele] = formState[ele];
      }
    });
    const size = Object.keys(updateField).length;
    if (size > 0) {
      try {
        const response = await fetch(`${API_ENDPOINT}/update/${pk}`, {
          method: "PUT",
          body: JSON.stringify(updateField),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          handleUpdateClick(updateField, pk);
          setOriginalState(formState);
          setShow(false);
        }
      } catch (error: any) {
        throw new Error(`HTTP error! Status: ${error.message}`);
      }
      setOriginalState(formState);
      setShow(false);
    } else {
      setShow(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "postalCode") {
      const postal = parseInt(value, 10);
      setFormState((prevState) => ({ ...prevState, postalCode: postal }));
    } else {
      setFormState((prevState) => ({ ...prevState, [name]: value }));
    }
  };
  return (
    <>
      <IconButton
        aria-label="edit"
        size="small"
        color="primary"
        onClick={handleShow}
      >
        <FontAwesomeIcon icon={faExternalLink} />
      </IconButton>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>資料更新</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  姓名
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id="name"
                  onChange={handleChange}
                  value={formState.name}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="position" className="form-label">
                  職稱
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="position"
                  id="position"
                  onChange={handleChange}
                  value={formState.position}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="department" className="form-label">
                  部門
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="department"
                  id="department"
                  onChange={handleChange}
                  value={formState.department}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="education" className="form-label">
                  學歷
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="education"
                  id="education"
                  value={formState.education}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="degree" className="form-label">
                  科系
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="degree"
                  name="degree"
                  value={formState.degree}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  信箱
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  地址
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  id="address"
                  value={formState.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="postalCode" className="form-label">
                  郵遞區號
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="postalCode"
                  id="postalCode"
                  value={formState.postalCode}
                  onChange={handleChange}
                  required
                />
              </div>
            </form>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            取消
          </Button>
          <Button variant="primary" onClick={handleSave}>
            儲存
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalForm;
