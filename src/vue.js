/**
 * vue.js
 *
 * 属性
 * - $el：挂载的dom对象
 * - $data: 数据
 * - $options: 传入的属性
 *
 * 方法：
 * - _proxyData 将数据转换成getter/setter形式
 *
 */

// 通常情况下 $ 前缀被用来表示 Vue 实例或者 Vue.js 提供的特定属性、方法或对象


class Vue {
    constructor(options) {
        // 获取传入的对象 默认为空对象
        this.$options = options || {}
        this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
        this.$data = options.data || {}
        // 把data中的属性注册到Vue
        this._proxyData(this.$data)
        // 使用Obsever把data中的数据转为响应式 并监测数据的变化，渲染视图
        new Observer(this.$data)
        // 编译模板 渲染视图
        new Compiler(this)
    }

    _proxyData(data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                //可遍历
                enumerable: true,
                //可配置
                configurable: true,
                get() {
                    return data[key]
                },
                set(newValue) {
                    if (newValue === data[key]) {
                        return
                    }
                    data[key] = newValue
                }
            })
        })
    }
}

