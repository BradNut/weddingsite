import { useState } from 'react';
import useInterval from '../utils/useInterval';

export default function useWeddingStart({ update = 60000 }) {
  const weddingDate = 1906736400000;
  const [timeToWedding, setTime] = useState(
    weddingDate - Date.now() <= 0 ? 0 : weddingDate - Date.now()
  );
  useInterval(() => {
    const time = weddingDate - Date.now();
    setTime(time <= 0 ? 0 : time);
  }, update);
  return {
    timeToWedding,
    timeAsDays: Math.ceil(timeToWedding / 1000 / 60 / 60 / 24),
  };
}
