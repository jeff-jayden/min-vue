/**
 * dep.js
 *
 * 功能
 * - 收集观察者
 * - 触发观察者
 *
 * 属性
 * - subs: Array
 * - target: Watcher
 *
 * 方法：
 * - addSub(sub): 添加观察者
 * - notify(): 触发观察者的update
 *
 */


class Dep {
    constructor() {
        this.subs = []
    }

    //添加观察者
    addSub(sub) {
        if (sub && sub.update && typeof sub === 'function') {
            this.subs.push(sub)
        }
    }

    notify() {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}

