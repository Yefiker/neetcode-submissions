class Solution {
    /**
     * @param {string[]} strs
     * @returns {string}
     */
    encode(strs) {
        let finalResult = "";
        for(let i = 0; i < strs.length; i++) {
            finalResult += (`${strs[i].length}#${strs[i]}`);
        }
        return finalResult;
    }

    /**
     * @param {string} str
     * @returns {string[]}
     */
    decode(str) {
        let i = 0;
        let finalResult = [];
        while(i < str.length) {
            let findDelima = str.indexOf('#', i);
            if (findDelima === -1) {
                break;
            }
            const length = parseInt(str.slice(i, findDelima), 10);
            const startIndex = findDelima + 1;
            const extractedText = str.substring(startIndex, startIndex + length);

            finalResult.push(extractedText);
            i = startIndex + length;
        }
        return finalResult;
    }
}
