import './Tail.css'
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Selecto from 'react-selecto';

const GridBoxes = () => {

  const { fromDate, toDate, numberValue } = useSelector((state) => state.date);
  const [selected, setSelected] = useState([]);
  const [error,setError]=useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const diff = Math.ceil((new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24)) + 1;
  

  const dateRange = Array.from({ length: diff }, (_, i) => {
    const currentDate = new Date(fromDate);
    currentDate.setDate(currentDate.getDate() + i);
    return currentDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).replace(' ', '-');
  });
  
  const boxes = Array.from({ length: 30*diff }, (_, i) => ({
    id: i + 1,
  }));

  const getTimeSlot = (cellId) => {
    const timeIndex = Math.floor((cellId - 1) / diff);
    const dayIndex = (cellId - 1) % diff;

    const startHour = 8 + Math.floor(timeIndex / 2);
    const startMinute = (timeIndex % 2) * 30;
    const endHour = startMinute === 0 ? startHour : startHour + 1;
    const endMinute = startMinute === 0 ? 30 : 0;

    const timeStart = `${startHour}:${startMinute === 0 ? '00' : '30'}`;
    const timeEnd = `${endHour}:${endMinute === 0 ? '00' : '30'}`;

    const currentDate = new Date(fromDate);
    currentDate.setDate(currentDate.getDate() + dayIndex);
    const dateStr = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    return `${dateStr} ${timeStart}-${timeEnd}`;
  };

  return (
    <div className="h-screen w-screen p-2 flex flex-col gap-2 overflow-auto">
      
  
      <div className="flex">
        <div className="min-w-10 "></div>
        <motion.div 
         initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
          className="grid gap-2 flex-1"
          style={{
            gridTemplateColumns: `repeat(${diff}, minmax(0, 1fr))`
          }}
        >
          {dateRange.map((date, i) => {
            const currentDate = new Date(fromDate);
            currentDate.setDate(currentDate.getDate() + i);
            const dayOnly = currentDate.getDate();

            return (
              <div key={i} className="text-center text-sm font-semibold text-gray-700 p-2">
                {(window.innerWidth < 490 && diff > 10) ? dayOnly : date}
              </div>
            );
          })}
        </motion.div>
      </div>

     
      <div className="flex  gap-2  flex-1 ">
        
        <motion.div
         initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
          className="grid "
        >
          {Array.from({ length: 30 }, (_, i) => {
            if (i % 2 === 0) {
              const timeLabel = Math.floor(i / 2) + 8;
              if (timeLabel <= 23) {
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
        </motion.div>

        
        <motion.div
           initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
        
          className="grid gap-1 flex-1 "
          style={{
           
            gridTemplateColumns: `repeat(${diff}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(30, minmax(0, 1fr))`,
            maxHeight: '100%'
          }}
        >
        {boxes.map((box) => {
          const isSelected = selected.includes(box.id);
          return (
            <div
              key={box.id}
              data-id={box.id}
              className={`selectable rounded-lg shadow-lg border-2 p-1 ${
                isConfirmed
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              } ${
                isSelected
                  ? "bg-blue-400 border-blue-400"
                  : "bg-white border-gray-300 hover:bg-blue-200"
              }`}

              onClick={(e) => {

                if (!isDragging && !isConfirmed) {
                  setError(''); 
                  
                  if (!selected.includes(box.id)) {
                    const maxSelections = numberValue * 10;
                    if (selected.length >= maxSelections) {
                      setError(`Maximum ${maxSelections} selections allowed `);
                      setTimeout(() => setError(""), 3000);
                      return;
                    }
                  }
                  
                  setSelected((prev) => {
                    const newSelection = prev.includes(box.id)
                      ? prev.filter((id) => id !== box.id)
                      : [...prev, box.id];
                  
                    return newSelection;
                  });
                } 
              }}
            />
          );
        })}
        </motion.div>
      </div>
      
      <Selecto
        selectableTargets={[".selectable"]}
        selectByClick={false}
        selectFromInside={true}

        
        hitRate={5}
        onDragStart={() => {
          if (!isConfirmed) {
            setIsDragging(true);
            setError('');
          }
        }}
        onSelect={(e) => {
          if (!isConfirmed) {
            const selectedIds = e.selected.map(el => parseInt(el.dataset.id));

            setSelected(prev => {
              const combined = [...new Set([...prev, ...selectedIds])];
              return combined;
            });
          }
        }}
        onSelectEnd={(e) => {
          if (!isConfirmed) {
            setIsDragging(false);

            const maxSelections = numberValue * 10;
            setSelected(prev => {
              if (prev.length > maxSelections) {
                setError(`Maximum ${maxSelections} selections allowed`);
                setTimeout(() => setError(""), 3000);
                return prev.slice(0, maxSelections);
              }
              return prev;
            });
          }
        }}
      />

      <div className="flex justify-center gap-10">
   
      


        <motion.button
            initial={{ opacity: 0, x: -50}}   
    animate={{ opacity: 1, x: 0 }}    
         transition={{ duration: 0.4,ease: 'easeOut' }}
            whileHover={{scale:1.02}}
   whileTap={{scale:.97}}
         onClick={() => {
           if (isConfirmed) {
             setIsConfirmed(false);
           } else {
             setIsConfirmed(true);
           }
         }}
         disabled={error}
    className={`bottom-4 rounded-xl w-60 mt-3 text-white text-center font-semibold ${
      isConfirmed
        ? 'bg-green-600 hover:bg-green-700'
        : 'bg-blue-400 hover:bg-blue-600'
    }`}>

          {isConfirmed ? 'Selection Confirmed' : 'Confirm Select'}
        
      </motion.button>

           <motion.button
                    initial={{ opacity: 0, x: -50}}   
    animate={{ opacity: 1, x: 0 }}    
         transition={{ duration: 0.4,ease: 'easeOut' }}
            whileHover={{scale:1.02}}
   whileTap={{scale:.97}}
          onClick={() => {
            setSelected([]);
            setIsConfirmed(false);
          }}
          className=" bottom-4 rounded-xl hover:bg-red-600  w-60 mt-3 text-white text-center font-semibold bg-red-400">
          Clear All ({selected.length})
        </motion.button>

        </div>



      {error && (
         <div className="fixed top-10 left-0 right-0 text-center">


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
       <div>
                {selected.length > 0 && (
        <div className="mt-2 p-4 bg-gray-100 rounded-lg max-h-40 overflow-y-auto">
          <h3 className="font-semibold mb-2">Selected Time Slots:</h3>
          <div className="flex flex-wrap gap-2">
            {selected.map(cellId => (
              <div key={cellId} className="bg-gray-500 text-white px-3 py-1 rounded-xl shadow-xl text-sm">
                {getTimeSlot(cellId)}
              </div>
            ))}
          </div>
        </div>
      )}
        </div>
    </div>

       

  );
};

export default GridBoxes;