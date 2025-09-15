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
    <div className="h-screen w-screen p-2 flex flex-col gap-2 overflow-hidden">
      
  
      <div className="flex">
        <div className="min-w-10 "></div>
        <div 
          className="grid gap-0 flex-1"
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

     
      <div className="flex  gap-2  flex-1 ">
        
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
          className="grid gap-1 flex-1 "
          style={{
           
            gridTemplateColumns: `repeat(${diff}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(28, minmax(0, 1fr))`,
            maxHeight: '100%'
          }}
        >
        {boxes.map((box) => {
          const isSelected = selected.includes(box.id);
          return (
            <div
              key={box.id}
              data-id={box.id}
              className={`selectable rounded-lg shadow-lg border-2 cursor-pointer p-1   ${
                isSelected
                  ? "bg-blue-400 border-blue-400"
                  : "bg-white border-gray-300 hover:bg-blue-200"
              }`}
           
              onClick={(e) => {
                
                if (!isDragging) {
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
        </div>
      </div>
      
      <Selecto
        selectableTargets={[".selectable"]}
      
        selectFromInside={true}
        
        hitRate={5}
        onDragStart={() => {

          setError('');
        }}
        onSelect={(e) => {
          
          setIsDragging(true); 
          
          const selectedIds = e.selected.map(el => parseInt(el.dataset.id));
          
          setSelected(prev => {
            const combined = [...new Set([...prev, ...selectedIds])];
            return combined;
          });
        }}
        onSelectEnd={(e) => {
          
          setTimeout(() => {
            
            setIsDragging(false);
          }, 50);
          
  
          const maxSelections = numberValue * 10;
          setSelected(prev => {
            if (prev.length > maxSelections) {
              setError(`Maximum ${maxSelections} selections allowed`);
              setTimeout(() => setError(""), 3000);
              return prev.slice(0, maxSelections);
            }
            return prev;
          });
        }}
      />

      <div className="fixed top-4 right-4 z-10">
        <button
          onClick={() => setSelected([])}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg font-semibold"
        >
          Clear All ({selected.length})
        </button>
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