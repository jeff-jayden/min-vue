/**
 * observer.js
 *
 * 功能
 * - 把$data中的属性，转换成响应式数据
 * - 如果$data中的某个属性也是对象，把该属性转换成响应式数据
 * - 数据变化的时候，发送通知
 *
 * 方法：
 * - walk(data)  遍历data属性，调用defineReactive将数据转换成getter/setter
 * - defineReactive(data, key, value)  将数据转换成getter/setter
 *
 */

class Observer {
    constructor(data) {
        this.walk(data)
    }

    //遍历data转为响应式
    walk(data) {
        // 如果data为空或者或者data不是对象
        if (!data || typeof data !== "object") {
            return
        }
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
        })
    }

    //将data属性转为get//set
    defineReactive(data, key, value) {
        //判断是否为对象 是对象 递归
        this.walk(value)
        const that = this

        let dep = new Dep()

        //调用defineProperty设置get//set
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get() {
                //当编译的时候，new 了一个 watcher 才会添加到队列 添加一个监听器监听当前属性
                Dep.target && dep.addSub(Dep.target)
                return value;
            },
            set(newValue) {
                if (newValue === value) return
                value = newValue
                that.walk(newValue)
                dep.notify()
            }
        })
    }
}

