import { ServiceBundle, ServiceType } from "./types"

export const photographyVideoBundle: ServiceBundle = {
    serviceTypes: ["Photography", "VideoRecording"],
    // trade off: hardcoded values for a difference of sum of bundle services minus its bundle price
    2020: 3400 - 2200,
    2021: 3600 - 2300,
    2022: 3800 - 2500
}