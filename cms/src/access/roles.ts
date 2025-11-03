import {AccessArgs} from "payload";

export const hasRole = (req: AccessArgs['req'], role: 'admin' | 'editor') =>
  Array.isArray(req.user?.roles) && req.user.roles.includes(role);

export const isAdmin = ({ req }: AccessArgs) => hasRole(req, 'admin');

export const isEditorOrAdmin = ({ req }: AccessArgs) =>
  hasRole(req, 'admin') || hasRole(req, 'editor');

/**
 * Where-Constraint: nur Dokumente, bei denen 'author' == currentUser.id
 * Für update/delete-Accessfilter.
 */
export const whereAuthorIsCurrentUser = ({ req }: AccessArgs) => ({
  author: {
    equals: req.user?.id,
  },
});
