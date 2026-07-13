import redis from "../config/redis.js";

export const setCache = async (
  key,
  value,
  ttl = 600
) => {
  await redis.set(
    key,
    JSON.stringify(value),
    "EX",
    ttl
  );
};

export const getCache = async (key) => {
  const value = await redis.get(key);

  return value ? JSON.parse(value) : null;
};

export const deleteCache = async (key) => {
  await redis.del(key);
};

export const existsCache = async (key) => {
  return await redis.exists(key);
};

export const clearCache = async (pattern) => {
  const keys = await redis.keys(pattern);

  if (keys.length) {
    await redis.del(...keys);
  }
};