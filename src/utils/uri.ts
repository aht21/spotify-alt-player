export function getIdFromUri(uri: string) {
  return uri.split(":").pop();
}
