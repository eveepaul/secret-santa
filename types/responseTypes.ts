import type { SelectUser, SelectMember, SelectPool } from '~/types/dbTypes';

export type SelectPoolAndMembers = SelectPool & {
    members: {
        member: SelectMember;
    }[];
};

export type UserPoolResponse = SelectUser & {
    pools: Array<SelectPoolAndMembers>;
};