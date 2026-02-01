export async function GET(request) {
  // This stub forwards to the TypeScript implementation during development/build.
  // It exists to satisfy TypeScript imports that reference the .js path.
  const mod = await import("./route");
  return mod.GET(request);
}
