// @flow

import type { $Request, $Response, NextFunction } from "express";

export type Configuration = {
	afterAuthentication: (
		shopDomain: string,
		accessToken: string
	) => (request: $Request, response: $Response, next: NextFunction) => mixed,
	appKey: string,
	appSecret: string,
	rootPath: string,
	storeStrategy: any,
	enableAPIProxy: boolean
};

export type RequiredConfiguration = {
	afterAuthentication: $ElementType<Configuration, "afterAuthentication">,
	appKey: $ElementType<Configuration, "appKey">,
	appSecret: $ElementType<Configuration, "appSecret">
};

export type DefaultConfiguration = {
	rootPath: $ElementType<Configuration, "rootPath">,
	storeStrategy: $ElementType<Configuration, "storeStrategy">,
	enableAPIProxy: boolean
};

export type ShopifyExpressConfiguration = RequiredConfiguration &
	$Supertype<DefaultConfiguration>;
