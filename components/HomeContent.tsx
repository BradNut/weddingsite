import Image, { ImageProps } from 'next/image';
import styled from 'styled-components';
import Timeline from './Timeline';

interface HomeContentProps {
  alt: string;
  imageProps: ImageProps;
}

const HomeStyles = styled.div`
  display: grid;
  justify-items: center;
`;

export default function HomeContent({ alt, imageProps }: HomeContentProps) {
  return (
    <HomeStyles>
      <Image
        {...imageProps}
        alt={alt}
        placeholder="blur"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <Timeline />
    </HomeStyles>
  );
}
