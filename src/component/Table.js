import { React, useEffect, useState } from "react";
import "../style/table.css";
import axios from "axios";
import Swal from "sweetalert2";
export default function Table() {
  const [buku, setBuku] = useState([]); // useState menyimpan data sementara
  const [judul, setJudul] = useState([]);
  const [deskripsi, setDeskripsi] = useState([]);
  const [pengarang, setPengarang] = useState([]);
  const[tahunTerbit,setTahunTerbit] = useState([]);
  const[bookId,setBookId] = useState(0);

  const getAllBuku = async () => {
    await axios
      .get("http://localhost:8000/daftarBuku")
      .then((reponse) => {
        setBuku(reponse.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getBukuById = (book) => {
    setBookId(book.id);
    setJudul(book.judul);
    setDeskripsi(book.deskripsi);
    setPengarang(book.pengarang);
    setTahunTerbit(book.tahunTerbit);
  }

  const updateBuku = async (e) => {
    e.preventDefault();
      await axios.put("http://localhost:8000/daftarBuku/" + bookId, {
        judul: judul,
        deskripsi: deskripsi,
        pengarang: pengarang,
        tahunTerbit:tahunTerbit
      }).then(() =>{
        setBookId(0)
        Swal.fire("Berhasil!", "Data Berhasil Diupdate", "success");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }).catch((err) =>{
        alert(err)
        console.log(err);
      })
   
  };
  const deleteBuku = async (id) => {
    await axios.delete("http://localhost:8000/daftarBuku/" + id).then(() => {
      Swal.fire("Berhasil!", "Data Berhasil Dihapus", "success");
    });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  useEffect(() => {
    getAllBuku();
  }, []);
  return (
    <div>
      <div>
        <h1>Form Edit Buku</h1>
        <form className="editBuku" onSubmit={updateBuku}>
          <div className="input">
            <label htmlFor="judul">Judul: </label>
            <br />
            <input type="text" name="judul" id="judul" value={judul} onChange={(e) => setJudul(e.target.value)} required />
          </div>
          <div className="input">
            <label htmlFor="deskripsi">Deskripsi: </label>
            <br />
            <input type="text" name="desripsi" id="deskripsi" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} required />
          </div>
          <div className="input">
            <label htmlFor="tahunTerbit">Tahun Terbit: </label>
            <br />
            <input type="date" name="tahunTerbit" id="tahunTerbit" value={tahunTerbit} onChange={(e) => setTahunTerbit(e.target.value)} required />
          </div>
          <div className="input">
            <label htmlFor="pengarang">Pengarang: </label>
            <br />
            <input type="text" name="pengarang" id="pengarang" value={pengarang} onChange={(e) => setPengarang(e.target.value)} required />
          </div>
       
          <br />
          <button type="submit">Update</button>
        </form>
      </div>
    <div className="daftar">
      <h1>Daftar Buku</h1>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Deskripsi</th>
            <th>Tahun Terbit</th>
            <th>Pengarang</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {buku.map((book, index) => {
            return (
              <tr key={book.id}>
                <td>{index + 1}</td>
                <td>{book.judul}</td>
                <td>{book.deskripsi}</td>
                <td>{book.tahunTerbit}</td>
                <td>{book.pengarang}</td>
                <td>
                  <div className="action">
                    <button className="edit" onClick={() => getBukuById(book)}>
                      Edit
                    </button>
                    <button
                      className="hapus"
                      onClick={() => deleteBuku(book.id)}
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </div>
  );
}
