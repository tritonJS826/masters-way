import {CommentApi, Configuration, UserApi} from "src/apiAutogenerated";
// Import {env} from "src/utils/env/env";

const configuration = new Configuration({basePath: "http://localhost:8000/api"});

export const commentService = new CommentApi(configuration);
export const userService = new UserApi(configuration);

