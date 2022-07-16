import { Service, ServiceType } from "../types"

export const allServices: Service[] = [
    { serviceType: "Photography", pricesForSpecifiedYears: [{ applicableYears: [2020], price: 1700 }, { applicableYears: [2021], price: 1800 }, { applicableYears: [2022], price: 1900 }], isPriceApplicable(selectedServices: ServiceType[]) { return true; } },
    { serviceType: "VideoRecording", pricesForSpecifiedYears: [{ applicableYears: [2020], price: 1700 }, { applicableYears: [2021], price: 1800 }, { applicableYears: [2022], price: 1900 }], isPriceApplicable(selectedServices: ServiceType[]) { return true; } },
    { serviceType: "BlurayPackage", pricesForSpecifiedYears: [{ applicableYears: [2020, 2021, 2022], price: 300 }], isPriceApplicable(selectedServices: ServiceType[]) { return selectedServices.includes("VideoRecording") } },
    { serviceType: "TwoDayEvent", pricesForSpecifiedYears: [{ applicableYears: [2020, 2021, 2022], price: 400 }], isPriceApplicable(selectedServices: ServiceType[]) { return selectedServices.includes("VideoRecording") || selectedServices.includes("Photography") } },
    { serviceType: "WeddingSession", pricesForSpecifiedYears: [{ applicableYears: [2020, 2021, 2022], price: 600 }], isPriceApplicable(selectedServices: ServiceType[]) { return true; } },
];