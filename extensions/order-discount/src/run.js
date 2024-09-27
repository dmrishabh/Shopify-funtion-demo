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
  // Parse the discount node metadata
  const metaData = JSON.parse(input?.discountNode?.metafield?.value ?? "{}");


  // Iterate through cart lines to check if any product has a tag that excludes it from the discount
  const hasExcludedTag = input.cart.lines.some(line => {
    if (line.merchandise.__typename === "ProductVariant") {
      return line.merchandise.product.hasAnyTag == true
    }
  }
  );

  // Check if the total cart cost meets the discount threshold
  const isApplicable = input.cart.cost.totalAmount.amount > metaData.threshold && !hasExcludedTag;

  // If no excluded tag is found and the cart meets the threshold, apply the discount
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
}
