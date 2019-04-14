// import { get } from "../utils/https"

const invalidChars = new RegExp(/[IOQ]/, "g")
const validateLenght = 17

export const filter = (vin: string) =>
    vin
        .toUpperCase()
        .replace(invalidChars, "")
        .substr(0, validateLenght)

export const validate = (_vin: string): string =>
    _vin.length !== validateLenght ? `${validateLenght} chars expected` : ""

export const convert = (_res: VinCheckResponse): CarInfo => {
    return {
        make: "Make BMW",
        model: "Model 528i",
        year: 2011,
        trim: "",
        vehicleType: ""
    }
}

export const apiCheck = async (_vin: string): Promise<CarInfo> => {
    // Wait 2 seconds to simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    return convert({
        Results: [
            {
                Value: "",
                ValueId: "",
                Variable: "",
                VariableId: 0
            }
        ]
    })
}
