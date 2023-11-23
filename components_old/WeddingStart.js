import useWeddingStart from '../lib_old/useWeddingStart';

export default function WeddingStart() {
  const { timeAsDays } = useWeddingStart({
    update: 60000,
  });

  return (
    <span style={{ color: '#e64c44', fontSize: '3.157rem' }}>{timeAsDays}</span>
  );
}
