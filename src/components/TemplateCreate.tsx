import * as xlsx from "xlsx";

const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const fileInput = formData.get("file") as File | null; // 'file' should match the name attribute of your input

  if (fileInput) {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target && e.target.result) {
        const data = e.target.result as ArrayBuffer;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        console.log(json);
      }
    };

    reader.readAsArrayBuffer(fileInput);
  }
};

function TemplateCreate() {
  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-3">
        <label htmlFor="upload" className="form-label">
          Upload File
        </label>
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
  );
}

export default TemplateCreate;
