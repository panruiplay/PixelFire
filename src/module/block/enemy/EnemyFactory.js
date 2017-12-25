import Red from './Red'
import Speed from './Speed'

export default function (type, ...args) {
    switch(type){
        case 'Red':
            return new Red(...args)
        case 'Speed':
            return new Speed(...args)
    }
}