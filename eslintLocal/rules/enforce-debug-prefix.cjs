// enforce-debug-prefix.js
module.exports = {
    create(context) {
        return {
            CallExpression(node) {
                if (
                    node.callee.type === 'MemberExpression' &&
                    node.callee.property.name === 'log'
                ) {
                    const parent = node.parent;
                    if (
                        parent.type !== 'LogicalExpression' ||
                        parent.operator !== '&&' ||
                        parent.left.name !== 'IS_DEBUG'
                    ) {
                        context.report({
                            node,
                            message:
                                'console.log should be prefixed with IS_DEBUG &&',
                        });
                    }
                }
            },
        };
    },
};
