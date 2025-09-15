import './Tail.css'
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const GridBoxes = () => {

  const { fromDate, toDate, numberValue } = useSelector((state) => state.date);
  const [selected, setSelected] = useState([]);
  const [error,setError]=useState('');

  const diff = Math.ceil((new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24)) + 1;
  

  const dateRange = Array.from({ length: diff }, (_, i) => {
    const currentDate = new Date(fromDate);
    currentDate.setDate(currentDate.getDate() + i);
    return currentDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).replace(' ', '-');
  });
  
  const boxes = Array.from({ length: 28*diff }, (_, i) => ({
    id: i + 1,
  }));

  return (
    <div className="h-screen w-screen p-2 flex flex-col gap-2">
      
  
      <div className="flex">
        <div className="min-w-10 "></div>
        <div 
          className="grid gap-1 flex-1"
          style={{
            gridTemplateColumns: `repeat(${diff}, minmax(0, 1fr))`
          }}
        >
          {dateRange.map((date, i) => (
            <div key={i} className="text-center text-sm font-semibold text-gray-700 p-2">
              {date}
            </div>
          ))}
        </div>
      </div>

     
      <div className="flex  gap-2  flex-1">
        
        <div
          className="grid "
        >
          {Array.from({ length: 30 }, (_, i) => {
            if (i % 2 === 0) {
              const timeLabel = Math.floor(i / 2) + 8;
              if (timeLabel <= 22) {
                return (
                  <div
                    key={i}
                    className="items-center  justify-center text-sm font-semibold text-gray-700 min-w-8"
                  >
                    {timeLabel}
                  </div>
                );
              }
            }
            return <div key={i} />;
          })}
        </div>

        
        <div
          className="grid gap-2 flex-1"
          style={{
           
            gridTemplateColumns: `repeat(${diff}, minmax(0, 1fr))`,
          }}
        >
        {boxes.map((box) => {
          const isSelected = selected.includes(box.id);
          return (
            <motion.div
              key={box.id}
              className={` rounded-lg shadow-lg border-2 cursor-pointer p-1 ${
                isSelected
                  ? "bg-blue-400 border-blue-400"
                  : "bg-white border-gray-300 hover:bg-blue-200"
              }`}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.97 }}
              onTap={() => {
                setError(''); 
                
              
                if (!selected.includes(box.id)) {
                  const maxSelections = numberValue * 10;
                  if (selected.length >= maxSelections) {
                    setError(`Maximum ${maxSelections} selections allowed `);
                    setTimeout(() => setError(""), 3000);
                    return;
                  }
                }
                
                setSelected((prev) =>
                  prev.includes(box.id)
                    ? prev.filter((id) => id !== box.id)
                    : [...prev, box.id]
                );
              }}
            />
          );
        })}
        </div>
      </div>
      

      {error && (
         <div className="fixed bottom-10 left-0 right-0 text-center">


          <motion.div
            key={error}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-100 mx-auto bg-red-500 text-white p-3 rounded-lg shadow-lg font-semibold text-center"
          >
            {error}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default GridBoxes;