const mapping: Record<string, string> = {
  'day-passes': 'day_pass',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
