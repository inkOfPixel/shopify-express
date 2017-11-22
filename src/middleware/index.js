const createWithWebhook = require("./webhooks");
const createWithShop = require("./withShop");

export default function createMiddleware(shopifyConfig) {
	const withWebhook = createWithWebhook(shopifyConfig);
	const withShop = createWithShop();

	return {
		withShop,
		withWebhook
	};
}
