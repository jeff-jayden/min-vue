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

    walk(data) {
        // 如果data为空或者或者data不是对象
        if (!data || typeof data !== "object") {
            return
        }
        Object.keys(data).forEach(key=>{
            this.defineReactive(data, key, data[key])
        })
    }
}