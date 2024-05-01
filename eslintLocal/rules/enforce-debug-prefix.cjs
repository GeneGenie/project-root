//https://developers.mews.com/how-to-write-custom-eslint-rules/
module.exports = {
    meta: {
        messages: {
            forgotDebugPrefix: 'Logs must be prefixed with "APP_LOGS &&" expression`'
        },
    },
    create(context) {
        return {
            CallExpression(node) {
                if (
                    (node.callee.type === 'MemberExpression' && node.callee.property.name === 'log') ||
                    (node.callee.type === 'Identifier' && node.callee.name.toLowerCase() === 'log')
                ) {
                    const parent = node.parent;
                    if (
                        parent.type !== 'LogicalExpression' ||
                        parent.operator !== '&&' ||
                        parent.left.type !== 'Identifier' ||
                        parent.left.name !== 'APP_LOGS'
                    ) {
                        context.report({
                            node,
                            messageId: 'forgotDebugPrefix'
                        });
                    }
                }
            },
        };
    },
};
