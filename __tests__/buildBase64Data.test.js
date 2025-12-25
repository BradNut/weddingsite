import buildBase64Data from '../utils/buildBase64Data';

// Mock fetch globally
global.fetch = jest.fn();

describe('build base 64 function', () => {
  const imageName = 'https://picsum.photos/1307/880';
  const alt = 'test alt';

  beforeEach(() => {
    // Mock successful fetch response
    global.fetch.mockResolvedValue({
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('takes an image name and builds base64 image', async () => {
    const imageData = await buildBase64Data(false, imageName, alt, {});
    expect(imageData).toBeDefined();
    expect(imageData.alt).toEqual(alt);
    expect(imageData.imageProps).toBeDefined();
    expect(imageData.imageProps.blurDataURL).toContain(
      'data:image/jpeg;base64'
    );
    expect(imageData.imageProps.height).toBeGreaterThan(0);
    expect(imageData.imageProps.width).toBeGreaterThan(0);
    expect(imageData.imageProps.src).toContain(imageName);
  });

  it('fails if image not resolved', async () => {
    global.fetch.mockRejectedValue(new Error('Failed to fetch'));
    expect(await buildBase64Data(false, 'Blah', alt, {})).toEqual({});
  });
});
