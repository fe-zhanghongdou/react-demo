import RDL from 'readline'
const rl = RDL.createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
    let lineCount = 0;
    let t = 0;

    rl.on("line", (line) => {
        if (lineCount === 0) {
            // 第一行是测试组数 t
            t = parseInt(line);
            lineCount++;
        } else {
            // 处理后续的每组数据
            const [a, b] = line.split(" ")
            console.log(parseInt(a) + parseInt(b));
            lineCount++;

            // 如果已经处理完所有组，可以关闭输入流（可选）
            if (lineCount > t) {
                rl.close();
            }
        }
    }).on("close", () => {
        // 输入结束，可进行收尾工作
        process.exit(0);
    });

    while ((line = await readline())) {
        let tokens = line.split(" ");
        let a = parseInt(tokens[0]);
        let b = parseInt(tokens[1]);
        console.log(a + b);
    }
})();
