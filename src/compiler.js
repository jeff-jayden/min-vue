/**
 * compiler.js
 *
 * 功能
 * - 编译模板，解析指令/插值表达式
 * - 负责页面的首次渲染
 * - 数据变化后，重新渲染视图
 *
 * 属性
 * - el -app元素
 * - vm -vue实例
 *
 * 方法：
 * - compile(el) -编译入口
 * - compileElement(node) -编译元素（指令）
 * - compileText(node) 编译文本（插值）
 * - isDirective(attrName) -（判断是否为指令）
 * - isTextNode(node) -（判断是否为文本节点）
 * - isElementNode(node) - （判断是否问元素节点）
 */

class Compiler {
    constructor(vm) {
        this.vm = vm;
        this.el = vm.$el;
        this.compiler(this.el);
    }

    compiler(el) {
        if (!el) return;
        const nodes = el.childNodes;

        //收集
        Array.from(nodes).forEach(node => {
            //文本类型节点编译
            if (this.isTextNode(node)) {
                //编译文本节点
                this.compileText(node);
            } else if (this.isElementNode(node)) {
                //编译元素节点
                this.compileElement(node);
            }
            //如果还有子节点 继续编译
            if (node.childNodes && node.childNodes.length) {
                this.compiler(node);
            }
        });
    }


    // 添加指令方法 并且执行
    update(node, value, attrName, key) {
        const updateFn = this[`${attrName}Updater`];
        updateFn && updateFn.call(this, node, value, key);
    }

    textUpdater(node, value, key) {
        node.textContent = value;
        new Watcher(this.vm, key, (newValue) => {
            node.textContent = newValue;
        })
    }

    modelUpdater(node, value, key) {
        // 初始化给元素的值
        node.value = value;
        node.addEventListener('input', e => {
            this.vm[key] = node.value;
        })
        new Watcher(this.vm, key, (newValue) => {
            node.value = newValue;
        })
    }

    //编译元素节点
    compileElement(node) {
        Array.from(node.attributes).forEach(attr => {
            //获取属性名
            let _attrName = attr.name;
            //判断是否是 v- 开头
            if (this.isDirective(_attrName)) {
                const attrName = _attrName.substr(2);
                //获取属性值
                //v-model="msg"  msg="zs"
                const key = attr.value;
                const value = this.vm[key];
                this.update(node, value, attrName, key);
            }
        })
    }

    //编译文本元素
    compileText(node) {
        const reg = /\{\{(.+?)\}\}/;

        //获取节点内容
        var param = node.textContent;

        if (reg.test((param))) {
            //获取{{}}中的内容
            const key = RegExp.$1.trim();
            //字符串替换 将变量转换为值
            node.textContent = param.replace(reg, this.vm[key]);
            //添加监听器
            new Watcher(this.vm, key, (newValue) => {
                node.textContent = newValue;
            })
        }
    }

    //判断元素的属性是否是vue指令
    isDirective(attrName) {
        return attrName && attrName.startsWith("v-");
    }

    //判断是否为文本节点
    isTextNode(node) {
        return node && node.nodeType === 3;
    }

    //判断是否是元素节点
    isElementNode(node) {
        return node && node.nodeType === 1;
    }
}

