export const ROLES = [
  "HR Manager",
  "Inventory Manager",
  "Suplier Manager",
  "Production Manager",
  "HR Assistant",
  "Inventory Clerk",
  "Production Worker",
  "Quality Inspector",
];

export const DEPARTMENTS = ["General", "Production", "Warehouse", "Quality", "Administration", "Finance"];

export const DEFAULT_AVATAR = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

export const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || "";
export const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || "";
export const CLOUDINARY_ENABLED = Boolean(CLOUDINARY_CLOUD_NAME && CLOUDINARY_UPLOAD_PRESET);
