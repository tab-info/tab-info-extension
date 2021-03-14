import { helper } from '@glimmerx/helper';

const logHelper = helper(([val]: [any]) => {
    console.log(val);
});

export default logHelper;
