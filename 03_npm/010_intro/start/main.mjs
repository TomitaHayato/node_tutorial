import _ from 'lodash';

const original = { prop: { nested: "value" } };
// オブジェクトの複製
// console.log(_)
const dup = _.cloneDeep(original);
dup.prop = 'change';

console.log(original)
console.log(dup)
