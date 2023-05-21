export default function useState(initialValue) {
  return jest.fn().mockReturnValueOnce([initialValue, jest.fn()]);
}
