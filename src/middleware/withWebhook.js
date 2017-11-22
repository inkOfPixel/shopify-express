// @flow

import type { $Request, $Response, Middleware, NextFunction } from "express";

export default function withWebhook(): Middleware {
	return (
		request: $Subtype<$Request>,
		response: $Response,
		next: NextFunction
	) => {
		const hmac = request.get("X-Shopify-Hmac-Sha256");
		const topic = request.get("X-Shopify-Topic");
		const shopDomain = request.get("X-Shopify-Shop-Domain");
		request.shopify = request.shopify || {};
		request.shopify.webhook = {
			topic,
			shopDomain
		};
	};
}
