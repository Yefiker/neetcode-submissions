class Solution {
    /**
     * @param {number} target
     * @param {number[]} position
     * @param {number[]} speed
     * @return {number}
     */
    carFleet(target, position, speed) {
        let pair = position.map((p, i) => [p, speed[i]]);
        pair.sort((a, b) => b[0] - a[0]);
        let stack = [];

        for(let [p, s] of pair) {
            let time = (target - p) / s;
            stack.push(time);

            if(stack.length >= 2 && stack[stack.length - 1] <= stack[stack.length - 2]) {
                stack.pop();
            }
        }
        return stack.length;
    }
}
