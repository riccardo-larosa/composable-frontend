"use client";
import { StatusButton } from "../../button/StatusButton";
import Price from "../Price";
import { useCartAddSubscription } from "../../../hooks/useCartAddSubscription";
import { SubscriptionPlan } from "@elasticpath/js-sdk";
import { useCartAddSubscriptionItem} from "@elasticpath/react-shopper-hooks";


interface Offering {
  id: string;
  attributes: {
    name: string;
    description?: string;
  };
}

interface ProductOfferingProps {
  offerings: Offering[];
  plans: SubscriptionPlan[];
}

export function ProductOffering({ offerings, plans }: ProductOfferingProps): JSX.Element | null {
  const { mutate, isPending } = useCartAddSubscriptionItem();

  if (!offerings?.length) {
    return null;
  }
  console.log(`plans: ${JSON.stringify(plans[0], null, 2)}`);

  return (
    <div className="flex flex-col gap-6 md:gap-10">
      <div className="flex justify-end">
        <div className="border rounded-lg p-4 w-full ">
          <h2 className="text-xl font-semibold mb-4">Subscription Options</h2>
          
          {offerings.map((offering) => (
            <div key={offering.id} className="mb-6">
              <h3 className="text-lg font-medium mb-2">{offering.attributes.name}</h3>
              {offering.attributes.description && (
                <p className="text-gray-600 mb-4">{offering.attributes.description}</p>
              )}
              
              <div className="grid grid-cols-1 gap-4">
                {plans.map((plan) => (
                  <div key={plan.id} className="border rounded p-4 hover:border-primary">
                    <h4 className="font-medium">{plan.attributes.name}</h4>
                    <p className="text-gray-600 text-sm mb-2">
                      {plan.attributes.billing_frequency} {plan.attributes.billing_interval_type}
                    </p>
                    <p className="text-lg font-semibold">
                      <Price 
                        price={plan.meta?.display_price.without_tax.formatted || ''}
                        currency={plan.meta?.display_price.without_tax.currency || ''}
                        size="text-lg"
                      />
                    </p>
                    <StatusButton
                      type="button"
                      onClick={() => {
                        console.log(`offeringId: ${offering.id}, planId: ${plan.id}`);
                        mutate({ 
                          id: offering.id, 
                          subscription_configuration: {
                            plan: plan.id
                          },
                          quantity: 1
                        });
                      }}
                      status={isPending ? "loading" : "idle"}
                      className="mt-2 w-full"
                    >
                      Select Plan
                    </StatusButton>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
