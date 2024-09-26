// @ts-check
import { DiscountApplicationStrategy } from "../generated/api";

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @type {FunctionRunResult}
 */
const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  const metaData = JSON.parse(
    input?.discountNode?.metafield?.value ?? "{}"
  );

  const isApplicable = input.cart.cost.totalAmount.amount > metaData.threshold;



  return isApplicable ? {
    discountApplicationStrategy: DiscountApplicationStrategy.Maximum,
    discounts: [
      {
        message: "Hey you got a discount by function app",
        targets: [
          {
            orderSubtotal: {
              excludedVariantIds: []
            }
          }
        ],
        value: {
          percentage: {
            value: metaData.discountValue
          }
        }
      }
    ]
  } : EMPTY_DISCOUNT;
};