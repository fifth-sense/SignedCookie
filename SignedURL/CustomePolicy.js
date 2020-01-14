
//custom url are more flexible than canned custome url can be applied on multiple file but in canned policy we have ti specify specific path to the resouce
const AWS = require('aws-sdk');
const privateKey = "-----BEGIN RSA PRIVATE KEY-----MIIEowIBAAKCAQEAgI8s9aC5vV3Bao7UDcrQNGashvcZ2bfBvG+tUcaWKwNgv9iunHI1JqtH5Z3N4tCqRbRpQ2l0qjzEjvE8rs/9ggbbGMDf/4QKimHYIgTvgjPaZGTjGQYlNGayIuAXL9x2ql5jgmRk6cYJmyVVzDHMR9uEvbnw7d6zHCfFILTJ55a8axl0ycUw3/nFG0PuFWEpzz7GKB729ejNjj0OhGm0Ffce5Mq1e9jx9UjV+IfGB5B2ZpU2JYfDt7GCCP7LdztpYbUvDDGvxs+eRvNj+5y8wIGggPUAE+ZozwnJX1sYMwPXMMCfZRYpGsn9u66hQz+cyh0i9IE4vp/sVc704Kl1fwIDAQABAoIBABpBIyVmlYgexYlFcfj/GlYZQdKuVBEqfd5F0FeK/s/5+KA1WDOK/1/OSviRqaJQivWBSp4Bw1mg32Nx0LrCrzsGu2fqu9Qq2xw3rzQDXgZxIICwOdC6eI6jCm4k5ZdYpsNUU24lopY7Y2rTzRnOcbGbGxjECHgLqvhtBs0PHsy0p7i7ldEZHKoY1xjRvNZuziMAAHVTf0Hwu9wzWjRmVy+XEE+oWewV4oVx80x1C2hTXbQxsnTDI9GEFRPAKGYiTVnh3sZH/wRddu8VVEj1tAKEZ3DYudrLA0zXNht4+8O4xfwlyqMCyHba6ytempGGn7DkCthjvAFBACLAuoLvswECgYEA5pY0p9iYsXZdSNWuZoSu1RYLqp0bjsfqWS7Ky3G19mJAIWl6oq3E2rfBEvzcxmK5nPx2HbuwwQXdC5OQfO96xyMlYfOVykMZL74RLx4YqOyT/xcrXH144ontkSJ3P+syhmIOsDhzR34d5GF76rqktg3tnN/3cWImoxl7k8EIYtECgYEAjrpbuUQhXsIajMQdTUML6ZNwjg1PN2pvuvkXjXHehIM9zSb8peyIaVj89amkujlKanwJPVID1XcSnXtMaQkAYDaeoaLO50RuJNiGVLnTF81XLQTKz74emnihIuq8iJ7zjyUUCtr5RTIbTgYBBX0bG4kouC9/IuyFgEAidz27R08CgYEAn0WZUWaW8d1kSe7u6/kyGhWEMXEbm+ASy0863JPKsEjlKy8EemG0266ZOlhW1uFSfFEV9Suzx2AZcumWn/V6xRpNs/7gtDjsqMGMdRNAzU28XDLQzK4OVcwXwGwiGpCG8bPBmY8kcXl3hEyhn10UcHvmaLl63WKCdZ4gccqf1EECgYBVjtUpK/QtD4JG29EM3aIodJ/GJ6hS+dTcajF6MsZG/T1w22wcMrxbGmMZCIacs3cuegg34BA4SFa6XI0jcafuBQ/2qNgKvnSgVcPAylwGKquVawgAnGFQC/vcKIa4B0DNkFaBY16F4lGH5gV6utIjIYdtUduOneYxSUDf5ft79QKBgAWGwHxrLAS+8GbDt5xj+eNFkooaKe7Ag7bNZ6rWGiMZFpJBooJ2EXk17zgch0i8Pu6DP3oSViGiV7ku/Bemt95yQwDbuEnfawWR47/LHVQMdDyzEzciudomla4N+kPBlhOKMj+bOwLC2Tu1ISOpLEdXrlu0NSNF7iJtkj2IU+YF-----END RSA PRIVATE KEY-----";

const cloudfront = new AWS.CloudFront.Signer('PUBLIC_ACCESS_KEY',privateKey);

const policy = JSON.stringify({
    "Statement" : [{
        "Resource": "http://d3dh4vtuzcywao.cloudfront.net/Count.mp4",
        "Condition":{
            "DateLessThan":
            {
                "AWS:EpochTime": Math.floor((new Date()).getTime()/1000) + (60*60*1)
            }
        }

    }]
});

cloudfront.getSignedUrl({
    policy,
},(err,url) =>{
    if(err) throw err;
    console.log(err);
});

