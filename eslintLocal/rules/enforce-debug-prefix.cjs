// enforce-debug-prefix.js
module.exports = {
    create(context) {
        return {
            CallExpression(node) {
                if (
                    (node.callee.type === 'MemberExpression' && node.callee.property.name === 'log') ||
                    (node.callee.type === 'Identifier' && node.callee.name === 'log')
                ) {
                    const parent = node.parent;
                    if (
                        parent.type !== 'LogicalExpression' ||
                        parent.operator !== '&&' ||
                        parent.left.name !== 'LOGS_ENABLED'
                    ) {
                        context.report({
                            node,
                            message:
                                'console.log should be prefixed with LOGS_ENABLED &&',
                        });
                    }
                }
            },
        };
    },
};
