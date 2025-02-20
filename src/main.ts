import {AppDataSource} from "./data-source";
import {createApp} from "./app";

async function run(port: number) {
    await AppDataSource.initialize()
    const app = await createApp();
    app.listen(port, () => {
        console.log("http://127.0.0.1:" + port)
    })
}

run(3002);
