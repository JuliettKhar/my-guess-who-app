export const getBackgroundUrl = (category: number) => {
  const map: Record<number, string> = {
    1: new URL('@/assets/anime.png', import.meta.url).href,
    2: new URL('@/assets/movie.png', import.meta.url).href,
    3: new URL('@/assets/real.png', import.meta.url).href
  };

  return map[category] ?? new URL('@/assets/general.png', import.meta.url).href;
};
