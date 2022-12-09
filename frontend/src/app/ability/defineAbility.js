import { defineAbility } from '@casl/ability';

export default defineAbility((can, cannot) => {
    can('access', 'dashboard');
    cannot('save', 'change');
});
