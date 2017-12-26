import Red from './Red'
import Speed from './Speed'
import Yellow from './Yellow'

export default function (type, ...args) {
    switch(type){
        case 'Red':
            return new Red(...args)
        case 'Speed':
            return new Speed(...args)
        case 'Yellow':
            return new Yellow(...args)
    }
}