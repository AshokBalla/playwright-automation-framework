export function runtimeConfig(env: Record<string, string | undefined>) {
  return { baseURL: env.BASE_URL || 'https://www.saucedemo.com', workers: Number(env.WORKERS || 2) };
}
