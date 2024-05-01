import dotenv from 'dotenv';
import replace from '@rollup/plugin-replace';

const envFiles = ['.env.local'];
if (process.env.NODE_ENV === 'production') {
    envFiles.unshift('.env.production');
}
dotenv.config({ path: envFiles });

function getEnvVariablesTyped() {
    return Object.keys(process.env).reduce((acc, key) => {
        if (key.startsWith('APP_')) {
            let value = process.env[key];
            if (value.startsWith('NUM:')) {
                value = parseFloat(value.replace('NUM:', ''));
            } else {
                value = `'${value}'`;
            }
            acc[key] = value;
        }
        return acc;
    }, {});
}

export function replaceEnvVariables(opts) {
    return replace({
        ...getEnvVariablesTyped(),
        ...opts,
        preventAssignment: true,
    });
}
