import './Tail.css'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { setFromDate, setToDate, setNumberValue } from '../store/dateSlice'

export default function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState("")
  
  const { register, handleSubmit } = useForm()

  const handleLogout = () => {
    navigate("/") 
  }

  const onSubmit = (data) => {
    setError("")
    
    if (!data.fromDate) {
      setError("From date is required")
      setTimeout(() => setError(""), 4000)
      return
    }
    
    if (!data.toDate) {
      setError("To date is required")
      setTimeout(() => setError(""), 4000)
      return
    }
    
    if (!data.numberValue) {
      setError("Number is required")
      setTimeout(() => setError(""), 4000)
      return
    }
    
    if (data.numberValue < 1 || data.numberValue > 40) {
      setError("Number must be between 0 and 40")
      setTimeout(() => setError(""), 4000)
      return
    }
    
    if (new Date(data.fromDate) > new Date(data.toDate)) {
      setError("To date must be after from date")
      setTimeout(() => setError(""), 4000)
      return
    }

    const daysDiff = Math.ceil((new Date(data.toDate) - new Date(data.fromDate)) / (1000 * 60 * 60 * 24)) + 1;
    if (daysDiff > 30) {
      setError("Date range cannot exceed 30 days")
      setTimeout(() => setError(""), 4000)
      return
    }

    dispatch(setFromDate(data.fromDate))
    dispatch(setToDate(data.toDate))
    dispatch(setNumberValue(data.numberValue))
    navigate('/calender')
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

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center space-y-10">
        <motion.input
          type="date"
          {...register('fromDate')}
          className="p-3 w-full max-w-md rounded-2xl border border-gray-400 text-center focus:outline-none text-xl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6}}
        />

        <motion.input
          type="date"
          {...register('toDate')}
          className="p-3 w-full max-w-md rounded-2xl border border-gray-400 text-center focus:outline-none text-xl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        />

        <motion.input
          type="number"
          {...register('numberValue')}
          placeholder="Enter number (0-40)"
          className="p-3 w-full max-w-md rounded-2xl border border-gray-400 text-center focus:outline-none text-xl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        />

        <motion.div
           initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
        className="flex space-x-4 mt-5">
          <motion.button
            type="button"
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-400 hover:bg-red-500 text-white font-semibold rounded-3xl px-6 py-3 shadow-lg"
          >
            Logout
          </motion.button>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-400 hover:bg-green-500 text-white font-semibold rounded-3xl px-6 py-3 shadow-lg"
          >
            Calculate
          </motion.button>
        </motion.div>

        {error && (
          <motion.p
            key={error}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="mt-3 text-red-500 text-center font-semibold"
          >
            {error}
          </motion.p>
        )}
      </form>
    </div>
  )
}
