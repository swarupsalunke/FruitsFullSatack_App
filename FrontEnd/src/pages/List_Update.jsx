import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const List_Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    pic: "",
    price: ""
  });

  useEffect(() => {
    axios.get(`http://localhost:4000/${id}`).then((res) => {
      setForm({
        name: res.data.name,
        pic: res.data.pic,
        price: res.data.price
      });
    });
  }, [id]);

  // Validation
  const validate = () => {
    let errors = [];

    if (!/^[A-Za-z\s]+$/.test(form.name)) {
      errors.push("Name must contain only letters.");
    }

    try {
      new URL(form.pic);
    } catch (_) {
      errors.push("Image URL is invalid.");
    }

    if (isNaN(form.price) || Number(form.price) <= 0) {
      errors.push("Price must be a positive number.");
    }

    if (errors.length > 0) {
      errors.forEach((err) => toast.error(err)); // Toastify error
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await axios.put(`http://localhost:4000/${id}`, form);
      toast.success("Updated Successfully!");

      setTimeout(() => navigate("/"), 1500); // थोड़ा time देकर redirect
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
      {/* Toast Container */}
      <ToastContainer position="bottom-right" autoClose={2000} />

      <div
        style={{
          width: "320px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
          textAlign: "center"
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Update Fruits</h2>

        <input
          type="text"
          value={form.name}
          placeholder="Enter Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #aaa",
            marginBottom: "15px"
          }}
        />

        <input
          type="text"
          value={form.pic}
          placeholder="Enter Image URL"
          onChange={(e) => setForm({ ...form, pic: e.target.value })}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #aaa",
            marginBottom: "15px"
          }}
        />

        <input
          type="number"
          value={form.price}
          placeholder="Enter Price"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #aaa",
            marginBottom: "20px"
          }}
        />

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#628141",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default List_Update;
