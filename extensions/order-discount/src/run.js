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
  const configuration = JSON.parse(
    input?.discountNode?.metafield?.value ?? "{}"
  );
  const isApplicable = input.cart.cost.totalAmount.amount > 500;



  return isApplicable ? {
    discountApplicationStrategy: DiscountApplicationStrategy.Maximum,
    discounts: [
      {
        targets: [
          {
            orderSubtotal: {
              excludedVariantIds: []
            }
          }
        ],
        value: {
          fixedAmount: {
            amount: 20
          }
        }
      }
    ]
  } : EMPTY_DISCOUNT;
};