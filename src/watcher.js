/**
 * watcher.js
 *
 * 功能
 * - 生成观察者更新视图
 * - 将观察者实例挂载到Dep类中
 * - 数据发生变化的时候，调用回调函数更新视图
 *
 * 属性
 * - vm: vue实例
 * - key: 观察的键
 * - cb: 回调函数
 *
 * 方法：
 * - update()
 *
 */

class Watcher {
    constructor(vm, key, cb) {
        this.vm = vm;
        this.key = key;
        this.cb = cb;

        Dep.target = this;
        // 只会在第一次出发
        this.oldValue = vm[key];
        Dep.target = null;
    }

    update() {
        let newValue = this.vm[this.key]

        if (newValue !== this.oldValue) {
            this.oldValue = newValue;
            this.cb(newValue)
        }
    }
}

