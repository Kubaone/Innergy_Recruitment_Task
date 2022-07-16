

import { ServiceType, ServiceYear, Discount } from "../types"
import { allServices } from "./services";

export const allDiscounts: Discount[] = [
    {
        getDiscountAmount(selectedServices: ServiceType[], year: ServiceYear): number {
            if (this.isApplicable(selectedServices)) {
                return 300;
            }

            return 0;
        },
        applicableForCombinedServices: [["WeddingSession", "VideoRecording"], ["WeddingSession", "Photography"]],
        isApplicable(selectedServices: ServiceType[]): boolean {
            return this.applicableForCombinedServices.some((serviceBundle: ServiceType[]) => serviceBundle.every(serviceName => selectedServices.includes(serviceName)));
        },
    },
    {
        getDiscountAmount(selectedServices: ServiceType[], year: ServiceYear): number {
            if (this.isApplicable(selectedServices, year)) {

                const weddingSessionPrice = allServices.find(x => x.serviceType == "WeddingSession").pricesForSpecifiedYears.find(x => x.applicableYears.includes(year)).price;
                return weddingSessionPrice;
            }

            return 0;
        },
        applicableForCombinedServices: [["WeddingSession", "Photography"]],
        isApplicable(selectedServices: ServiceType[], year: ServiceYear): boolean {
            return year == 2022 && this.applicableForCombinedServices.some((serviceBundle: ServiceType[]) => serviceBundle.every(serviceName => selectedServices.includes(serviceName)));
        },
    }
]
