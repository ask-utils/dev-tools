The package is WIP. Do not use before major release.
=============

@ask-utils/cli
==============

CLI tools for Alexa Skill development

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@ask-utils/cli.svg)](https://npmjs.org/package/@ask-utils/cli)
[![CircleCI](https://circleci.com/gh/hideokamoto/cli/tree/master.svg?style=shield)](https://circleci.com/gh/hideokamoto/cli/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/@ask-utils/cli.svg)](https://npmjs.org/package/@ask-utils/cli)
[![License](https://img.shields.io/npm/l/@ask-utils/cli.svg)](https://github.com/hideokamoto/cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @ask-utils/cli
$ ask-dev COMMAND
running command...
$ ask-dev (-v|--version|version)
@ask-utils/cli/0.0.6-alpha.0 darwin-x64 node-v10.5.0
$ ask-dev --help [COMMAND]
USAGE
  $ ask-dev COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`ask-dev generate-sam`](#ask-dev-generate-sam)
* [`ask-dev help [COMMAND]`](#ask-dev-help-command)

## `ask-dev generate-sam`

describe the command here

```
USAGE
  $ ask-dev generate-sam

OPTIONS
  -d, --dry-run                 dry run
  -f, --format=(json|yaml|yml)  [default: yaml]
  -h, --help                    show CLI help
  -o, --output=output           [default: template] output file name.
  --db=db                       DynamoDB Tablenames
  --s3=s3                       s3 bucket names

EXAMPLE
  $ ask-dev generate-sam
  Create new SAM template
```

_See code: [src/commands/generate-sam.ts](https://github.com/hideokamoto/cli/blob/v0.0.6-alpha.0/src/commands/generate-sam.ts)_

## `ask-dev help [COMMAND]`

display help for ask-dev

```
USAGE
  $ ask-dev help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_
<!-- commandsstop -->
