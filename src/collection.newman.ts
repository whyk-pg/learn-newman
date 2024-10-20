import { Collection } from "postman-collection";

declare namespace Postman {
  interface PM {
    test(
      testName: string,
      specFunction: (done?: (error?: unknown) => void) => void,
    ): void;
    // TODO: ここを独自定義にするか
    // @ts-expect-error
    expect: Chai.ExpectStatic;
    response: {
      // TODO: ここを独自定義にするか
      // @ts-expect-error
      to: Chai.Assertion;
      json(): {
        status: number;
        method: string;
        text: string;
        [key: string]: string | number;
      };
      text(): string;
    };
  }
}

declare const pm: Postman.PM;

const convertPostmanTestToStringArray = (pmTest: () => void): string[] => {
  // TODO: 実行に支障はないが、出力されたexecがすごく汚いので、どうにかして直したい
  return [pmTest.toString().replace(/\(\)\=\>(.*)/g, "$1")];
};

const getUrl = (path: string) => {
  const url = new URL(path);
  return {
    protocol: url.protocol.replace(":", ""),
    host: [url.hostname],
    port: url.port,
  };
};
const requestUrl = getUrl("http://localhost:8787");

export const collection = new Collection({
  name: "learn-newman",
  item: [
    {
      name: "GET",
      event: [
        {
          listen: "test",
          script: {
            exec: convertPostmanTestToStringArray(() =>
              pm.test("レスポンスボディのJSONが想定通りか", () => {
                const jsonData = pm.response.json();
                pm.expect(jsonData.status).to.eql(200);
                pm.expect(jsonData.method).to.eql("GET");
                pm.expect(jsonData.text).to.eql("OK!");
                pm.expect(jsonData.apiKey).to.eql("Example_0000");
              }),
            ),
            type: "text/javascript",
          },
        },
      ],
      request: {
        method: "GET",
        header: [],
        url: requestUrl,
      },
      response: [],
    },
    {
      name: "POST",
      event: [
        {
          listen: "test",
          script: {
            exec: convertPostmanTestToStringArray(() =>
              pm.test("レスポンスボディのJSONが想定通りか", () => {
                const jsonData = pm.response.json();
                pm.expect(jsonData.status).to.eql(200);
                pm.expect(jsonData.method).to.eql("POST");
                pm.expect(jsonData.text).to.eql("OK!");
                pm.expect(jsonData.apiKey).to.eql("Example_0000");
              }),
            ),
            type: "text/javascript",
          },
        },
      ],
      request: {
        method: "POST",
        header: [],
        url: requestUrl,
      },
      response: [],
    },
    {
      name: "PATCH",
      event: [
        {
          listen: "test",
          script: {
            exec: convertPostmanTestToStringArray(() =>
              pm.test("レスポンスボディのJSONが想定通りか", () => {
                const jsonData = pm.response.json();
                pm.expect(jsonData.status).to.eql(200);
                pm.expect(jsonData.method).to.eql("PATCH");
                pm.expect(jsonData.text).to.eql("OK!");
                pm.expect(jsonData.apiKey).to.eql("Example_0000");
              }),
            ),
            type: "text/javascript",
          },
        },
      ],
      request: {
        method: "PATCH",
        header: [],
        url: requestUrl,
      },
      response: [],
    },
    {
      name: "DELETE",
      event: [
        {
          listen: "test",
          script: {
            exec: convertPostmanTestToStringArray(() =>
              pm.test("レスポンスボディのJSONが想定通りか", () => {
                const jsonData = pm.response.json();
                pm.expect(jsonData.status).to.eql(200);
                pm.expect(jsonData.method).to.eql("DELETE");
                pm.expect(jsonData.text).to.eql("OK!");
                pm.expect(jsonData.apiKey).to.eql("Example_0000");
              }),
            ),
            type: "text/javascript",
          },
        },
      ],
      request: {
        method: "DELETE",
        header: [],
        url: requestUrl,
      },
      response: [],
    },
  ],
});
