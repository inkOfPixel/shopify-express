// @flow

import type { $Request, $Response, Middleware, NextFunction } from "express";

type Options = {
	hasShopName?: (request: $Request) => boolean,
	onAuth?: (
		request: $Request,
		response: $Response,
		next: NextFunction
	) => mixed,
	onInstall?: (
		request: $Request,
		response: $Response,
		next: NextFunction
	) => mixed
};

export default function withSession(
	hasAccessToken: (request: $Request) => boolean,
	options?: Options
): Middleware {
	return function verifyRequest(
		request: $Request,
		response: $Response,
		next: NextFunction
	) {
		if (hasAccessToken(request)) {
			return next();
		}
		if (options) {
			if (options.hasShopName && options.hasShopName(request)) {
				return (
					options.onAuth && options.onAuth(request, response, next)
				);
			}
			if (options.onInstall) {
				return options.onInstall(request, response, next);
			}
		}
		return next(new Error("Cannot authorize shop request"));
	};
}
