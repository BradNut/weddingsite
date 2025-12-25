import { useEffect, useState, SyntheticEvent } from 'react';
import Image, { ImageProps } from 'next/image';
import styled, { keyframes } from 'styled-components';

interface CustomNextImageProps extends ImageProps {
  onLoad?: (e: SyntheticEvent<HTMLImageElement>) => void;
}

const blurImageTransition = keyframes`
  from {
    filter: blur(0);
  }
  to {

    filter: blur(5px)
  }
`;

const unblurImageTransition = keyframes`
  from {
    filter: blur(5px)
  }
  to {
    filter: blur(0);
  }
`;

const CustomStylesContainer = styled.div`
  .unblur {
    animation: ${unblurImageTransition} 1s linear;
  }
  .blur {
    animation: ${blurImageTransition} 1s linear;
  }
`;

const CustomNextImage = (props: CustomNextImageProps) => {
  const { height, width, src, onLoad, ...other } = props;
  const [onLoadCount, setOnloadCount] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (onLoadCount > 1) {
      setImageLoaded(true);
    }
  }, [onLoadCount]);

  return (
    <CustomStylesContainer>
      <Image
        className={`${imageLoaded ? 'unblur' : 'blur'}`}
        onLoad={(e) => {
          setOnloadCount((prev) => prev + 1);
          if (onLoad) onLoad(e);
        }}
        src={src}
        objectFit="cover"
        width={width}
        height={height}
        {...other}
      />
    </CustomStylesContainer>
  );
};

export default CustomNextImage;
