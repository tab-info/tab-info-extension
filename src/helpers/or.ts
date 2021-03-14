import { helper } from '@glimmerx/helper';

const orHelper = helper(([a, b]: [any, any]) => {
    return a || b;
});

export default orHelper;
