import { getPlaiceholder } from 'plaiceholder';
import { buildUrl } from 'cloudinary-build-url';

interface ImageData {
  imageProps?: {
    src: string;
    height: number;
    width: number;
    blurDataURL: string;
  };
  alt?: string;
  [key: string]: unknown;
}

export default async function buildBase64Data(
  cloudinaryUrl: boolean,
  imageSource: string,
  alt: string,
  additionalProps: Record<string, unknown> = {},
  transformations: Record<string, unknown> = {}
): Promise<ImageData> {
  let imagePath = imageSource;
  if (cloudinaryUrl) {
    const folderName = process.env.PUBLIC_FOLDER_NAME;
    const cloudName = process.env.PUBLIC_CLOUD_NAME;

    if (imageSource && alt && additionalProps) {
      imagePath = buildUrl(`${folderName}/${imageSource}`, {
        cloud: {
          cloudName,
        },
        transformations,
      });
    }
  }

  if (imagePath) {
    try {
      const buffer = await fetch(imagePath).then(async (res) =>
        Buffer.from(await res.arrayBuffer())
      );
      const {
        base64,
        metadata: { height, width },
      } = await getPlaiceholder(buffer, { size: 10 });
      return {
        imageProps: {
          src: imagePath,
          height,
          width,
          blurDataURL: base64,
        },
        alt,
        ...additionalProps,
      };
    } catch (e) {
      // Error getting plaiceholder
      // throw new Error('Error creating plaiceholder base64 image');
    }
  }
  return {};
}
