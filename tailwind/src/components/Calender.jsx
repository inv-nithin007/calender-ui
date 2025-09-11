import './Tail.css'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Selecto from 'react-selecto'

export default function Calendar() {
  const location = useLocation()
  const { columns, fromDate, toDate } = location.state || { 
    columns: 5, fromDate: '', toDate: '' 
  }
  
  const rows = 24
  const [selected, setSelected] = useState([])
  const totalBoxes = rows * columns


  return (
    <div className="p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Select Time Slots</h2>
        <p className="text-sm text-gray-600">
          From: {fromDate} | To: {toDate} | Grid: 24 rows × {columns} columns
        </p>
      </div>

      <div 
        className="calendar grid gap-2"
        style={{
          gridTemplateRows: `repeat(24, minmax(0, 1fr))`,
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
        }}
      >
        {Array.from({ length: totalBoxes }, (_, i) => {
          const isActive = selected.includes(i + 1)
          return (
            <div
              key={i}
              data-key={i + 1}
              className={`day-cell border rounded-md p-4 text-center cursor-pointer transition 
              ${isActive ? "bg-blue-400 text-white" : "hover:bg-gray-200"}`}
              onClick={() => {
                setSelected(prev =>
                  prev.includes(i + 1)
                    ? prev.filter(d => d !== i + 1)
                    : [...prev, i + 1]
                )
              }}
            />
          )
        })}
      </div>

      <Selecto
        selectableTargets={[".day-cell"]}
        selectByClick={false}
        hitRate={0}
        onSelect={e => {
          const keys = e.selected.map(el => parseInt(el.dataset.key))
          setSelected(keys)
        }}
      />

      <div className="mt-4 flex items-center justify-between">
        <div className="font-semibold">
          Selected: {selected.length} boxes
        </div>
        {selected.length > 0 && (
          <button
            onClick={() => setSelected([])}
            className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg transition"
          >
            Deselect All
          </button>
        )}
      </div>
    </div>
  )
}