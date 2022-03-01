module.exports = {
    apps : [{
      name: 'API',
      script: './App/src/index.js',
      watch: '.',
      env_dev: {
          NODE_ENV: 'dev',
          PORT: 3000,
          DB_USERNAME = 'admin',
          DB_PASSWORD = '32039315',
          DB_NAME = 'test',
          DB_PORT = 3306,
          DB_HOST = 'database-api.ckykju3tv4p6.us-east-1.rds.amazonaws.com',
          JWT_SECRET = 'H0l41Q2:;#$12ERjEioErtE9229w'
          
      }

    }],

    deploy : {
      production : {
        user : 'SSH_USERNAME',
        host : 'SSH_HOSTMACHINE',
        ref  : 'origin/master',
        repo : 'GIT REPOSITORY',
        path : 'DESTINATION_PATH',
        'pre-deploy-local': '',
        'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
        'pre-setup': ''
      }
    }

}