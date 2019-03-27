const cache = require('../helpers/cache');

describe('cache', () => {
  it('should export the cache correctly', () => {
    expect(cache).toBeTruthy();
  });

  it('should get a value if it exists', async () => {
    const testData = { key: 'key', value: 'value' };
    await cache.set(testData.key, testData.value);
    const foundValue = await cache.get(testData.key);
    expect(foundValue).toBe(testData.value);
  });

  it('should return undefiend if a value does not exist', async () => {
    const nonExistentKey = 'This key does not exist';
    const foundValue = await cache.get(nonExistentKey);
    expect(foundValue).toBe(undefined);
  });
});
