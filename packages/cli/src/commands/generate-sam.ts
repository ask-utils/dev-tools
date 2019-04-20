import {Command, flags} from '@oclif/command'
import { writeFileSync } from 'fs'
import { generateBoilerplate } from '@ask-utils/sam-boilerplate'

export default class Hello extends Command {
  static description = 'describe the command here'

  static examples = [
    `$ ask-dev generate-sam
Create new SAM template
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
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
    console.log({s3, db})
    const s3BucketNames = s3 ? s3.split(',') : undefined
    const dbTableNames = db ? db.split(','): undefined
    try {
      const fileName = `${output}.${format}`
      const stack = generateBoilerplate({
        format,
        s3BucketNames,
        dbTableNames
      })
      writeFileSync(fileName, stack)
      this.log(`Generate SAM template: ${fileName}`)
    } catch (e) {
      this.error(e)
      this.log('Error: Failed to generate SAM template')
    }
  }
}
