// @flow

type ShopRecord = Object & { accessToken: string };

interface StoreStrategy {
	getShop(shopDomain: string): Promise<ShopRecord>;
	storeShop(shopDomain: string, data: ShopRecord): Promise<void>;
}

// const RedisStrategy = require('./RedisStrategy');
// const MemoryStrategy = require('./MemoryStrategy');
// const SqliteStrategy = require('./SqliteStrategy');
//
// export default = {
//   RedisStrategy,
//   MemoryStrategy,
//   SqliteStrategy,
// }
