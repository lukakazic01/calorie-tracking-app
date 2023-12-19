export interface IJwtPayload {
    iat: string,
    exp: string
    data: Data
}

interface Data {
    name: string
}