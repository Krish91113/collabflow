import { CACHE_KEYS } from "./cacheKeys.js";
import { setCache, getCache, deleteCache } from "./redisCache.js";

const USER_TTL = 600;

export const cacheUser = async (user) => {
  const data = user.toObject ? user.toObject() : user;

  await setCache(
    CACHE_KEYS.USER(user._id.toString()),
    data,
    USER_TTL
  );
};

export const getCachedUser = async (userId) => {
  return await getCache(
    CACHE_KEYS.USER(userId.toString())
  );
};

export const deleteCachedUser = async (userId) => {
  await deleteCache(
    CACHE_KEYS.USER(userId.toString())
  );
};