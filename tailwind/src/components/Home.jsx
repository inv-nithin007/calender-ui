import './Tail.css'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  const [number, setNumber] = useState("")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")

  const handleLogout = () => {
    navigate("/") 
  }

  const handleCalculate = () => {
    alert(`Number: ${number}\nFrom: ${fromDate}\nTo: ${toDate}`)
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-start bg-blue-100 p-10 space-y-6">

      <motion.h2 
        className="text-4xl font-bold mt-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Welcome Admin
      </motion.h2>

      
      <motion.input
        type="number"
        value={number}
          onChange={(e) => {
    const val = e.target.value;
    if (val <= 40) setNumber(val); 
  }}
        placeholder="Enter a number(Max-40)"
        className="p-3 w-full max-w-md rounded-2xl border border-gray-400 text-center focus:outline-none text-xl"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      />

     
      <motion.input
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
        className="p-3 w-full max-w-md rounded-2xl border border-gray-400 text-center focus:outline-none text-xl"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6}}
      />

     
      <motion.input
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
        className="p-3 w-full max-w-md rounded-2xl border border-gray-400 text-center focus:outline-none text-xl"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      />

     
      <div className="flex space-x-4 mt-5">
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-400 hover:bg-red-500 text-white font-semibold rounded-3xl px-6 py-3 shadow-lg"
        >
          Logout
        </motion.button>

        <motion.button
          onClick={handleCalculate}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-400 hover:bg-green-500 text-white font-semibold rounded-3xl px-6 py-3 shadow-lg"
        >
          Calculate
        </motion.button>
      </div>
    </div>
  )
}
