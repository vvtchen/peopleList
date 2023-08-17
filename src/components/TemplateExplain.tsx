const TemplateExplain = () => {
  return (
    <div>
      <h1>Excel 格式範例</h1>
      <p>
        欄位順序依序為 name, position, department, education, degree, email,
        address, postalCode
      </p>
      <table className="table">
        <thead>
          <tr className="table-primary">
            <th scope="col">name</th>
            <th scope="col">position</th>
            <th scope="col">department</th>
            <th scope="col">education</th>
            <th scope="col">degree</th>
            <th scope="col">email</th>
            <th scope="col">address</th>
            <th scope="col">postalCode</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">王小明</th>
            <th scope="row">會計</th>
            <th scope="row">財務部</th>
            <th scope="row">東吳大學</th>
            <th scope="row">會計系</th>
            <th scope="row">adbs@gmail.com</th>
            <th scope="row">高雄市海港路2號</th>
            <th scope="row">123</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TemplateExplain;
