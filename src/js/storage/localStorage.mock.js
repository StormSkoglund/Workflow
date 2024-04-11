export default {
  setItem: jest.fn((key, value) => {
    global.localStorage[key] = value;
  }),
  getItem: jest.fn((key) => {
    console.log(this);
    return global.localStorage[key];
  }),
  removeItem: jest.fn((key) => {
    delete global.localStorage[key];
  }),
};
