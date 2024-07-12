import { useState, useEffect } from 'react';

const useFileChanges = () => {
  const [changes, setChanges] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8001/ws');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setChanges(prevChanges => [...prevChanges, ...data.changes]);
    };

    return () => {
      ws.close();
    };
  }, []);

  return changes;
};

export default useFileChanges;