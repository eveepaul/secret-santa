import type { SelectUser, SelectMember, SelectPool } from '~/types/dbTypes';
export type UserPoolResponse = SelectUser & {
    pools: Array<SelectPool & {
        members: {
            member: SelectMember;
        }[];
    }>;
};