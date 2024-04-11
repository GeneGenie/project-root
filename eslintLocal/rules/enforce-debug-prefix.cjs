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
                            parent.left.type !== 'MemberExpression' ||
                            parent.left.object.type !== 'MemberExpression' ||
                            parent.left.object.object.name !== 'process' ||
                            parent.left.object.property.name !== 'env' ||
                            parent.left.property.name !== 'NO_LOGS'
                    ) {
                        context.report({
                            node,
                            message:
                                'console.log should be prefixed with `process.env.NO_LOGS && ` ',
                        });
                    }
                }
            },
        };
    },
};
