const crypto = require('crypto');

function generatePartitionKey(event) {
  const PARTITION_KEY = "0";
  const MAX_PARTITION_KEY = 256;
  let candidate = null;

  if (event && event.partitionKey) {
    candidate = event.partitionKey;
  } else if (event) {
    const data = JSON.stringify(event);
    candidate = crypto.createHash("sha3-512").update(data).digest("hex");
  }

  if (!candidate) {
    candidate = PARTITION_KEY;
  } else if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  if (candidate.length > MAX_PARTITION_KEY) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }

  return candidate;
}

exports.deterministicPartitionKey = generatePartitionKey;

