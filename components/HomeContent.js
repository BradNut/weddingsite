import styled from 'styled-components';
import CustomNextImage from './CustomNextImage';
import Timeline from './Timeline';

const HomeStyles = styled.div`
  display: grid;
  justify-items: center;
`;

export default function HomeContent() {
  return (
    <HomeStyles>
      <CustomNextImage
        src="https://picsum.photos/1307/880"
        height={880}
        width={1307}
        alt="Picture of Name and Name"
        blur
      />
      <Timeline />
    </HomeStyles>
  );
}
