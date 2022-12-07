import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
export default function Home() {
  //useState untuk menyimpan data sementara
  const [buku, setBuku] = useState([]);
  //method untuk menjalankan axios
  const getAll = async () => {
    // library opensource yang digunakan untuk request data melalui http.
    await axios
      .get("http://localhost:8000/daftarBuku")
      .then((res) => {
        setBuku(res.data);
      })
      .catch((error) => {
        alert("terjadi kesalahan" + error);
      });
  };

  useEffect(() => {
    getAll();
  }, []);

  const deleteUser = async (id) => {
    Swal.fire({
      title: "Apakah Ingin Di Hapus?",
      text: "Data kamu tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("http://localhost:8000/daftarBuku/" + id);
        Swal.fire("Berhasil!", "Data kamu berhasil di hapus.", "success");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    });
  };
  //untuk mengatur kapan menjalankan method yang ada didalam
  return (
    <div>
      <Table
        striped
        bordered
        hover
        className="bg-light"
        style={{ width: "80%", margin: "auto", marginTop: "40px" }}
      >
        <thead className="bg-dark text-light">
          <tr>
            <th>No.</th>
            <th>Judul</th>
            <th>Deskripsi</th>
            <th>Tahun Terbit</th>
            <th>Pengarang</th>
            <th>Aksi</th>
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
                  <a href={"/edit/" + book.id}>
                    <Button variant="success" className="mx-1">
                      Ubah
                    </Button>
                  </a>
                  <Button
                      variant="danger"
                      className="mx-1"
                      onClick={() => deleteUser(book.id)}
                    >
                      Hapus
                    </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
