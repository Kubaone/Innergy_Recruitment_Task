export type ServiceYear = 2020 | 2021 | 2022;
export type ServiceType = "Photography" | "VideoRecording" | "BlurayPackage" | "TwoDayEvent" | "WeddingSession";

export type Service = {
    serviceType: ServiceType,
    pricesForSpecifiedYears: PriceForSpecifiedYears[],
    isPriceApplicable(selectedServices: ServiceType[])
};

export type PriceForSpecifiedYears = { applicableYears: ServiceYear[], price: number }

export type Discount = {
    getDiscountAmount(selectedServices: ServiceType[], year: ServiceYear): number,
    applicableForCombinedServices: ServiceType[][],
    bundlePriceForSpecifiedYears?: PriceForSpecifiedYears[],
    isApplicable(selectedServices: ServiceType[], year?: ServiceYear): boolean
}
    
export type ServiceBundle = {
    serviceTypes: ServiceType[],
    2020: number,
    2021: number,
    2022: number
}