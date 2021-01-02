import { message } from './myModule';
import add, { substract } from './math';

console.log('add', add(1, 2));
console.log('substract', substract(3, 2));

console.log('hello graphql!', message);
