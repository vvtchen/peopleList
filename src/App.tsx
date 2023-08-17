import ListGroup from "./components/ListGroup";
import NavBar from "./components/NavBar";
import CreateNew from "./components/CreateNew";
import TemplateCreate from "./components/TemplateCreate";

function App() {
  let Page: React.ComponentType = ListGroup;
  switch (window.location.pathname) {
    case "/":
      Page = ListGroup;
      break;
    case "/createNew":
      Page = CreateNew;
      break;
    case "/templateCreate":
      Page = TemplateCreate;
      break;
  }
  return (
    <>
      <NavBar />
      <div className="page">
        <Page></Page>
      </div>
    </>
  );
}

export default App;
