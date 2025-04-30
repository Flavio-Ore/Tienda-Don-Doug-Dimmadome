
export const extractFirstRoutePart = (route: string) => {
  const match = route.match(/^\/([^/]+)\/?/);
  return match != null ? match[1] : null;
};
