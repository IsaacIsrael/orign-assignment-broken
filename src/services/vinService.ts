import { get } from "../utils/https"

const invalidChars = new RegExp(/[IOQ]/, "g")
const validateLenght = 17
const apiURL = `https://vpic.nhtsa.dot.gov/api/vehicles/`
const apiMap = {
    make: "Make",
    model: "Model",
    year: "Model Year",
    trim: "Trim",
    vehicleType: "Vehicle Type"
}

export const filter = (vin: string) =>
    vin
        .toUpperCase()
        .replace(invalidChars, "")
        .substr(0, validateLenght)

export const validate = (_vin: string): string =>
    _vin.length !== validateLenght ? `${validateLenght} chars expected` : ""

const isResultEmpty = (result: VinCheckResponse): boolean => !result || !result.Results || result.Results.length === 0

export const convert = (_res: VinCheckResponse): CarInfo => {
    if (isResultEmpty(_res)) {
        return null
    }
    // function for retravel the value
    const retrievalValue = (field: string): string => {
        const result = _res.Results.find(info => info.Variable === field)
        return result ? result.Value : ""
    }
    return {
        make: retrievalValue(apiMap.make),
        model: retrievalValue(apiMap.model),
        year: parseInt(retrievalValue(apiMap.year), 10),
        trim: retrievalValue(apiMap.trim),
        vehicleType: retrievalValue(apiMap.vehicleType)
    }
}

export const apiCheck = async (_vin: string): Promise<CarInfo> => {
    return convert((await get(`${apiURL}DecodeVin/${_vin}?format=json`)) as VinCheckResponse)
}
