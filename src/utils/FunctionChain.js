(function (w, F, undefined) {
    var slice = [].slice

    // bind兼容
    F.bind || (F.bind = function (context) {
        var fn   = this,
            args = slice.call(arguments, 1)

        return function () {
            fn.apply(context, args.concat(slice.call(arguments)))
        }
    })

    // 原型扩展
    function extend(prototype, obj) {
        for(var key in obj) { prototype[key] = obj[key] }
    }

    //-------∽-★-∽---- 函数中间对象 ----∽-★-∽--------//
    function MiddleObj(fn, args) {
        // 函数调用args方法后，返回的中间对象
        this.fn   = fn
        this.args = args
    }
    MiddleObj.prototype.valueOf = function () {
        if(createChain) {
            createChain = false
            nowCreateChain.functions.push(this.fn)
            nowCreateChain.args.push(this.args)
            createChain = true
            return false
        } else {
            return true
        }
    }

    //-------∽-★-∽---- 函数原型扩展 ----∽-★-∽--------//
    var sourceValueOf = F.valueOf
    extend(F, {
        // 设置 函数链 执行时 函数 使用的实参
        args: function () {
            return new MiddleObj(this, slice.call(arguments))
        },
        valueOf: function () {
            if(createChain) {
                createChain = false
                nowCreateChain.functions.push(this)
                nowCreateChain.args.push(undefined)
                createChain = true
                return false
            } else {
                return sourceValueOf.call(this)
            }
        }
    })

    // 结束创建函数链
    function cend() {
        createChain = 0
        return nowCreateChain
    }
    // 结束创建函数链 并 执行
    function cgo() {
        createChain = 0
        return nowCreateChain.go.apply(nowCreateChain, slice.call(arguments))
    }

    //-------∽-★-∽----- 函数链对象 -----∽-★-∽--------//
    var createChain    = 0,
        nowCreateChain = null

    function Chain() {
        if(this instanceof Chain) {
            // 标准语法创建
            this.functions = []     // 保存函数链中所有的函数
            this.args      = []     // 保存函数执 行时传入的参数

            this.add.apply(this, slice.call(arguments))
        } else {
            // 表达式语法创建
            if(arguments.length) throw new Error('请加上 new 关键字，如果你想使用表达式语法请不要传入参数')

            createChain    = 1
            nowCreateChain = new Chain()
        }
    }
    
    extend(Chain.prototype, {
        // 往函数链中添加函数
        add: function () {
            for(var i = 0; i < arguments.length; i++) {
                var fn = arguments[i], args = undefined

                if(fn.constructor === MiddleObj) {
                    args = fn.args
                    fn   = fn.fn
                } else if(typeof fn !== 'function') {
                    throw new Error('你传入的参数不是一个函数')
                }

                this.functions.push(fn)
                this.args.push(args)
            }

            return this
        },
        // 执行
        go: function () {
            function next() {
                var index = ++next.currentIndex,
                    chain = next.currentChain,
                    args

                // 结束：条件  index大于当前函数链的长度  ||  当前状态不是running
                if(index >= chain.args.length || next.state !== 'running') return

                if((args = chain.args[index]) === undefined) args = slice.call(arguments)

                chain.functions[index].apply(chain, args.concat(next))
            }

            extend(next, {
                state: 'running',
                currentChain: this,
                currentIndex: -1,
                switchTo: switchTo.bind(next),
                skip: skip.bind(next),
                stop: stop.bind(next)
            })

            next.apply(null, arguments)

            return this
        }
    })

    // 在next上调用，切换到另一个函数链上，如果传入一个普通函数，会自动转换成函数链对象
    function switchTo(chain, index) {
        if(typeof chain === 'function') {
            this.currentIndex = -1
            this.currentChain = new Chain(chain)
        } else if(chain.constructor === Chain) {
            this.currentIndex = index === undefined ? -1 : --index
            this.currentChain = chain
        } else {
            throw new Error('不能切换到一个非函数链对象上')
        }
    }
    // 在next上调用，跳过 x 步
    function skip(number) {
        this.currentIndex += number
    }
    // 在next上调用，停步
    function stop() {
        this.state = 'interrupted'
        this()
    }

    //-------∽-★-∽----- 对外接口 -----∽-★-∽--------//
    w.Chain = Chain
    w.cend  = cend
    w.cgo   = cgo
})(window, Function.prototype)