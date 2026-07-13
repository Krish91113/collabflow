import { CACHE_KEYS } from "./cacheKeys.js";

import redis from "../config/redis.js";

const REFRESH_TOKEN_TTL =
  60 * 60 * 24 * 7;

export const cacheRefreshToken = async (
  userId,
  token
) => {

  await redis.set(
    CACHE_KEYS.REFRESH_TOKEN(userId),
    token,
    "EX",
    REFRESH_TOKEN_TTL
  );

};

export const getRefreshToken = async (
  userId
) => {

  return await redis.get(
    CACHE_KEYS.REFRESH_TOKEN(userId)
  );

};

export const deleteRefreshToken = async (
  userId
) => {

  await redis.del(
    CACHE_KEYS.REFRESH_TOKEN(userId)
  );

};