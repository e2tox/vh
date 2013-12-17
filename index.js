/**
 * Copyright 2013 =E.2=TOX
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Created by ling on 12/17/13 1:53 PM
 */

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