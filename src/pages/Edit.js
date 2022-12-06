import axios from "axios";
import React, { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import '../style/edit.css'

export default function Edit() {
  const param = useParams();
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [pengarang, setPengarang] = useState("");
  const [tahunTerbit, setTahunTerbit] = useState("");

  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:8000/daftarBuku/" + param.id)
      .then((response) => {
        const newBook = response.data;
        setJudul(newBook.judul);
        setDeskripsi(newBook.deskripsi);
        setPengarang(newBook.pengarang);
        setTahunTerbit(newBook.tahunTerbit);
      }).catch((error) => {
        alert("Terjadi Kesalahan " + error)
      })
  },[]);

  const submitActionHandler = async (e) => {
    e.preventDefault();

    await axios.put("http://localhost:8000/daftarBuku/" + param.id, {
        judul: judul,
        deskripsi: deskripsi,
        pengarang: pengarang,
        tahunTerbit:tahunTerbit
    }).then(() =>{
        Swal.fire("Berhasil!", "Data Berhasil Diupdate", "success");
        setTimeout(() => {
          history.push("/");
        }, 2000);
      }).catch((err) =>{
        alert(err)
        console.log(err);
      })
  }
  return (
    <div className="parentBox">
      <Form onSubmit={submitActionHandler} className="box">
        <h5>Edit Buku</h5>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <div className="mb-3">
            <Form.Label>Judul: </Form.Label>
            <br />
            <Form.Control
              placeholder="Judul"
              required
              type="text"
              name="judul"
             
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
            />
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <div className="input">
            <Form.Label
            >Deskripsi: </Form.Label>
            <br />
            <Form.Control
              placeholder="Deskripsi"
              required
              type="text"
              name="deskripsi"
             
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
            />
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <div className="input">
            <Form.Label>Tahun Terbit: </Form.Label>
            <br />
            <Form.Control
              placeholder="Tahun Terbit"
              required
              type="date"
              name="tahunTerbit"
             
              value={tahunTerbit}
              onChange={(e) => setTahunTerbit(e.target.value)}
            />
          </div>
        </Form.Group>
        <Form.Group>
          <div className="input">
            <Form.Label>Pengarang: </Form.Label>
            <br />
            <Form.Control
              placeholder="Pengarang"
              required
              type="text"
              name="pengarang"
             
              value={pengarang}
              onChange={(e) => setPengarang(e.target.value)}
            />
          </div>
        </Form.Group>
        <Button className="button" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
