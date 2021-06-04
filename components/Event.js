import styled from 'styled-components';

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

export default function Event({ event }) {
  const {
    name,
    date,
    start,
    end,
    venueName,
    attire,
    description,
    openToAll,
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
        scheduleEvents.map(({ name, start, end, venueName }) => (
          <ScheduleStyle key={name} className="schedule-event">
            <div>
              {start && (
                <h3>
                  {start}
                  {end && ` - {end}`}
                </h3>
              )}
            </div>
            <div>
              {name && <h3>{name}</h3>}
              {venueName && (
                <div dangerouslySetInnerHTML={{ __html: venueName }} />
              )}
            </div>
          </ScheduleStyle>
        ))}
    </EventStyles>
  );
}
