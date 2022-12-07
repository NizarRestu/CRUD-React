import React, { useState } from "react";
import "../style/form.css";
import axios from "axios";
import Swal from "sweetalert2";

export default function Form() {
  //useState untuk menyimpan data sementara 
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [pengarang, setPengarang] = useState("");
  const [tahunTerbit, setTahunTerbit] = useState("");


  //fungtion untuk menambahkan data
  const addBuku = async (e) => {
    e.preventDefault();
    e.persist();

    //try catch untuk memastikan terjadi kesalahan
    try {
      //untuk menambahkan data
      await axios.post("http://localhost:8000/daftarBuku", {
        judul: judul,
        deskripsi: deskripsi,
        tahunTerbit: tahunTerbit,
        pengarang: pengarang,
      });
      //Sweet alert
      Swal.fire("Berhasil!", "Data Berhasil Ditambahkan", "success");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      alert("Terjadi Kesalahan" + error);
    }
  };
  return (
    <div>
      <h1>Form Tambah Buku</h1>
      <form onSubmit={addBuku}>
        <div className="input">
          <label htmlFor="judul">Judul: </label>
          <br />
          <input
            placeholder="Judul"
            required
            type="text"
            name="judul"
            id="judul"
            onChange={(e) => setJudul(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="deskripsi">Deskripsi: </label>
          <br />
          <input
            placeholder="Deskripsi"
            required
            type="text"
            name="deskripsi"
            id="deskripsi"
            onChange={(e) => setDeskripsi(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="tahunTerbit">Tahun Terbit: </label>
          <br />
          <input
            placeholder="Tahun Terbit"
            required
            type="date"
            name="tahunTerbit"
            id="tahunTerbit"
            onChange={(e) => setTahunTerbit(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="pengarang">Pengarang: </label>
          <br />
          <input
            placeholder="Pengarang"
            required
            type="text"
            name="pengarang"
            id="pengarang"
            onChange={(e) => setPengarang(e.target.value)}
          />
        </div>
        <br />
        <button type="submit">Tambahkan</button>
      </form>
    </div>
  );
}
