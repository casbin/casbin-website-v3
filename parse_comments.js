const fs = require('fs');
const comments = JSON.parse(fs.readFileSync('C:\\Users\\Administrator\\.local\\share\\opencode\\tool-output\\tool_be01559ba001253C9dKPhBV7xs', 'utf8'));

console.log("Review Comments Summary:\n");

comments.forEach((c, i) => {
    console.log(`--- Comment ${i + 1} ---`);
    console.log(`File: ${c.path}:${c.line || c.original_line}`);
    console.log(`User: ${c.user.login}`);
    console.log(`Comment: ${c.body}\n`);
});
