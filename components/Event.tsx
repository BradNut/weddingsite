import styled from 'styled-components';

interface ScheduleEvent {
  name?: string;
  start?: string;
  end?: string;
  venueName?: string;
}

interface EventData {
  name: string;
  date: string;
  start: string;
  end?: string;
  venueName?: string;
  attire?: string;
  description?: string;
  showSchedule?: boolean;
  scheduleEvents?: ScheduleEvent[];
}

interface EventProps {
  event: EventData;
}

const EventStyles = styled.article`
  display: grid;
  gap: 2rem;
  justify-content: center;
  margin-top: 3.5rem;
  .schedule-event {
    padding-bottom: 1rem;
    border-bottom: 2px solid var(--lightGrey);
  }
`;

const ScheduleStyle = styled.article`
  display: flex;
  gap: 1.5rem;
  flex-direction: row;
  text-align: center;
`;

export default function Event({ event }: EventProps) {
  const {
    name,
    date,
    start,
    end,
    venueName,
    attire,
    description,
    // openToAll,
    showSchedule,
    scheduleEvents,
  } = event;
  return (
    <EventStyles>
      <div className="center">
        <h2>{name}</h2>
        <h3>{date}</h3>
        <h3>
          {start}
          {end && ` - ${end}`}
        </h3>
        {venueName && <div dangerouslySetInnerHTML={{ __html: venueName }} />}
        {attire && <h4>{attire}</h4>}
        {description && <h4>{description}</h4>}
      </div>
      {showSchedule &&
        scheduleEvents &&
        scheduleEvents.map(
          ({
            name: eventName,
            start: eventStart,
            end: eventEnd,
            venueName: eventVenueName,
          }) => (
            <ScheduleStyle key={name} className="schedule-event">
              <div>
                {eventStart && (
                  <h3>
                    {eventStart}
                    {eventEnd && ' - {end}'}
                  </h3>
                )}
              </div>
              <div>
                {eventName && <h3>{eventName}</h3>}
                {eventVenueName && (
                  <div dangerouslySetInnerHTML={{ __html: eventVenueName }} />
                )}
              </div>
            </ScheduleStyle>
          )
        )}
    </EventStyles>
  );
}
