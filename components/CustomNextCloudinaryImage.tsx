import { useEffect, useState, SyntheticEvent } from 'react';
import Image, { ImageProps } from 'next/image';
import { buildUrl } from 'cloudinary-build-url';
// import wait from 'waait';
import styled, { keyframes } from 'styled-components';

interface CustomNextCloudinaryImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  blur?: boolean;
  resize?: boolean;
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

const CustomNextCloudinaryImage = (props: CustomNextCloudinaryImageProps) => {
  const { height, width, src, onLoad, blur, resize, ...other } = props;
  const [onLoadCount, setOnloadCount] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const transformations: { resize?: { type: string; width: typeof width; height: typeof height } } = {};

  if (resize) {
    transformations.resize = {
      type: 'scale',
      width,
      height,
    };
  }

  const imageUrl = buildUrl(`${process.env.NEXT_PUBLIC_FOLDER_NAME}/${src}`, {
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME,
    },
    transformations,
  });

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
        src={imageUrl}
        objectFit="cover"
        width={width}
        height={height}
        {...other}
      />
    </CustomStylesContainer>
  );
};

export default CustomNextCloudinaryImage;
