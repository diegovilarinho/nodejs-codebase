module.exports = {
    apps: [{
        name: "chaser",
        script: "index.js",
        watch: ".",
        ignore_watch : ["node_modules", "client/img"],
        // Delay between restart
        watch_delay: 1000,
        instances: "max",
        max_restarts: 3,
        interpreter : 'node@10.15.0',
        env: {
            "PORT": 3193,
            "NODE_ENV": "development"
        },
        env_production: {
            "PORT": 3193,
            "NODE_ENV": "production",
        }
    }],
    deploy: {
        production: {
            key: "/Users/diegovilarinho/.ssh/id_rsa.pub",
            user: "root",
            'forward-agent' : 'yes',
            ref: "origin/master",
            repo: "git@github.com:diegovilarinho/chaser.git",
            host: ["100.157.259.61"],
            ssh_options: "StrictHostKeyChecking=no",
            path: "/var/www/chaser",
            'post-deploy': "npm install",
            env  : {
                "NODE_ENV": "production"
              }
        }
    }
}