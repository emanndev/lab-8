
jest.mock('lodash', () => ({
  __esModule: true,
  default: {
    filter: jest.fn(),
    orderBy: jest.fn(),
  },
}));