import React, { useState } from "react";

type FormState = {
  name: string;
  position: string;
  department: string;
  education: string;
  degree: string;
  email: string;
  address: string;
  postalCode: number | null;
};
const API_ENDPOINT = window.location.origin + "/api";

const CreateNew = () => {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    position: "",
    department: "",
    education: "",
    degree: "",
    email: "",
    address: "",
    postalCode: null,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "postalCode") {
      const postal = value ? parseInt(value, 10) : null;
      setFormState((prevState) => ({ ...prevState, postalCode: postal }));
    } else {
      setFormState((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API_ENDPOINT}/createNew`, {
        method: "POST",
        body: JSON.stringify(formState),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 201) {
        const result = await response.json();
        window.alert(JSON.stringify(result));
      } else {
        window.alert("資料已成功建立");
        window.location.pathname = "/";
      }
    } catch (error: any) {
      throw new Error(`HTTP error! Status: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>新增人員</h1>
      <form onSubmit={handleSubmit}>
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
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
