/*
 * @Author: your name
 * @Date: 2021-02-21 14:50:01
 * @LastEditTime: 2021-02-22 01:14:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /algorithm-collation/0221.js
 */


/**
 * @url https://leetcode-cn.com/problems/longest-palindromic-substring/submissions/
 * @description 中心扩散 判断
 * @param {string} s 
 */
var longestPalindrome = function (s) {
    if (!s) return '';
    const stepGap = 0.5;
    const strLength = s.length;
    let centerIndex = 0;
    let maxCircleStr = s[0];
    while (centerIndex <= strLength) {
        let res = getCenterString(s, centerIndex);
        if (res.length > maxCircleStr.length) {
            maxCircleStr = res;
        }
        centerIndex += stepGap;
    }
    return maxCircleStr;
}
function getCenterString(originStr, centerIndex) {

    let leftIndex = Math.floor(centerIndex);
    let rightIndex = Math.ceil(centerIndex);
    while (originStr[leftIndex] === originStr[rightIndex] && originStr[leftIndex] !== undefined) {
        leftIndex--;
        rightIndex++;
    }
    return originStr.slice(leftIndex + 1, rightIndex)
}

const resstring = longestPalindrome('bbbbaasaabc');
console.log(resstring);


/**
 * @description 动态规划解法
 *              时空复杂度更高
 * @param {string} s 
 */
var longestPalindrome = function (s) {
    let n = s.length;
    let ans = []

    let dq = [];
    for (let index = 0; index < s.length; index++) {
        dq.push([])
    }
    // boolean[][] dq = new boolean[n][n];
    let max = 1;
    for (let j = 0; j < n; j++) {
        for (let i = 0; i < j; i++) {
            dq[i][j] = (s.charAt(i) == s.charAt(j)) && (j - i < 3 || dq[i + 1][j - 1]);
            if (dq[i][j] && max < j - i + 1) {
                max = j - i + 1;
                ans[0] = i;
                ans[1] = j;
            }
        }
    }
    return s.substring(ans[0], ans[1] + 1);
}




/**
 * @url https://leetcode-cn.com/problems/regular-expression-matching/comments/
 * @description 实现正则表达式匹配 
 *              动态规划  借助递归来回溯
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
    if (!p) return !s;

    const isFirstMatch = s && (p[0] === s[0] || p[0] === '.');

    if (p.length >= 2 && p[1] === '*') {
        return isMatch(s, p.slice(2)) || (isFirstMatch && isMatch(s.slice(1), p));
    } else {
        return isFirstMatch && isMatch(s.slice(1), p.slice(1));
    }
};

/**
 * @description 尝试通过构造状态机的方式来处理
 * @param {string} s 
 * @param {*} p 
 */
var isMatch = function (s, p) {
    const stateMachine = makeStateMachine(p);
    return stateMachine.checkStringMatchOrNot(s)
    // stateMachine.turnStateChange(6, "a")
}

function makeStateMachine(p) {
    let characterArr = [];
    for (let index = 0; index < p.length; index++) {
        if (p[index] && p[index + 1] === '*') {
            characterArr.push(p[index] + p[index + 1]);
        } else if (p[index] !== "*") {
            characterArr.push(p[index])
        }
    }
    console.log(characterArr);
    return new StateMachine({ character: characterArr });
}

class StateMachine {
    constructor({ character }) {
        /**
         * schema like
         * interface Rule{
         *      state: number,
         *      input: string,
         *      output: number,
         *      loop: boolean,
         * }
         */
        this.stateChangeRules = [];
        this.originCharacter = character;
        this.finalStateCount = 0;
        this.availableShiftStateArr = [];
        this.init();
    }
    init() {
        // 初始状态下的state为0
        let countingState = 0;
        this.originCharacter.forEach(characterStr => {
            if (characterStr.length === 1) {
                this.stateChangeRules.push({
                    state: countingState,
                    input: this.judgeSpecialCharacter(characterStr),
                    output: countingState + 1,
                    loop: false,
                })
                countingState++;
            } else if (characterStr[1] === "*") {
                if (this.stateChangeRules[this.stateChangeRules.length - 1] &&
                    this.stateChangeRules[this.stateChangeRules.length - 1].loop === true) {
                    countingState++
                    this.stateChangeRules.push({
                        state: countingState,
                        input: this.judgeSpecialCharacter(characterStr.slice(0, 1)),
                        output: countingState,
                        loop: true,
                    })
                    // S1 可以自由切换到S2  不需要任何输入
                    this.addNewShiftItem({
                        input: countingState - 1,
                        output: countingState,
                    })
                    // this.availableShiftStateArr.push({
                    //     input: countingState - 1,
                    //     output: countingState,
                    // })
                } else {
                    this.stateChangeRules.push({
                        state: countingState,
                        input: this.judgeSpecialCharacter(characterStr.slice(0, 1)),
                        output: countingState,
                        loop: true,
                    })
                }
                this.stateChangeRules[this.stateChangeRules.length - 1]
            }
        });
        this.finalStateCount = countingState;
        console.log(this.stateChangeRules)
        console.log('this.availableShiftStateArr');
        console.log(this.availableShiftStateArr);
    }
    checkStringMatchOrNot(str) {
        let stateOutput = [0];
        let newStateOutput = [];
        for (let index = 0; index < str.length; index++) {
            stateOutput = this.expandAvailableState(stateOutput);
            stateOutput.forEach(state => {
                newStateOutput = newStateOutput.concat(this.turnStateChange(state, str[index]));
            })
            stateOutput = newStateOutput;
            newStateOutput = [];
        }
        // 最后做一次兜底保障 由于这句话只在循环体里执行 所以这里要补充一句
        stateOutput = this.expandAvailableState(stateOutput);
        console.log(stateOutput);
        console.log(`checkStringMatchOrNot result: ${stateOutput.includes(this.finalStateCount)}`);
        return stateOutput.includes(this.finalStateCount)
    }
    expandAvailableState(states) {
        const expandStates = []
        states.forEach(state => {
            this.availableShiftStateArr.forEach(shift => {
                if (shift.input === state) {
                    expandStates.push(shift.output)
                }
            })
        })
        states = Array.from(new Set([...states, ...expandStates]));
        console.log(`expandStates: ${expandStates}`);
        console.log(states);
        return states;
    }
    turnStateChange(state, input) {
        const stateOutput = []
        this.stateChangeRules.forEach(rule => {
            if (rule.state === state && (rule.input === input || rule.input === "any")) {
                stateOutput.push(rule.output)
            }
        })
        console.log(`stateChange: ${state} , ${input} , ${JSON.stringify(stateOutput)}`);
        return stateOutput;
    }
    judgeSpecialCharacter(character) {
        return character === '.' ? 'any' : character
    }
    addNewShiftItem(shiftItem) {
        // S1 -> S2 , S2 -> S3 意味着 S1 -> S3
        const extraItem = []
        this.availableShiftStateArr.forEach(item => {
            if (item.output === shiftItem.input) {
                extraItem.push({
                    input: item.input,
                    output: shiftItem.output,
                })
            }
        })
        this.availableShiftStateArr = [...this.availableShiftStateArr, ...extraItem, shiftItem]
    }

}

isMatch('', "c*c*")






