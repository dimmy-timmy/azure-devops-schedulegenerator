# azure-devops-schedulegenerator
Generates Azure Pipelines schedule trigger from cron pattern
Cron format parser uses https://github.com/harrisiirak/cron-parser

```
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    |
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, optional)
```

Month, day of month and second are not supported due to Azure Devops limitations.


# Usage

```
index.js <command>

Commands:
  index.js gf <filePath>                    generate schedule as json file
  index.js ur <pipeline> <project>          update release pipeline schedule
  <organization>

Options:
  --version      Show version number                                   [boolean]
  --pattern, -p  Cron pattern for schedule                              [string]
  --help, -h     Show help                                             [boolean]
```

# Pattern examples

```
* */3 * * * *  // run release every 3 minutes 
```

```
* * */2 * * 1-5 // run release every 2 hours from Monday till Friday
```