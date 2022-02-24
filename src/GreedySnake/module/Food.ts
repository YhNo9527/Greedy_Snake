// 定义食物类
export default class Food{
    // 定义一个属性表示食物所对应的元素
    element: HTMLElement;
    constructor() {
        // 获取页面中的food元素并将其赋值给element
        this.element = document.getElementById('food')!;
    }
    // 获取食物的坐标
    get X() {
        return this.element.offsetLeft;
    }
    get Y(){
        return this.element.offsetTop;
    }

    // 修改食物的位置
    change() {
        // 生成随机的位置
        // 食物位置最小0，最大是290
        // 蛇移动一次是一格，一格大小是10，所以食物的坐标只能是整10的
        let top = Math.round(Math.random() * 29) * 10;
        let left = Math.round(Math.random() * 29) * 10;

        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    }
}