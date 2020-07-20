import {Application} from 'https://deno.land/x/oak/mod.ts'
import router from './routes.ts';
const app:Application = new Application();
const port :number = 5000;


app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server running on port ${port}`);

await app.listen({port});