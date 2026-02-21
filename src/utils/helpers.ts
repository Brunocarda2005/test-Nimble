// Gets the initials from a name to display in avatars
export const getInitials = (name: string) => {
  const parts = name.split(" ").filter(Boolean);
  const initials = parts.map(([n]) => n);
  const union = initials.join("").toUpperCase();
  const slicedInitials = union.slice(0, 2);

  return slicedInitials;
};
