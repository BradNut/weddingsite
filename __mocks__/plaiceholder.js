export const getPlaiceholder = jest.fn().mockResolvedValue({
  base64: 'data:image/jpeg;base64,mockBase64Data',
  metadata: {
    height: 880,
    width: 1307,
    format: 'jpeg',
  },
});
