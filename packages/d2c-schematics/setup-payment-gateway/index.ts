import { noop, Rule, SchematicContext, Tree } from "@angular-devkit/schematics"
import { Schema as SetupPaymentGatewayOptions } from "./schema"
import { createFallbackLogger } from "../utility/fallback-logger"
import { setupEPPaymentGateway } from "../utility/payment-gateway/setup-payment-gateway"

export default function (options: SetupPaymentGatewayOptions): Rule {
  return async (host: Tree, context: SchematicContext): Promise<Rule> => {
    const logger = context.logger ?? createFallbackLogger()

    try {
      switch (options.gatewayName) {
        case "ep-payments":
          return setupEPPaymentGateway(options, host, logger)
        default:
          logger.error(
            `Failed to setup payment gateway, unsupported payment gateway name: ${options.gatewayName}`
          )
          return noop()
      }
    } catch (err) {
      logger.error(
        `Failed to setup payment gateway, unexpected error occurred: ${
          err instanceof Error
            ? `${err.name} - ${err.message}`
            : "Couldn't process error message"
        }`
      )
      return noop()
    }
  }
}
