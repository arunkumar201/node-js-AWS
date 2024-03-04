import * as process from "process";

import dotenv from "dotenv";

dotenv.config();

class Config {
	public SECRET: string | undefined;
	public REDIS_HOST: string | undefined;
	public REDIS_PORT: string | undefined;
	public REDIS_PASSWORD: string | undefined;
	public REDIS_USERNAME: string | undefined;
	public PORT: string | undefined;
	public DATABASE_URI: string | undefined;
	public DB_NAME: string | undefined;
	public S3_BUCKET_NAME: string | undefined
	public AWS_REGION: string | undefined
	public S3_ACCESS_KEY_ID: string | undefined
	public S3_SECRET_ACCESS_KEY: string | undefined
	private readonly DEFAULT_DATABASE_URI = "mongodb://127.0.0.1:27017";

	constructor() {
		this.PORT = process.env.PORT || "5000";
		this.REDIS_HOST = process.env.REDIS_HOST || "redis://localhost";
		this.REDIS_PORT = process.env.REDIS_PORT || "6379";
		this.REDIS_PASSWORD = process.env.REDIS_PASSWORD;
		this.REDIS_USERNAME = process.env.REDIS_USERNAME;
		this.SECRET = process.env.SECRET;
		this.DATABASE_URI = process.env.DATABASE_URI ?? this.DEFAULT_DATABASE_URI;
		this.DB_NAME = process.env.DB_NAME ?? "rest-api-ts";
		this.S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
		this.AWS_REGION = process.env.AWS_REGION;
		this.S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID;
		this.S3_SECRET_ACCESS_KEY=process.env.S3_SECRET_ACCESS_KEY
		
	}

	public validateConfig(): void {
		for (const [key, value] of Object.entries(this)) {
			if (value === undefined) {
				throw new Error(`Configuration ${key} is undefined.`);
			}
		}
	}
}

export const ENVConfig: Config = new Config();
