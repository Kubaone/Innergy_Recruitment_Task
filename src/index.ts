import { Service, ServiceType, ServiceYear, PriceForSpecifiedYears, Discount}  from "./types"
import { allServices } from "./data/services";
import { allDiscounts } from "./data/discounts";
import { photographyVideoBundle } from "./service-bundles";

export const updateSelectedServices = (
    previouslySelectedServices: ServiceType[],
    action: { type: "Select" | "Deselect"; service: ServiceType }
) => {
    switch (action.type) {
        case "Select":
            if (!previouslySelectedServices.includes(action.service) 
                  && allServices.find(x => x.serviceType === action.service).isPriceApplicable(previouslySelectedServices)){
                previouslySelectedServices.push(action.service);
            }
            return previouslySelectedServices;

        case "Deselect":
            let currentlySelected = previouslySelectedServices.filter(x => x != action.service);
            if (!currentlySelected.includes("VideoRecording")) {
                currentlySelected = currentlySelected.filter(x => x != "BlurayPackage");
            }

            if (!(currentlySelected.includes("VideoRecording") || currentlySelected.includes("Photography"))) {
                currentlySelected = currentlySelected.filter(x => x != "TwoDayEvent");
            }
            return currentlySelected;

        default:
            return previouslySelectedServices;
    }
};

export const calculatePrice = (selectedServices: ServiceType[], selectedYear: ServiceYear): { basePrice: number, finalPrice: number } => {
    let basePrice: number = 0;

    // Bundle is not an exact discount so it is considered as a set of products with a fixed price
    const isPhotographyVideoBundle = photographyVideoBundle.serviceTypes.every((x: ServiceType) => selectedServices.includes(x));
    if (isPhotographyVideoBundle) {
        const photographyBundlePrice = photographyVideoBundle[selectedYear];
        basePrice -= photographyBundlePrice; // Fake discount for a bundle of services
    }

    basePrice += allServices
        .filter(service => selectedServices.includes(service.serviceType) && service.isPriceApplicable(selectedServices))
        .map(x => x.pricesForSpecifiedYears.find(x => x.applicableYears.includes(selectedYear)).price)
        .reduce((priceSum, currentServicePrice) => priceSum + currentServicePrice, 0);

    const applicableDiscountAmounts = allDiscounts.map(x => x.getDiscountAmount(selectedServices, selectedYear));

    const biggestDiscount = Math.max(...applicableDiscountAmounts, 0)
    const finalPrice = basePrice - biggestDiscount;
    return { basePrice: basePrice, finalPrice: finalPrice };
};
