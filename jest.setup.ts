import { Tool } from './src/types';

// Setup file for Jest to configure global mocks
jest.mock('lodash', () => ({
  __esModule: true,
  default: {
    filter: jest.fn((items: Tool[], predicate: ((tool: Tool) => boolean) | Partial<Tool>) => {
      if (!items) return [];
      if (typeof predicate === 'function') {
        return items.filter(predicate);
      }
      return items.filter((item) =>
        Object.entries(predicate).every(([key, value]) => item[key as keyof Tool] === value)
      );
    }),
    orderBy: jest.fn((items: Tool[], iteratees: string[], orders: ('asc' | 'desc')[]) => {
      if (!items) return [];
      return [...items].sort((a, b) => {
        const key = iteratees[0] as keyof Tool;
        const order = orders[0] === 'asc' ? 1 : -1;
        return (a[key] > b[key] ? 1 : -1) * order;
      });
    }),
  },
}));