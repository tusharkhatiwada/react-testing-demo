export default {
  get: jest.fn().mockResolvedValue({
    data: {},
  }),
  post: jest.fn().mockResolvedValue({
    status: 200,
  }),
};
