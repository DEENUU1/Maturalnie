import { useState, useEffect } from 'react';

function Countdown() {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const remainingTime = tomorrow - now;
      const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
      const seconds = Math.floor((remainingTime / 1000) % 60);
      const formattedTime = new Date(0, 0, 0, hours, minutes, seconds).toLocaleTimeString();
      setCountdown(formattedTime);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return countdown;
}

export default Countdown;