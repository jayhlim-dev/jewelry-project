import { register } from 'node:module';

register(new URL('./alias-loader.mjs', import.meta.url).href, {
    parentURL: new URL('../', import.meta.url).href
});
