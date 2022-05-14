declare interface Group {
    users: User[]
    name: string
    id: string
    chores: Chore[]
}

declare interface Chore {
    name: string
    assignedTo: User
    completed: boolean
}

declare interface User {
    user: UserClass
    providerId: string
    _tokenResponse: TokenResponse
    operationType: string
}

declare interface TokenResponse {
    federatedId: string
    providerId: string
    email: string
    emailVerified: boolean
    firstName: string
    fullName: string
    lastName: string
    photoUrl: string
    localId: string
    displayName: string
    idToken: string
    context: string
    oauthAccessToken: string
    oauthExpireIn: number
    refreshToken: string
    expiresIn: string
    oauthIdToken: string
    rawUserInfo: string
    kind: string
}

declare interface UserClass {
    uid: string
    email: string
    emailVerified: boolean
    displayName: string
    isAnonymous: boolean
    photoURL: string
    providerData: ProviderDatum[]
    stsTokenManager: StsTokenManager
    createdAt: string
    lastLoginAt: string
    apiKey: string
    appName: string
}

declare interface ProviderDatum {
    providerId: string
    uid: string
    displayName: string
    email: string
    phoneNumber: null
    photoURL: string
}

declare interface StsTokenManager {
    refreshToken: string
    accessToken: string
    expirationTime: number
}
