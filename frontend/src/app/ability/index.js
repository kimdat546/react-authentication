import { PureAbility } from '@casl/ability';
import { createCanBoundTo } from '@casl/react';

const ability = new PureAbility([]);

export const Can = createCanBoundTo(ability);

export default ability;
