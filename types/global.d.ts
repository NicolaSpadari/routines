declare interface Group {
    id: string
    partecipants: Partecipant[]
    name: string
    chores: Chore[]
}

declare interface MinimalUser {
    id: string
    name: string
    email: string
    picture: string
}

declare interface Partecipant {
    user: MinimalUser
    owner: boolean
}

declare interface Invite {
    id: string
    inviteFrom: MinimalUser
    inviteTo: MinimalUser
    inviteToGroup: Group
    accepted: boolean
}

declare interface Chore {
    id: string
    name: string
    completed: string[]
}

declare interface User{
    uid: string
    email: string
    emailVerified: boolean
    displayName: string
    isAnonymous: boolean
    photoURL: string
    providerData: ProviderDatum[]
    stsTokenManager: {
        refreshToken: string
        accessToken: string
        expirationTime: number
    }
    createdAt: string
    lastLoginAt: string
    apiKey: string
    appName: string
}

declare interface FullUser {
    user: User
    providerId: string
    _tokenResponse?: {
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
    operationType: string
}

declare interface ProviderDatum {
    providerId: string
    uid: string
    displayName: string
    email: string
    phoneNumber: null
    photoURL: string
}
