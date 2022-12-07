import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";

function NavigationBar() {
  //useState untuk menyimpan data sementara
  const [show, setShow] = useState(false);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [pengarang, setPengarang] = useState("");
  const [tahunTerbit, setTahunTerbit] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //fungtion untuk menambahkan data
  const addBuku = async (e) => {
    e.preventDefault();
    e.persist();

    //try catch untuk memastikan terjadi kesalahan
    try {
      // library opensource yang digunakan untuk request data melalui http.
      await axios.post("http://localhost:8000/daftarBuku", {
        judul: judul,
        deskripsi: deskripsi,
        tahunTerbit: tahunTerbit,
        pengarang: pengarang,
      });
      //Sweet Alert
      Swal.fire("Berhasil!", "Data Berhasil Ditambahkan", "success");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const history = useHistory();
  const logout = () => {
    window.location.reload();
    localStorage.clear();
    history.push("/");
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Perpustakaan Sederhana</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              {localStorage.getItem("id") !== null ? (
                <>
                  <Nav.Link href="#modal" onClick={handleShow}>
                    Tambah Buku
                  </Nav.Link>
                  <Nav.Link onClick={logout}>
                      Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="/login">Login</Nav.Link>
                </>
              )}

              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="/">Action</NavDropdown.Item>
                <NavDropdown.Item href="/">Another action</NavDropdown.Item>
                <NavDropdown.Item href="/">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Buku</Modal.Title>
        </Modal.Header>
        <Form onSubmit={addBuku}>
          <Modal.Body>
            <div className="mb-3">
              <Form.Label htmlFor="judul">Judul: </Form.Label>
              <br />
              <Form.Control
                placeholder="Judul"
                required
                type="text"
                name="judul"
                id="judul"
                onChange={(e) => setJudul(e.target.value)}
              />
            </div>
            <div className="input">
              <Form.Label htmlFor="deskripsi">Deskripsi: </Form.Label>
              <br />
              <Form.Control
                placeholder="Deskripsi"
                required
                type="text"
                name="deskripsi"
                id="deskripsi"
                onChange={(e) => setDeskripsi(e.target.value)}
              />
            </div>
            <div className="input">
              <Form.Label htmlFor="tahunTerbit">Tahun Terbit: </Form.Label>
              <br />
              <Form.Control
                placeholder="Tahun Terbit"
                required
                type="date"
                name="tahunTerbit"
                id="tahunTerbit"
                onChange={(e) => setTahunTerbit(e.target.value)}
              />
            </div>
            <div className="input">
              <Form.Label htmlFor="pengarang">Pengarang: </Form.Label>
              <br />
              <Form.Control
                placeholder="Pengarang"
                required
                type="text"
                name="pengarang"
                id="pengarang"
                onChange={(e) => setPengarang(e.target.value)}
              />
            </div>
            <br />
            <Button
              className="mx-1 button-btl btn"
              variant="danger"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              className="mx-1 button-btl btn"
              type="submit"
              variant="primary"
            >
              Save
            </Button>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button className="mx-1 button-btl btn" variant="danger" onClick={handleClose}>Close</Button>
            <Button className="mx-1 button-btl btn" type="submit" variant="primary">
              Save
            </Button> */}
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default NavigationBar;
