import timelineData from '../lib/events.json';
import Event from './Event';

export default function Timeline() {
  return timelineData.map(
    (timelineEvent) =>
      timelineEvent?.openToAll && (
        <Event key={timelineEvent?.name} event={timelineEvent} />
      )
  );
}
