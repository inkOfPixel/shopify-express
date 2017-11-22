// @flow

import { type $Application, Router } from "express";
import type {
	ShopifyExpressConfiguration,
	Configuration,
	DefaultConfiguration
} from "./types";
import authorizedCallback from "./routes/authorizedCallback";

const defaultConfig: DefaultConfiguration = {
	rootPath: "",
	storeStrategy: {},
	enableAPIProxy: false
};

export default function configureShopifyRoutes(
	configuration: ShopifyExpressConfiguration
) {
	const config: Configuration = mergeDefaults(configuration);
	return {
		mountRoutes: (app: Object) => mountRoutes(app, config),
		withSession: () => {},
		withWebhook: () => {}
	};
}

function mergeDefaults(configuration: ShopifyExpressConfiguration): any {
	return {
		...defaultConfig,
		configuration
	};
}

function mountRoutes(app: $Application, config: Configuration) {
	const router = Router();

	router.use(config.rootPath, authorizedCallback(config));
	if (config.enableAPIProxy) {
		console.log("Mount API proxy here");
	}
	// router.use("/auth/shopify", createShopifyAuthRouter(shopifyConfig));
	// router.use("/api", createWithShop({ redirect: false }), shopifyApiProxy);

	return router;
}

// const createRouter = require("./routes");
// const createMiddleware = require("./middleware");
// const { MemoryStrategy } = require("./strategies");
//
// export default function shopify(shopifyConfig) {
// 	const config = Object.assign(
// 		{ shopStore: new MemoryStrategy() },
// 		shopifyConfig
// 	);
//
// 	return {
// 		middleware: createMiddleware(config),
// 		routes: createRouter(config)
// 	};
// }
