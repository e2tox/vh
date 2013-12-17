
var createRouter = function() {

    function router(req, res) {

        var options = router.options
            , table = router.table;

        if (req.headers.host) {
            var host = req.headers.host.split(':')[0];
            var server = table[host];
            if (!server) {
                for (var i=0;i<options.length;++i) {
                    if(options[i].regexp.test(host)) {
                        server = table[host] = options[i].server;
                    }
                }
            }
            if (server) {
                return server(req, res);
            }
        }
        return router.others(req, res);
    }

    router.when = function(hostname, server) {
        router.options.push({
            hostname: hostname,
            regexp: new RegExp('^' + hostname.replace(/[^*\w]/g, '\\$&').replace(/[*]/g, '(?:.*?)')  + '$', 'i'),
            server: server
        });
        return router;
    };

    router.otherwise = function(func) {
        router.others = func;
        return router;
    };

    router.table = {};
    router.options = [];
    router.others = function(){};

    return router;
};

module.exports = createRouter;