# Dependency-Injection-Managment    

(UNFINISHED)

// TODO LIST //

* v0 ... create module organization template

* v1 ... integrate 3rd party modules 
** make code scraper, 
** replace all requires with wrapper
** detect circular dependency




**** Ideally, DIM is a singleton.


Stages  ... event emmiter .. method::on

    * pre       before event cb
    * dur       during event cb
    * post      after  event cb

Methods
            <name>      <params>                        <sub-methods>

            * on        (stage,     method,     cb  )       null
            * import    (alias,     filepath        )       get, destroy  
            * export    (alias                      )       
            * instance  (alias                      )       new, get, divide, destroy

Sub-Methods
            * new       (alias,     arguments       )
            * get       (alias                      )
            * destroy   (alias                      )
            * divide    (alias,     properties      )


File Sys Loaded Modules     (Uninitiated Class)

    syntax: DIM.import('<alias key>','<module file path>')

    examples:

        DIM.import('fs',  'fs');
        DIM.import('pcs', 'process');
        DIM.import('./modules/server/main.js');

        ???DIM.export()???


Initiated Modules           (Instance)

    DIM.import().get()   // prints/returns imports

    DIM.instance('fs').new('<instance alias>', arguments);

    DIM.instance('fs').get('<instance alias>').<public prop>(args)

    DIM.instance('fs').destroy('<instance alias>')

    DIM.on('<stage>','<method>', cb)
    

    DIM.on('error', cb);

    DIM.on('import error', cb);

    DIM.on('instance error', cb);

    DIM.import('fs').destroy(); // terminates all existence
