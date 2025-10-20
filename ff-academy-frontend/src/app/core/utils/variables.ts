import { InjectionToken } from '@angular/core';

export const BASE_URL = new InjectionToken<string>('baseUrl');
// export const WEBSOCKET_BASE_PATH = new InjectionToken<string>('websocketPath');
// export const AWS_S3_BASE_URL = 'https://gladius-test-public-storage.s3.eu-central-1.amazonaws.com';

export const PRODUCTION_HOSTNAMES = [''];