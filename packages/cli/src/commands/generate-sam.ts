import {Command, flags} from '@oclif/command'
import { writeFileSync } from 'fs'
import { generateBoilerplate } from '@ask-utils/sam-boilerplate'
import chalk from 'chalk'

export default class Hello extends Command {
  static description = 'describe the command here'

  static examples = [
    `$ ask-dev generate-sam
Create new SAM template
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    "dry-run": flags.boolean({
      char: 'd',
      description: 'dry run'
    }),
    output: flags.string({
      char: 'o',
      description: 'output file name.',
      default: 'template'
    }),
    format: flags.enum({
      char: 'f',
      options: [
        'json',
        'yaml',
        'yml'
      ],
      default: 'yaml'
    }),
    s3: flags.string({
      description: 's3 bucket names',
    }),
    db: flags.string({
      description: 'DynamoDB Tablenames',
      
    })
  }

  async run() {
    const { flags } = this.parse(Hello)
    const { format, output, s3, db } = flags
    const isDryrun = flags["dry-run"] || false
    if (isDryrun) this.log(`${chalk.yellow('[WARNING]')}: Dry-run mode`)
    const s3BucketNames = s3 ? s3.split(',') : undefined
    const dbTableNames = db ? db.split(','): undefined
    try {
      const fileName = `${output}.${format}`
      const config = {
        format,
        s3BucketNames,
        dbTableNames
      }
      this.log(`${chalk.green('[START]')} Generate SAM Template: %j`, config)
      const stack = generateBoilerplate(config)
      if (isDryrun) {
        this.log(stack)
        this.log(`${chalk.green('[DRY-RUN COMPLETE]')} You can create the template. And the filename is ${chalk.green(fileName)}`)
        return
      }
      writeFileSync(fileName, stack)
      this.log(`${chalk.green('[COMPLETE]')} New tempalte file:  ${fileName}`)
    } catch (e) {
      this.log(`${chalk.red('[ERROR]')}: Failed to generate SAM template`)
      this.log('Stack trace')
      this.error(e)
    }
  }
}
