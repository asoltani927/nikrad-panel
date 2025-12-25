import { getSdkStatus, setSdkStatus } from "../contexts";
import { initSdkClient } from "./init-sdk-client.function";
import { GRAPHQL_BASE_URL } from "../constants/graphql-base.constant";

interface InitSdkArgs {
  realm: string;
  key: string;
}

export function initSdk({ realm, key }: InitSdkArgs) {
  try {
    if (getSdkStatus() !== "unknown") return;
    setSdkStatus("initializing");

    initSdkClient({
      base: GRAPHQL_BASE_URL,
      key,
      realm,
    });

    setSdkStatus("ready");

  } catch (error) {
    setSdkStatus("fails");
  }
}
