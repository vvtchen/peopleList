import * as xlsx from "xlsx";
import TemplateExplain from "./TemplateExplain";

const API_ENDPOINT = "http://127.0.0.1:8000/api/";

const checkTemplate = (template: Object[]) => {
  const checker = [
    "name",
    "position",
    "department",
    "education",
    "degree",
    "email",
    "address",
    "postalCode",
  ];
  const checkPoint = Object.keys(template[0]);

  for (let i = 0; i < checker.length; i++) {
    if (checker[i] !== checkPoint[i]) {
      return false;
    }
  }

  return true;
};

const checkEmpty = (template: Object[]) => {
  for (let i = 0; i < template.length; i++) {
    const values = Object.values(template[i]);
    for (let j = 0; j < values.length; j++) {
      if (values[j] == "") return false;
    }
  }
  return true;
};

const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const fileInput = formData.get("file") as File;

  if (fileInput.size !== 0) {
    const reader = new FileReader();

    reader.onload = async (e: ProgressEvent<FileReader>) => {
      if (e.target && e.target.result) {
        const data = e.target.result as ArrayBuffer;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet, {
          blankrows: false,
          defval: "",
        });

        if (checkTemplate(json as Object[]) && checkEmpty(json as Object[])) {
          try {
            const response = await fetch(`${API_ENDPOINT}templateCreate`, {
              method: "POST",
              body: JSON.stringify(json),
              headers: {
                "Content-Type": "application/json",
              },
            });
            console.log(response.status);
            if (response.status == 201) {
              const inform = window.confirm("資料已成功建立");
              if (inform) {
                window.location.pathname = "/";
              }
            }
          } catch (error: any) {
            throw new Error(`HTTP error! Status: ${error.message}`);
          }
        } else if (!checkTemplate(json as Object[])) {
          window.alert(
            "模板欄位名稱錯誤: 正確欄位名稱：name, position, department, education, degree, email, address, postalCode"
          );
        } else if (!checkEmpty(json as Object[])) {
          window.alert("模板中缺少資料");
        } else {
          window.alert("模板欄位名稱錯誤及模板中缺少資料");
        }
      }
    };

    reader.readAsArrayBuffer(fileInput);
  }
};

function TemplateCreate() {
  return (
    <div>
      <TemplateExplain></TemplateExplain>
      <div>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <input
              className="form-control"
              type="file"
              accept=".xlsx"
              name="file"
              id="upload"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default TemplateCreate;
