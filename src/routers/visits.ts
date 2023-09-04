import Router from "@koa/router";
import { getLastVisits, getVisitsByURL } from "../services/visists";

const visitsRouter = new Router();

visitsRouter
  .get("/", async (ctx) => {
    ctx.response.body = await getLastVisits(
      ctx.state.user_id,
      Number(ctx.request.query.limit),
      Number(ctx.request.query.offset)
    );
  })
  .get("/:id", async (ctx) => {
    ctx.response.body = await getVisitsByURL(
      ctx.params.id,
      ctx.state.user_id,
      Number(ctx.request.query.limit),
      Number(ctx.request.query.offset)
    );
  });
  

export default visitsRouter;
