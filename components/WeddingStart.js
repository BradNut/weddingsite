import { useState } from 'react';
import useInterval from '../utils/useInterval';

function useWeddingStart({ update = 60000 }) {
  const weddingDate = 1906736400000;
  const [timeToWedding, setTime] = useState(weddingDate - Date.now());
  useInterval(() => {
    setTime(weddingDate - Date.now());
  }, update);
  return {
    timeToWedding,
    timeAsDays: Math.ceil(timeToWedding / 1000 / 60 / 60 / 24),
  };
}

export default function WeddingStart() {
  const { timeToWedding, timeAsDays } = useWeddingStart({
    update: 60000,
  });

  return <>{timeAsDays}</>;
}
