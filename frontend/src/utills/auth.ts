/**
 * Role constants — kept in sync with backend User model enum
 */
export const ROLES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
} as const;

export type AppRole = (typeof ROLES)[keyof typeof ROLES];

/**
 * Primary helper — use this everywhere.
 * Returns true when the user is an ADMIN.
 */
export const isAdmin = (role?: string | null): boolean =>
  role?.toUpperCase() === ROLES.ADMIN;

/**
 * Returns true when the user is a MANAGER.
 */
export const isManager = (role?: string | null): boolean =>
  role?.toUpperCase() === ROLES.MANAGER;

/**
 * Returns true if the user's role is in the allowed list.
 * Accepts lower-case or upper-case values — comparison is case-insensitive.
 *
 * Usage:
 *   hasRole(user.role, ['ADMIN'])            // Admin only
 *   hasRole(user.role, ['ADMIN', 'MANAGER']) // Both
 */
export const hasRole = (
  userRole: string | null | undefined,
  allowedRoles: string[]
): boolean => {
  if (!userRole) return false;
  return allowedRoles.map((r) => r.toUpperCase()).includes(userRole.toUpperCase());
};

/**
 * Returns true if the user can delete records.
 * Only ADMINs are allowed to delete.
 */
export const canDelete = (role?: string | null): boolean => isAdmin(role);
