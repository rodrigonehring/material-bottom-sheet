import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import chai from 'chai'
// import 'jest-enzyme'

configure({ adapter: new Adapter() })

global.jestExpect = global.expect
global.expect = chai.expect
global.requestAnimationFrame = (cb) => cb()
