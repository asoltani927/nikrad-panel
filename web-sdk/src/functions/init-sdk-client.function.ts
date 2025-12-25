import { setSdkClient } from "../contexts";
import { GraphQLClient } from "graphql-request";

interface InitSdkClientArgs {
  base: string;
  realm: string;
  key: string;
}

export function initSdkClient({ base, realm, key }: InitSdkClientArgs) {
  const client = new GraphQLClient(`${base}`, {
    headers: {
      "x-realm-key": realm,
      "x-api-key": key,
      "x-origin": "sdk",
    },
  });
  setSdkClient(client);
}
