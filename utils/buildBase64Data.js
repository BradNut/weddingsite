import { getPlaiceholder } from 'plaiceholder';
import { buildUrl } from 'cloudinary-build-url';

export default async function buildBase64Data(
  imageName,
  alt,
  additionalProps = {}
) {
  const folderName = process.env.PUBLIC_FOLDER_NAME;
  const cloudName = process.env.PUBLIC_CLOUD_NAME;
  let imagePath;

  if (imageName && alt && additionalProps) {
    imagePath = buildUrl(`${folderName}/${imageName}`, {
      cloud: {
        cloudName,
      },
    });
  }

  if (imagePath) {
    try {
      const { base64, img } = await getPlaiceholder(imagePath, { size: 10 });
      return {
        imageProps: {
          ...img,
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