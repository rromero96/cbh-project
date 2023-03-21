const { deterministicPartitionKey } = require("./dpk");
const crypto = require('crypto');

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
});

describe('deterministicPartitionKey', () => {
  test('should return default partition key when event is null', () => {
    const partitionKey = deterministicPartitionKey(null);
    expect(partitionKey).toBe('0');
  });

  test('should return partition key from event object', () => {
    const event = { partitionKey: '12345' };
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toBe(event.partitionKey);
  });

  test('should generate partition key from event object', () => {
    const event = { key1: 'test1', key2: 'test2' };
    const expectedKey = crypto.createHash('sha3-512').update(JSON.stringify(event)).digest('hex');
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toBe(expectedKey);
  });

  test('should stringify partition key if not a string', () => {
    const event = { key1: 'value1', key2: { subkey: 'value2' } };
    const expectedKey = crypto.createHash('sha3-512').update(JSON.stringify(event)).digest('hex');
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toBe(expectedKey);
  });
});
