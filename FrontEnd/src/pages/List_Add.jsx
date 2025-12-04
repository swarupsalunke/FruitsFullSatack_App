import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const List_Add = () => {
  const [name, setName] = useState("")
  const [pic, setPic] = useState("")
  const [price, setPrice] = useState("")

  const navigate = useNavigate()

  const validate = () => {
    let errors = []

    if (!/^[A-Za-z\s]+$/.test(name)) {
      errors.push("Name must contain only letters.")
    }

    try {
      new URL(pic)
    } catch (_) {
      errors.push("Image URL is invalid.")
    }

    if (isNaN(price) || Number(price) <= 0) {
      errors.push("Price must be a positive number.")
    }

    if (errors.length > 0) {
      errors.forEach(err => toast.error(err))
      return false
    }
    return true
  }

  function addData(e) {
    e.preventDefault()

    if (!validate()) return

    axios.post("http://localhost:4000/", { name, pic, price })
      .then(() => {
        toast.success("Added Successfully!")
        setName("")
        setPic("")
        setPrice("")
        setTimeout(() => navigate("/"), 1500)
      })
      .catch(() => toast.error("Something went wrong"))
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
      <form
        onSubmit={addData}
        style={{
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '10px',
          width: '300px',
          textAlign: 'center',
          backgroundColor: '#f9f9f9'
        }}
      >
        <h2 style={{ marginBottom: '20px' }}>Add the Fruits</h2>

        <input
          value={name}
          type="text"
          placeholder="Enter Fruit Name"
          onChange={(e) => setName(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '5px',
            border: '1px solid #aaa'
          }}
        />

        <input
          value={pic}
          type="text"
          placeholder="Enter Image URL"
          onChange={(e) => setPic(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '5px',
            border: '1px solid #aaa'
          }}
        />

        <input
          value={price}
          type="number"
          placeholder="Enter Price"
          onChange={(e) => setPrice(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '5px',
            border: '1px solid #aaa'
          }}
        />

        <input
          type="submit"
          value="Add"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#6B3F69',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        />
      </form>

      <ToastContainer position="bottom-right" />
    </div>
  )
}

export default List_Add
