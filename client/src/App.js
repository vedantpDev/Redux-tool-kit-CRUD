import react, { Component } from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import AddTutorial from "./components/AddTutorialComponent";
import Tutorial from "./components/Tutorial.component";
import TutorialList from "./components/Tutorial-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/tutorials"} className="navbar-brand">
            Demo Project
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                Tutorials
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<TutorialList />} />
            <Route path="/tutorials" element={<TutorialList />} />
            <Route path="/add" element={<AddTutorial />} />
            <Route path="/tutorials/:id" element={<Tutorial />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
