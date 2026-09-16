// jsdom (el testEnvironment de Jest) no implementa la Fetch API ni varias APIs de las que
// depende — msw/node las necesita para interceptar peticiones reales de HttpClient en los tests
// que usan mock-api/node. Se rellena antes que nada más, incluido el propio setup de zone.js.
import { TextDecoder, TextEncoder } from 'node:util';
import { ReadableStream, TransformStream, WritableStream } from 'node:stream/web';
import { BroadcastChannel, MessageChannel, MessagePort } from 'node:worker_threads';

Object.assign(globalThis, {
  TextEncoder,
  TextDecoder,
  ReadableStream,
  WritableStream,
  TransformStream,
  MessageChannel,
  MessagePort,
  BroadcastChannel,
});

import { fetch, Headers, Request, Response, FormData } from 'undici';

Object.assign(globalThis, { fetch, Headers, Request, Response, FormData });

import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv({
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
});
