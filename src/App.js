import React from 'react';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import PaginationHandler from "./component/PaginationHandler";

function App() {
    return (
        <Container>
            <br/>
            <h2 style={{textAlign: "center"}}>Pagination</h2>
            <PaginationHandler/>
        </Container>
    );
}

export default App;
