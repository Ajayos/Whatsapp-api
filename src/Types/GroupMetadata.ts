import { Contact } from './Contact'

export type GroupParticipant = (
    Contact
    & {
        isAdmin?: boolean,
        isSuperAdmin?: boolean,
        admin?: 'admin' | 'superadmin' | null
    }
)

export type ParticipantAction = 'add' | 'remove' | 'promote' | 'demote'

export interface GroupMetadata {
    id: string
    owner: string | undefined
    subject: string
    subjectOwner?: string
    subjectTime?: number
    creation?: number
    desc?: string
    descOwner?: string
    descId?: string
    restrict?: boolean
    announce?: boolean
    membershipApprovalMode?: boolean
    size?: number
    participants: GroupParticipant[]
    ephemeralDuration?: number
    inviteCode?: string
    author?: string
}


export interface WAGroupCreateResponse {
    status: number
    gid?: string
    participants?: [
        {
            [
                key: string
            ]: {}
        }
    ]
}

export interface GroupModificationResponse {
    status: number
    participants?: {
        [
            key: string
        ]: {}
    }
}