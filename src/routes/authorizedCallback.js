// @flow

import type { $Request, $Response, Middleware, NextFunction } from "express";
import querystring from "querystring";
import crypto from "crypto";
import asyncRequest from "request-promise-native";
import type { Configuration } from "../types";

type CallbackContext = {
	appSecret: string,
	appKey: string,
	afterAuthentication: $ElementType<Configuration, "afterAuthentication">
};

type RequestContext = {
	appKey: string,
	appSecret: string,
	code: any,
	shop: string
};

export default function authorizedCallback({
	appSecret,
	appKey,
	afterAuthentication
}: CallbackContext): Middleware {
	return async (
		request: $Subtype<$Request>,
		response: $Response,
		next: NextFunction
	) => {
		const { query } = request;
		const { code, hmac, shop } = query;

		try {
			if (typeof shop !== "string") {
				throw new Error("Expected a shop parameter");
			}
			throwIfHMACValidationFails(query, appSecret);
			const accessToken = await requestAccessToken({
				appKey,
				appSecret,
				code,
				shop
			});
			afterAuthentication(shop, accessToken)(request, response, next);
		} catch (error) {
			next(error);
		}
	};
}
function throwIfHMACValidationFails(
	query: $PropertyType<$Request, "query">,
	appSecret: string
) {
	const { code, hmac, shop } = query;
	const map = { ...query };
	delete map["signature"];
	delete map["hmac"];

	const message = querystring.stringify(map);
	const generated_hash = crypto
		.createHmac("sha256", appSecret)
		.update(message)
		.digest("hex");

	if (generated_hash !== hmac) {
		throw new Error("HMAC validation failed");
	}
}
async function requestAccessToken(context: RequestContext): Promise<string> {
	const requestBody = querystring.stringify({
		code: context.code,
		client_id: context.appKey,
		client_secret: context.appSecret
	});
	const response = await asyncRequest({
		url: `https://${context.shop}/admin/oauth/access_token`,
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Content-Length": Buffer.byteLength(requestBody)
		},
		body: requestBody
	});
	const jsonResponse = JSON.parse(response);
	if (typeof jsonResponse.access_token === "string") {
		return jsonResponse.access_token;
	}
	throw new Error("Received invalid access token");
}
