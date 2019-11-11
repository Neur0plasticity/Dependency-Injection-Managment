module.exports = function() {
    // const sd = static_data    = {};
    // const sm = static_methods = {};
    // const pm = public_methods = {};

    const params = {};

    const methods     = {};
    const smethods    = {}; // sub methods;

    const stages = ['pre','dur','post'];
    
    const List = function() {
        let list = {};

        let pm = {
            get: function(key) {
                if (!key)      {return list}
                if (list[key]) {return list[key]}
                return undefined;  
            },
            cre: function(key, val) {
                if (pm.get(key) == undefined) {list[key] = val; return true;}
                return false;
            },
            mod: function(key, val) {
                if (pm.get(key) !== undefined) {list[key]=val; return true;}
                return false;
            },
            del: function(key) {
                if (pm.get(key) !== undefined) {return delete list[key];}
                return false;
            }
        };
        return Object.freeze(pm);
    };

    let lists = {
        imports:    new List(),
        exports:    new List(),
        instances:  new List(),
        // on:         new List()
    }

    function throwE() {throw new Error()}

    params.stage = function(v)      {return stages.includes(v);};
    params.method = function(v)     {return typeof (methods[v] || smethods[v]) === 'function';};
    params.cb = function(v)         {return typeof cb === 'function';};
    params.alias = function(v)      {return (v.length > 0) && (typeof v === 'string');};
    params.filepath = function(v)   {return (v.length > 0) && (typeof v === 'string');};// minimal validations
    params.args = function(v)       {return (v.length > 0) && (Array.isArray(v));};
    params.properties = function(v) {
        if (!Array.isArray(v)) {return false;}
        for (let k in v) {
            if (!(typeof v[k] !== 'string' && v.length !== 0)) {return false;}
        }
        return true;
    };

    // methods.on      = function(stage,   method,     cb) {};
    // methods.import  = function(alias,   filepath)       {};
    // methods.export  = function(alias)                   {};
    // methods.instance= function(alias)                   {};

    // smethods.new    = function(alias, args)             {};
    // smethods.get    = function(alias)                   {};
    // smethods.destroy= function(alias, properties)       {};
    // smethods.divide = function(alias, properties)       {};


    // methods.on      = function(stage,   method,     cb) {
    //     if (arguments.length === 0) {
    //         return lists['on'];
    //     } else {
    //         (params.stage(stage) && params.method(method) && params.cb(cb)) || throwE();


    //         list['on'].mod();

    //     }
    // };
    methods.import  = function(alias,   filepath)       {
        if (arguments.length === 0) {
            
        } else {
            (params.alias(alias)&&params.filepath(filepath)) || throwE();
            lists['imports'].cre(alias, require(filepath));
        }
        return {
            get:        smethods.get.bind(lists['imports']), 
            destroy:    smethods.destroy.bind(lists['imports'])
        }
    };
    methods.export  = function(alias)                   {
        (params.alias(alias)) || throwE();
        if (arguments.length === 0) {


        } else {

        }
        return {
            get:        smethods.get.bind(lists['exports']), 
            destroy:    smethods.destroy.bind(lists['exports'])
        }
    };
    methods.instance= function(import_alias, alias, args)                   {
        if (arguments.length === 0) {


        } else {
            (params.alias(import_alias)&&params.alias(alias)) || throwE();
            let ia = methods.import().get(import_alias);
            console.log('ia');
            console.log(ia);
            
            if (ia) {

                lists['instances'].cre(import_alias + " " +alias, ia);

                return methods.instance().new(import_alias + " " +alias, args);
            } else {    
                throwE();
            }
        }
        return {
            new:        smethods.new.bind(lists['instances']),
            get:        smethods.get.bind(lists['instances']), 
            destroy:    smethods.destroy.bind(lists['instances']),
            divide:     smethods.divide.bind(lists['instances'])
        }
    };

    // smethods.new    = function(alias, args)             {};
    // smethods.get    = function(alias)                   {};
    // smethods.destroy= function(alias, properties)       {};
    // smethods.divide = function(alias, properties)       {};


    smethods.new = function(alias, args) {
        (params.alias(alias) && params.args(args)) || throwE();
        
        return new this.get(alias);
    };
    smethods.get = function(alias) {
        if (!!alias) params.alias(alias) || throwE();
        return this.get(alias);
    };
    smethods.destroy = function(alias) {
        (params.alias(alias)) || throwE();

        return this.del(alias);
    };
    smethods.divide = function(alias, properties) {
        (params.alias(alias) && params.properties(properties)) || throwE();
        let obj = {};
        let list = this.get(alias);
        for (let k in list) {
            if (props.includes(list[alias][k])) {
                obj[k] = list[alias][k];
            }
        }
        return this.list
    };

    // const funCWrapper = function() {

    //     let MfuncS = Object.keys(methods);
    //     let SfuncS = Object.keys(smethods);

    //     var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    //     var ARGUMENT_NAMES = /([^\s,]+)/g;
    //     function getParamNames(func) {
    //         var fnStr = func.toString().replace(STRIP_COMMENTS, '');
    //         var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    //         if(result === null)
    //             result = [];
    //         return result;
    //     }
    //     function validationWrapper(paramsArr) {
    //         let validators = [];
    //         for (let k in paramsArr) {
    //             if (!params[paramsArr[k]]) {throw new Error();}
    //             validators.push(params[k]);
    //         }
    //         return ()=>{
    //             for (let f in validators) {
    //                 if (!validators[f](arguments[0][f])) {return false}
    //             } 
    //         }
    //     }
    //     function blockWrapper() {

    //     }
    //     MfuncS.forEach((e)=>{
    //         let v       = validationWrapper(methods[e]);
    //         let b       = blockWrapper     (methods[e]);
    //         methods[e] = function() {
    //             return v(arguments) && b(arguments);
    //         };
    //     });
    //     // SfuncS.forEach((e)=>{
    //     //     smethods[e] = function() {
    //     //         return validations(arguments) && block(arguments);
    //     //     };
    //     // });
    // };

    // const sub_methods = function() {};    

    // const argLenCondition = function(args, onLen0, onLenX) {
    //     // any method invoke argumentless returns a cloned list.
    //     // sub methods not included.
    //     return (args.length===0)?(onLen0(),this.list):(onLenX());
    // };

    // // sub methods are universal to methods
    // // in order too use them, you must bind call

    // methods.on.validate = function(stage,   method,     cb) {
    //     return params.stage(stages) && params.method(method) && params.cb(cb);
    // };
    // methods.on.block = function(stage,   method,     cb) {
    //     return argLenCondition(;
    // };
    // methods.import.validate = function(alias,   filepath) {
    //     return params.alias(alias) && params.filepath(filepath);
    // };
    // methods.import.block = function(alias,   filepath) {

    // };
    // methods.export.validate = function(alias) {
    //     return params.alias(alias);
    // };
    // methods.export.block = function(alias) {

    // };
    // methods.instance.validate = function(alias) {
    //     return params.alias(alias);
    // };
    // methods.instance.block = function(alias) {

    // };
    // smethods.new.validate = function(alias) {
    //     return params.alias(alias);
    // };
    // smethods.new.block = function() {
    //     this.list[alias] = new this[alias](args);
    //     return get[alias];
    // };
    // smethods.get.validate = function(alias) {
    //     return params.alias(alias);
    // }
    // smethods.get.block = function() {
    //     return this.list[alias];
    // };
    // smethods.destroy.validate = function(alias) {
    //     return params.alias(alias);
    // };
    // smethods.destroy.block = function() {
    //     return delete this.list[alias];
    // };
    // smethods.divide.validate = function(properties) {
    //     return params.properties(properties);
    // };    
    // smethods.divide.block = function() {
    //     let obj = {};
    //     for (let k in this.list) {
    //         if (props.includes(this.list[alias][k])) {
    //             obj[k] = this.list[alias][k];
    //         }
    //     }
    //     return this.list
    // };
    const pm = methods;
    return Object.freeze(pm);
}