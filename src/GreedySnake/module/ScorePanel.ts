// 计分板类
export default class ScorePanel{
    // score和level用来记录分数和等级
    score = 0;
    level = 1;

    // 设置一个最高等级变量和多少分数升级的变量
    maxLevel: number;
    upScore: number;

    // 分数和等级所在的元素，在构造函数中进行初始化
    scoreSpan: HTMLElement;
    levelSpan: HTMLElement;

    constructor(maxlevel: number = 10, upScore: number = 5){
        this.scoreSpan = document.getElementById('score')!;
        this.levelSpan = document.getElementById('level')!;
        this.maxLevel = maxlevel;
        this.upScore = upScore;
    }

    // 设置加分方法
    addScore(){
        // 使分数自增
        this.scoreSpan.innerHTML = ++this.score + '';
        // 判断分数多少，根据分数升级,每
        if(this.score % this.upScore === 0){
            this.levelUp();
        }

    }

    // 等级提升方法
    levelUp(){
        if(this.level < this.maxLevel){
            this.levelSpan.innerHTML = ++this.level + '';
        }
    }
}

