# Shopify Order Discount Function

## Problem Statement:

Create a Shopify checkout function that applies a **customizable discount**. The merchant should be able to specify:

1. The **discount percentage** (default: 10%).
2. The **order value threshold** (default: $100).

If the total order value exceeds the specified threshold-x, the discount is applied. If the order value is below the threshold, no discount is applied.

## Requirements:

1. Provide a way for the merchant to configure the **discount percentage** and **order value threshold** through a settings interface or admin panel.
2. The discount should apply to the total order value at checkout.
3. Display the original order value, the discount amount, and the final total on the checkout page.

## Customization Options:

- **Discount Percentage**: A field where the merchant can set the percentage of the discount (default: 10%).
- **Order Value Threshold**: A field where the merchant can set the minimum order value for the discount to be applied (default: $100).

## Example:

- If the **order value** is $150 and the merchant has set a **15% discount** for orders above **$120**, the customer should see:
  - Original Price: $150
  - Discount (15%): -$22.50
  - Final Total: $127.50
