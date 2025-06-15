import { userRouter } from "./src/user-router.mjs";
import { Application } from "./framework/Application.mjs";
import { parseJson } from "./framework/parseJson.mjs";
import { bodyJson } from "./framework/bodyJson.mjs";
import { parseUrl } from "./framework/parseUrl.mjs";

const PORT = process.env.PORT || 5000;

const app = new Application();

app.use(parseJson);
app.use(bodyJson);
app.use(parseUrl(`http://localhost:${PORT}`));

app.addRouter(userRouter);

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
