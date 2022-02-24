export default class Snake{
    // 蛇头的元素
    snakeHead: HTMLElement;
    // 蛇身的元素(包括蛇头)
    snakeBody: HTMLCollection;
    // 蛇的容器
    element: HTMLElement;

    constructor() {
        // 获取蛇的容器
        this.element = document.getElementById('snake')!;
        // 获取蛇头元素
        this.snakeHead = document.querySelector('#snake > div') as HTMLElement;
        this.snakeBody = document.getElementById('snake')!.getElementsByTagName('div');
    }
    // 获取蛇头位置
    get X(){
        return this.snakeHead.offsetLeft;
    }
    get Y(){
        return this.snakeHead.offsetTop;
    }

    // 设置蛇头位置
    set X(value: number){
        // 如果当前的X值等于之前的X值，直接返回，不用重新设置X值
        if(this.X === value){
            return ;
        }

        if(value < 0 || value > 290){
            // 说明蛇撞墙了
            throw new Error('游戏结束！');
        }
        // 判断是否掉头
        if(this.snakeBody[1] && (this.snakeBody[1] as HTMLElement).offsetLeft === value){
            if(value > this.X){
                value = this.X - 10;
            }else{
                value = this.X + 10;
            }
        }
        // 移动
        this.moveBody();

        this.snakeHead.style.left = value + 'px';
        // 检查是否撞到自身
        this.checkHeadBody();
    }
    set Y(value: number){
        if(this.Y === value){
            return ;
        }

        if(value < 0 || value > 290){
            // 说明蛇撞墙了
            throw new Error('游戏结束！');
        }

        if(this.snakeBody[1] && (this.snakeBody[1] as HTMLElement).offsetTop === value){
            if(value > this.Y){
                value = this.Y - 10;
            }else{
                value = this.Y + 10;
            }
        }

        this.moveBody();

        this.snakeHead.style.top = value + 'px';

        this.checkHeadBody();
    }

    addBody() {
        // 蛇添加一截身体(向蛇的容器中，添加一个身体的容器)
        const tempDiv = document.createElement('div')
        this.element.insertAdjacentElement("beforeend", tempDiv);
    }

    moveBody() {
        for(let i=this.snakeBody.length-1; i>0; i--) {
            let X = (this.snakeBody[i-1] as HTMLElement).offsetLeft;
            let Y = (this.snakeBody[i-1] as HTMLElement).offsetTop;

            (this.snakeBody[i] as HTMLElement).style.left = X + 'px';
            (this.snakeBody[i] as HTMLElement).style.top = Y + 'px';
        }
    }
    // 判断是否撞到自身
    checkHeadBody() {
        for(let i=1; i<this.snakeBody.length; i++){
            let body = this.snakeBody[i] as HTMLElement;
            if(this.X === body.offsetLeft && this.Y === body.offsetTop){
                throw new Error('撞到自身了');
            }
        }
    }
}