const globalAny: any = global

export default async () => {
  await globalAny.__DB_CONTAINER__.stop();
  console.log("stopped db container");
}