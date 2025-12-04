import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const List = () => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const res = await axios.get("http://localhost:4000/");
      setList(res.data);
    }
    getData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:4000/${id}`);
      toast.success("Deleted Successfully!");

      setList(list.filter((u) => u.id !== id));
    } catch (error) {
      toast.error("Failed to delete!");
    }
  };

  const filteredList = list.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "10px" }}>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={2000} />

      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        List of Fruits
      </h1>

      {/* Search Bar */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by Fruit Name..."
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid #aaa",
          boxSizing: "border-box",
        }}
      />

      {/* Add Fruit Button */}
      <button
        onClick={() => navigate("/add")}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          backgroundColor: "#B77466",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Add Fruit
      </button>

      {/* Fruit Cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "space-between",
        }}
      >
        {filteredList.length > 0 ? (
          filteredList.map((u) => (
            <div
              key={u.id}
              style={{
                flex: "0 0 48%",
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "10px",
                backgroundColor: "#f9f9f9",
                boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
                textAlign: "center",
                boxSizing: "border-box",
              }}
            >
              <h2 style={{ margin: "5px 0" }}>{u.name}</h2>

              <img
                src={u.pic}
                alt={u.name}
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "10px",
                  objectFit: "cover",
                  marginBottom: "15px",
                }}
              />

              <p
                style={{
                  fontSize: "18px",
                  marginBottom: "15px",
                  color: "#444",
                }}
              >
                Price: {u.price}
              </p>

              <button
                style={{
                  padding: "8px 15px",
                  backgroundColor: "#604652",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
                onClick={() => navigate(`/update/${u.id}`)}
              >
                UPDATE
              </button>

              <button
                style={{
                  padding: "8px 15px",
                  backgroundColor: "#FF6363",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => handleDelete(u.id)}
              >
                DELETE
              </button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", marginTop: "20px", width: "100%" }}>
            No results found.
          </p>
        )}
      </div>
    </div>
  );
};

export default List;
