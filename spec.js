let alg = require('./main.js');
console.warn(`
    module(<name>)
        .instance(<name>) //0->n//
        .instance(<name>) //1
        .instance(<name>) //2
        .instance(<name>) //3
        .instance(<name>) //4
        .instance(<name>) //5
        .instance(<name>) //n
    module(<name>)
        .instance(<name>) //0->n//
        .instance(<name>) //1
        .instance(<name>) //2
        .instance(<name>) //3
        .instance(<name>) //4
        .instance(<name>) //5
        .instance(<name>) //n
`);
console.warn(
`
    BUG:        ists need to return cloned values
    Delayed:    on method postponed
`
);
console.log(alg);
let DIM = alg();
console.log(DIM);
/////////////////
// Test on
/////////////////
// DIM.on('pre', 'import', ()=>{console.log('passed')})
// DIM.on('dur', 'import', ()=>{console.log('passed')})
// DIM.on('post', 'import', ()=>{console.log('passed')})
/////////////////
// Test Import
/////////////////
let a = DIM.import('fs', 'fs');
let b = DIM.import('process','process');
let c = DIM.import().get('fs');
let d = DIM.import().get('process');
let e = DIM.import().get()
console.log(c);
console.log(d);
console.log(e); // prints all imports
let f = DIM.import().destroy('fs');
let g = DIM.import().destroy('fs');
console.log(f === true);
console.log(g === false);
/////////////////
// Test Export
/////////////////
console.log('export not programmed');
/////////////////
// Test Instance
/////////////////
DIM.import('fs','fs');
let h = DIM.instance('fs', 'fs0',           [0,1,2]);
let i = DIM.instance('process', 'process0', [0,1,2])
let j = DIM.instance('process', 'process1', [0,1,2])
console.log('h');
console.log(h);
console.log('i');
console.log(i);
console.log('j');
console.log(j);
console.warn('need to test divide');



