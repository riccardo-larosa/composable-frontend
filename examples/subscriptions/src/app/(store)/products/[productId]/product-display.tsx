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
  return (
    <div>
      {resolveProductDetailComponent(product)}
      <div className="flex gap-4">
        <div className="w-1/2">
          <SmartQuestionsBot 
            extensions={product.response.attributes.extensions as Extensions} 
            productDescription={product.response.attributes.description}
          />
        </div>
        <div className="w-1/2">
          <ProductOffering 
            offerings={subscriptionOfferings || []} 
            plans={subscriptionPlans || []} 
          />
        </div>
      </div>
    </div>
  );
}
