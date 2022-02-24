import Snake from './Snake'
import Food from './Food'
import ScorePanel from './ScorePanel'

// 游戏控制类，控制其他所有类
export default class GameCtrl{
    // 定义三个属性
    // 蛇
    snake: Snake;
    // 食物
    food: Food;
    // 计分板
    scorePanel: ScorePanel;
    // 创建一个属性存储按键方向
    direction: string = 'Right';
    // 定义游戏是否结束(根据蛇的状态)
    isGG: boolean = true;
    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();
        this.init();
    }

    // 游戏初始化方法
    init() {
        // 绑定键盘事件
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        this.run();
    }

    // 创建一个键盘响应函数
    keydownHandler(event: KeyboardEvent) {
        // 检查用户按键是否正确

        // 修改direction属性
        this.direction = event.key;
        console.log(this.direction);
        
    }

    // 创建一个控制蛇移动的方法
    run() {
        /*
            根据(this.direction)来使蛇的位置改变
                向上 top 减少
                向下 top 增加
                向左 left 减少
                向右 left 增加
         */
        // 获取蛇当前坐标
        let X = this.snake.X;
        let Y = this.snake.Y;

        switch(this.direction){

            case "ArrowUp":
            case "Up":
                // 向上移动
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                // 向下移动
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                // 向左移动
                X -= 10;
                break;
            case "ArrowRight":
            case "Right":
                // 向右移动
                X += 10;
                break;
        }
        this.checkEat(X, Y);

        try{
            // 修改蛇的X Y 值
            this.snake.X = X;
            this.snake.Y = Y;
        }catch (err){ 
            alert('游戏结束');
            this.isGG = false;
        }
        
        // 设置定时调用
        this.isGG && setTimeout(this.run.bind(this), 300-(this.scorePanel.level-1)*30);
    }

    // 定义方法，用来检查蛇是否吃到食物
    checkEat(X: number, Y: number) {
        // 检查蛇是否吃到食物了
        if(X === this.food.X && Y === this.food.Y){
            // 改变食物位置
            this.food.change();
            // 增加分数
            this.scorePanel.addScore();
            // 增加蛇的长度
            this.snake.addBody();
        }
    }
}