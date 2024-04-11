// enforce-debug-prefix.js
module.exports = {
    create(context) {
        return {
            CallExpression(node) {
                if (
                    (node.callee.type === 'MemberExpression' && node.callee.property.name === 'log') ||
                    (node.callee.type === 'CallExpression' && node.callee.name.toLowerCase() === 'log')
                ) {
                    const parent = node.parent;
                    if (
                        parent.type !== 'LogicalExpression' ||
                        parent.operator !== '&&' ||
                        parent.left.type !== 'Identifier' ||
                        parent.left.name !== 'LOGS'
                    ) {
                        context.report({
                            node,
                            message:
                                'console.log should be prefixed with `process.env.LOGS && ` ',
                        });
                    }
                }
            },
        };
    },
};
