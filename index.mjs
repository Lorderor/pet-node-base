import { Router } from "./framework/router.mjs";
import { Application } from "./framework/Application.mjs";

const PORT = process.env.PORT || 5000;

const app = new Application();
const router = new Router();

router.get(`/users`, (req, res) => {
  res.end(`You send users request to /users`);
});

router.get(`/posts`, (req, res) => {
  res.end(`You send posts request to /posts`);
});

app.addRouter(router);
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
