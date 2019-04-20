'use strict';
const assert = require('power-assert')
const { generateBoilerplate } = require('../dist/index');

describe('generateBoilerplate()', () => {
    describe('default json', () => {
        const stack = generateBoilerplate()
        const json = JSON.parse(stack)
        it('should contain parameters', () => {
            assert.deepEqual(json.Parameters, {
                "Stage": {
                  "Type": "String",
                  "Default": "production",
                  "Description": "stage"
                }
            })
        });
        it('should contain conditions', () => {
            assert.deepEqual(json.Conditions, {
                "IsProduction": {
                "Fn::Equals": [
                  {
                    "Ref": "Stage"
                  },
                  "production"
                ]
              }
            })
        });
    })
    
});
