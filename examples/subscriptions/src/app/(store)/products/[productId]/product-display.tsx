"use client";
import React, { ReactElement, ReactNode, useState } from "react";
import { ShopperProduct } from "@elasticpath/react-shopper-hooks";
import { VariationProductDetail } from "../../../../components/product/variations/VariationProduct";
import BundleProductDetail from "../../../../components/product/bundles/BundleProduct";
import { ProductContext } from "../../../../lib/product-context";
import SimpleProductDetail from "../../../../components/product/SimpleProduct";
import { SubscriptionOffering, SubscriptionPlan } from "@elasticpath/js-sdk";
import { ProductOffering } from "../../../../components/product/subscriptions/ProductOffering";
import { SmartQuestionsBot } from "../../../../components/product/smart-bot/SmartQuestionsBot";
import { Extensions } from "@elasticpath/js-sdk";
export function ProductProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [isChangingSku, setIsChangingSku] = useState(false);

  return (
    <ProductContext.Provider
      value={{
        isChangingSku,
        setIsChangingSku,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function resolveProductDetailComponent(
  product: ShopperProduct,
): JSX.Element {
  switch (product.kind) {
    case "base-product":
      return <VariationProductDetail variationProduct={product} />;
    case "child-product":
      return <VariationProductDetail variationProduct={product} />;
    case "simple-product":
      return <SimpleProductDetail simpleProduct={product} />;
    case "bundle-product":
      return <BundleProductDetail bundleProduct={product} />;
  }
}

type ProductDetailsComponentProps = {
  product: ShopperProduct;
  subscriptionOfferings?: SubscriptionOffering[];
  subscriptionPlans?: SubscriptionPlan[];
};

export function ProductDetailsComponent({
  product,
  subscriptionOfferings,
  subscriptionPlans,
}: ProductDetailsComponentProps) {
  // console.log(`subscriptionOfferings in product-display: ${JSON.stringify(subscriptionOfferings, null, 2)}`);
  console.log(`product.response.attributes.extensions in product-display: ${JSON.stringify(product.response.attributes.extensions, null, 2)}`);
  
  return (
    <div>
      {resolveProductDetailComponent(product)}
      <SmartQuestionsBot 
        extensions={product.response.attributes.extensions as Extensions} 
        productDescription={product.response.attributes.description}
      />
      <ProductOffering offerings={subscriptionOfferings || []} plans={subscriptionPlans || []} />
    </div>
  );
}
