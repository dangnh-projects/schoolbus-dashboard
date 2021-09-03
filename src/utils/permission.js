export const checkByPermission = permission => (
  acceptedPermission,
  action = 'view'
) =>
  !!(permission[acceptedPermission] && permission[acceptedPermission][action]);

export const checkByGroup = groups => acceptedGroup =>
  groups.indexOf(acceptedGroup) > -1;

export const checkPermission = (permission = {}, groups = []) => {
  const perrmissionChecker = checkByPermission(permission);
  const groupChecker = checkByGroup(groups);
  return (acceptedPermission, acceptedGroup) => Component => {
    if (perrmissionChecker(acceptedPermission) || groupChecker(acceptedGroup)) {
      return Component;
    }
    return null;
  };
};
